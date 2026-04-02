"use client";

import { useEffect, useRef } from "react";

const RESOLUTION = 320;
const PIXEL_SIZE = 1;
const GAP_RATIO = 1.5;
const ROT_SPEED = 0.0025;
const MOUSE_RADIUS = 50.0;

const vertexShader = `
  varying vec2 vUv;
  varying float vDepth;
  void main() {
    vUv = uv;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mvPos.z;
    gl_Position = projectionMatrix * mvPos;
  }
`;

const fragmentShader = `
  uniform sampler2D tDiffuse;
  uniform vec2  resolution;
  uniform vec2  mousePos;
  uniform float mouseRadius;
  uniform float time;
  uniform float uPixelSize;
  uniform float uGapRatio;
  uniform float uRotationAngle;

  varying vec2  vUv;
  varying float vDepth;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float smoothTransition(float e0, float e1, float x) {
    float t = clamp((x - e0) / (e1 - e0), 0.0, 1.0);
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  }

  vec3 colorama(vec2 uv, vec3 color) {
    float intensity  = length(color);
    float angle      = mod(uRotationAngle, 3.14159 * 2.0);
    float dist90     = abs(angle - 3.14159 / 2.0);
    float dist270    = abs(angle - 3.14159 * 3.0 / 2.0);
    float normDist   = min(dist90, dist270) / (3.14159 / 2.0);
    float curveAmt   = mix(0.18, 0.2, smoothstep(0.0, 0.8, normDist));
    float curvedY    = uv.y + (sin(uv.x * 3.14159) * curveAmt);
    float depthFac   = 1.0 - smoothstep(0.2, 0.7, intensity);
    float factor     = mix(curvedY, depthFac, 0.1);

    vec3 yellow    = vec3(0.95, 0.89, 0.15);
    vec3 orange    = vec3(0.82, 0.50, 0.05);
    vec3 brown     = vec3(0.35, 0.25, 0.00);
    vec3 darkBrown = vec3(0.30, 0.25, 0.00);

    vec3 baseColor;
    if      (factor < 0.53) baseColor = yellow;
    else if (factor < 0.56) baseColor = mix(yellow, orange, smoothstep(0.53, 0.56, factor));
    else if (factor < 0.57) baseColor = orange;
    else if (factor < 0.65) baseColor = mix(orange, brown,  smoothstep(0.57, 0.65, factor));
    else if (factor < 0.78) baseColor = brown;
    else if (factor < 0.88) baseColor = mix(brown, darkBrown, smoothstep(0.78, 0.88, factor));
    else                    baseColor = darkBrown;

    float darkening = mix(0.3, 1.0, pow(1.0 - depthFac, 0.8));
    return baseColor * darkening;
  }

  void main() {
    float totalSize = uPixelSize + uPixelSize * uGapRatio;
    vec2 gridPos    = floor(vUv * resolution / totalSize);
    vec2 pixelCenter = (gridPos + 0.5) * totalSize / resolution;
    vec2 screenPos  = pixelCenter * resolution;

    vec2  toMouse  = mousePos - screenPos;
    float distMouse = length(toMouse);
    float uniqueOff  = hash(gridPos) * 2.0 - 1.0;
    float timeOff    = time * (0.5 + hash(gridPos) * 0.5);
    float normDist  = distMouse / (mouseRadius * (1.0 + uniqueOff * 0.1));
    float decay     = 1.0 / (1.0 + normDist * normDist * 2.0) * 0.8;
    decay          += sin(timeOff) * 0.1 * decay;
    float defMove   = sin(timeOff + gridPos.x * 0.1) * cos(timeOff + gridPos.y * 0.1) * 1.0;
    vec2  dir       = normalize(toMouse + vec2(cos(timeOff), sin(timeOff)) * 0.5);
    float displace  = max(defMove, decay * mouseRadius * 0.7);
    vec2  finalPos  = screenPos - dir * displace;
    vec2  attrUV    = finalPos / resolution;

    float pixRatio = uPixelSize / totalSize;
    vec2  pxOff    = fract(vUv * resolution / totalSize);
    if (pxOff.x < 0.5 - pixRatio / 2.0 || pxOff.x > 0.5 + pixRatio / 2.0 ||
        pxOff.y < 0.5 - pixRatio / 2.0 || pxOff.y > 0.5 + pixRatio / 2.0) {
      discard;
    }

    vec4 texel = texture2D(tDiffuse, attrUV);
    if (texel.a <= 0.0) discard;

    gl_FragColor = vec4(colorama(attrUV, texel.rgb), texel.a * 0.78);
  }
`;

interface BananaCanvasProps {
  visible?: boolean;
  className?: string;
}

export default function BananaCanvas({
  visible = true,
  className,
}: BananaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;

    let animationId: number;
    let renderer: import("three").WebGLRenderer;
    let cleanup = false;

    async function init() {
      const THREE = await import("three");
      const { GLTFLoader } = await import(
        "three/examples/jsm/loaders/GLTFLoader.js"
      );
      const { DRACOLoader } = await import(
        "three/examples/jsm/loaders/DRACOLoader.js"
      );

      if (cleanup) return;

      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        premultipliedAlpha: false,
        preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      renderer.setClearAlpha(0);

      const scene = new THREE.Scene();
      scene.background = null;

      const frustum = 4.5;
      const camera = new THREE.OrthographicCamera(
        frustum / -2,
        frustum / 2,
        frustum / 2,
        frustum / -2,
        -1000,
        1000
      );
      camera.position.set(0, 0, 0);

      const addLight = (x: number, y: number, z: number, intensity: number) => {
        const l = new THREE.DirectionalLight(0xffffff, intensity);
        l.position.set(x, y, z);
        scene.add(l);
      };
      addLight(0, 0, 5, 1.5);
      addLight(0, 0, -5, 1.5);
      addLight(5, 0, 0, 1.5);
      addLight(-5, 0, 0, 1.5);
      addLight(0, 5, 0, 1.5);
      addLight(0, -5, 0, 1.0);
      scene.add(new THREE.AmbientLight(0xffffff, 0.5));

      const renderTarget = new THREE.WebGLRenderTarget(RESOLUTION, RESOLUTION);

      const postMaterial = new THREE.ShaderMaterial({
        uniforms: {
          tDiffuse: { value: renderTarget.texture },
          resolution: { value: new THREE.Vector2(RESOLUTION, RESOLUTION) },
          mousePos: { value: new THREE.Vector2(-200, 0) },
          mouseRadius: { value: MOUSE_RADIUS },
          time: { value: 0.0 },
          uPixelSize: { value: PIXEL_SIZE },
          uGapRatio: { value: GAP_RATIO },
          uRotationAngle: { value: 0.0 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
      });

      const postScene = new THREE.Scene();
      const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      postScene.add(
        new THREE.Mesh(new THREE.PlaneGeometry(2, 2), postMaterial)
      );

      function handleResize() {
        const sz = Math.min(window.innerWidth, window.innerHeight);
        renderer.setSize(sz, sz);
        canvas.style.position = "absolute";
        canvas.style.left = `${(window.innerWidth - sz) / 2}px`;
        canvas.style.top = `${(window.innerHeight - sz) / 2}px`;
      }
      window.addEventListener("resize", handleResize);
      handleResize();

      const draco = new DRACOLoader();
      draco.setDecoderPath(
        "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
      );
      const loader = new GLTFLoader();
      loader.setDRACOLoader(draco);

      let model: import("three").Group | null = null;
      let rotAngle = 0;
      let lastTime = Date.now();

      loader.load("/banana3d.glb", (gltf) => {
        if (cleanup) return;
        model = gltf.scene;
        model.traverse((child) => {
          const mesh = child as import("three").Mesh;
          if (mesh.isMesh) {
            mesh.geometry.computeVertexNormals();
          }
        });
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        model.rotation.set(0, 0, 0);
        scene.add(model);
      });

      function animate() {
        if (cleanup) return;
        animationId = requestAnimationFrame(animate);

        const now = Date.now();
        const dt = Math.min((now - lastTime) / 1000, 0.016);
        lastTime = now;

        if (model) {
          rotAngle += ROT_SPEED;
          model.rotation.y = rotAngle;
          postMaterial.uniforms.uRotationAngle.value = rotAngle;
        }

        postMaterial.uniforms.time.value += dt;

        renderer.setRenderTarget(renderTarget);
        renderer.clear();
        renderer.render(scene, camera);

        renderer.setRenderTarget(null);
        renderer.clear();
        renderer.render(postScene, postCamera);
      }

      animate();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    init();

    return () => {
      cleanup = true;
      cancelAnimationFrame(animationId);
      renderer?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 transition-opacity duration-600 ${visible ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
    />
  );
}
