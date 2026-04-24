import { Badge } from "@/components/ui/badge";
import { Callout } from "./callout";

export function SectionEstructura() {
  return (
    <section id="estructura" className="py-16 border-b border-black/10">
      <Badge variant="solid" className="mb-4">08</Badge>
      <h2 className="font-sans font-medium text-black mb-8" style={{ fontSize: "clamp(18px, 2vw, 24px)", lineHeight: 1.15 }}>
        Estructura legal del fondo
      </h2>

      <div className="space-y-4 mb-10">
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          El fondo se ha estructurado como una <span className="bg-[#3d3a00] text-[#FFEC40] px-1">Limited Partnership Canadiense</span>.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Este fondo fue constituido con fecha 2 de julio de 2025 y se encuentra regulado por un Limited Partnership Agreement.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Al momento de ingresar como inversionista se firma un Subscription Agreement, suscribiéndose intereses de la Limited Partnership.
        </p>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          En definitiva, como inversionista tendrás participación en una Partnership Canadiense, la que a su vez invertirá en las startups.
        </p>
      </div>

      {/* ¿Por qué Canadá? */}
      <div className="border border-black/10 p-5 bg-black/5 mb-4">
        <h3 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">
          ¿Por qué Canadá?
        </h3>
        <div className="space-y-3">
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            Varios preguntan por qué se eligió Canadá en vez de Estados Unidos.
          </p>
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            Actualmente los fondos que invierten en startups de Latam se estructuran en tres países, EEUU, Canadá o Islas Caimán.
          </p>
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            El último lo hemos descartado por temas de reputación.
          </p>
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            A la hora de estructurar un fondo, lo más importa es el tema tributario. Uno espera que la estructura legal que utilice sea transparente tributariamente, es decir, que el fondo mismo no pague impuestos, sino que sean los inversionistas quienes paguen una vez se proceda con las distribuciones.
          </p>
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            En la práctica, este objetivo se cumple tanto en EEUU como en Canadá. ¿Por qué Canadá entonces?
          </p>
          <ul className="list-disc list-outside pl-5 space-y-2">
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">
              Es más simple constituir y manejar: no hay tanta reportería al Estado como en EEUU.
            </li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">
              Límites de aportantes: las Limited Partnership de EEUU tienen un límite de 99 inversionistas, en Canadá no existe tal límite. Además los inversionistas deben ser Inversionistas Acreditados, lo que no es necesario para las Limited Partnerships de Canadá.
            </li>
            <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">
              Costos: los costos de incorporación y de abogados son mucho menores en Canadá.
            </li>
          </ul>
        </div>
      </div>

      {/* Tributación de la LP */}
      <div className="border border-black/10 p-5 bg-black/5 mb-4">
        <h3 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">
          Tributación de la Limited Partnership
        </h3>
        <div className="space-y-3">
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            Como se mencionó, la LP no paga impuesto en Canadá, de hecho, no es considerada contribuyente en dicho país.
          </p>
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            Esto no significa que el fondo no pagará ningún impuesto. En los momentos de los exits, puede ser que las ventas generen un impuesto en los países de las operaciones de la startup. Este impuesto deberá ser pagado por el fondo.
          </p>
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            Como los inversionistas son aportantes del fondo, las distribuciones se distribuyen bajo concepto de dividendos, que traen aparejados los impuestos que se hayan pagado por el fondo.
          </p>
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            Cada Limited Partner deberá determinar en su país de residencia la posibilidad de utilizar estos créditos por impuestos pagados por el fondo.
          </p>
        </div>
      </div>

      {/* Estructuras legales de startups de Latam */}
      <div className="border border-black/10 p-5 bg-black/5 mb-4">
        <h3 className="font-mono font-medium text-black/40 text-sm uppercase tracking-wider mb-3">
          Estructuras legales comunes de las startups de Latam
        </h3>
        <div className="space-y-3">
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            El fondo invertirá prioritariamente en startups cuyas operaciones estén en Latam. Sin embargo, generalmente la inversión es en USA o Islas Caimán, que es donde las startups tienen sus sociedades holding.
          </p>
          <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
            En los siguientes párrafos se explica el porqué de estas sociedades holdings.
          </p>

          {/* Motivos principales */}
          <div className="mt-4">
            <h4 className="font-sans font-medium text-black/40 text-sm mb-2">
              Motivos principales para que startups constituyan holding companies
            </h4>
            <div className="space-y-2">
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Muchos inversionistas no se sienten cómodos invirtiendo directamente en países Latinoamericanos, prefiriendo jurisdicciones conocidas y de derecho anglosajón (en vez de continental).
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Para acomodarse a los inversionistas, cuando las startups reciben inversión extranjera por lo general arman una estructura societaria de dos o tres capas. Esto significa que la startup tiene una sociedad matriz o holding en alguna jurisdicción donde los inversionistas se sientan cómodos y sociedades operativas en cada país donde operen.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                En la sociedad matriz están los fundadores, inversionistas, colaboradores con stock options y toda la propiedad intelectual. Esta sociedad matriz es dueña del 100% de la propiedad de las sociedades operativas.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                La operación del negocio mismo, como la contratación de proveedores y servicios, contratación de colaboradores y contratos con clientes se realizan en las sociedades operativas de cada país en donde operan.
              </p>
            </div>
          </div>

          {/* Estructuras comunes */}
          <div className="mt-4">
            <h4 className="font-sans font-medium text-black/40 text-sm mb-3">
              Estructuras comunes para Latinoamérica
            </h4>
            <p className="font-sans font-medium text-black/60 text-sm leading-relaxed mb-3">
              Por el momento existen dos estructuras legales muy utilizadas para startups de Latinoamérica, de dos o tres capas.
            </p>
            <div className="space-y-3">
              <div className="border border-black/10 p-4 bg-black/5">
                <p className="font-sans font-medium text-black/60 text-sm mb-1">Estructura de 2 capas</p>
                <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                  Una sociedad matriz llamada "C-Corporation" en Delaware, USA, de la que cuelgan las sociedades operativas de cada país de LatAm.
                </p>
              </div>
              <div className="border border-black/10 p-4 bg-black/5">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-sans font-medium text-black/60 text-sm">Estructura de 3 capas</p>
                  <Badge variant="solid" className="text-xs">recomendada</Badge>
                </div>
                <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                  Sociedad matriz en Islas Caimán, la que es dueña del 100% de participación de una Limited Liability Company ("LLC") en Delaware, USA, la que a su vez es dueña del 100% de la participación de las sociedades operativas.
                </p>
              </div>
            </div>
            <div className="space-y-2 mt-3">
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                La primera estructura solo es recomendable si los fundadores piensan enfocar su negocio en USA o creen que sus inversionistas y futuros compradores serán de USA. El motivo es principalmente tributario.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Las C-Corporation pagan impuestos corporativos en USA. Cualquier ingreso que reciban, independiente del motivo, debe pagar ese impuesto.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Al momento de un exit de una startup con negocios en Latam, los compradores tienen dos posibilidades:
              </p>
              <ol className="list-decimal list-outside pl-5 space-y-2">
                <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Comprar las acciones de la C-Corp.</li>
                <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Comprarle a la C-Corp cada una de las sociedades operativas de Latam.</li>
              </ol>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                En el primer caso pueden o no haber impuestos en USA por la venta de las acciones de la C-Corp, dependiendo la residencia tributaria de fundadores e inversionistas.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                En el segundo caso hay un problema de doble tributación. Cómo la C-Corp recibe ingresos por la venta de activos (las acciones de las sociedades operativas), deberá pagar impuesto corporativo por esos ingresos. Luego la C-Corp deberá distribuir las ganancias a los accionistas (fundadores, inversionistas y colaboradores), pagándose nuevamente impuesto por esas distribuciones. Estaríamos pagando dos impuestos distintos en USA por una empresa que NO tiene operaciones o negocios en ese país.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Para evitar esta doble tributación se ideó la estructura de una sociedad en Islas Caimán que actúa como holding, la que es única dueña de una Limited Liability Company de Delaware (una "LLC"), la que a su vez es única dueña de las sociedades operativas.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Esta estructura permite dar flexibilidad a futuros exits, teniendo los compradores tres opciones para adquirir la startup:
              </p>
              <ol className="list-decimal list-outside pl-5 space-y-2">
                <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Comprar las acciones de la holding en Caimán.</li>
                <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Comprarle a la holding de Caimán la LLC (e indirectamente todas las sociedades operativas).</li>
                <li className="font-sans font-medium text-black/60 text-sm leading-relaxed">Comprarle a la LLC cada sociedad operativa.</li>
              </ol>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                La gracias de esta estructura es que ni los fundadores, inversionistas o colaboradores, ni la LLC o la sociedad en Islas Caimán pagarían impuestos en USA o Islas Caimán por cualquiera de las tres opciones de exit. Solo se pagarían impuestos en los países donde el vendedor resida o en los países donde haya impuestos a la venta directa o indirecta de sociedades.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Con esta estructura los fundadores dan confianza y certeza jurídica a los inversionistas para invertir en startups de Latinoamérica pero sin tener que pagar impuestos en un país que no participa del negocio más que para constituir una sociedad holding.
              </p>
            </div>
          </div>

          {/* Tributación en exits con 3 capas */}
          <div className="mt-4">
            <h4 className="font-sans font-medium text-black/40 text-sm mb-2">
              Tributación en exits con estructura de tres capas
            </h4>
            <div className="space-y-2">
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                La LLC es tributariamente transparente, lo que significa que no debe pagar impuestos como entidad legal, "subiendo" todas las ganancias o pérdidas a sus accionistas.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Luego en Islas Caimán tampoco se pagan impuestos por operaciones o activos fuera de Islas Caimán.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Así, supongamos que la LLC vende todos sus sociedades operativas a un tercero. Esta venta no pagaría impuestos en USA. Al distribuir las utilidades de la venta a Islas Caimán, tampoco se pagarían impuestos. Luego cada accionista de Islas Caimán tendrá que pagar impuestos en sus países de residencia.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                De todas formas, hay que tener presente los impuestos que se pueden pagar en las jurisdicciones donde opera la startup por impuestos por ventas directas o indirectas.
              </p>
            </div>
          </div>

          {/* Estructura intermedia */}
          <div className="mt-4">
            <h4 className="font-sans font-medium text-black/40 text-sm mb-2">
              Estructura intermedia
            </h4>
            <div className="space-y-2">
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                Dado los costos que implica constituir y administrar tres sociedades desde un inicio, una posibilidad al recibir inversión a través de un valor convertible, como el Safe, es que los fundadores constituyan solamente una LLC como sociedad matriz y transformarla en una C-Corporation o constituir una matriz en Islas Caimán, cuando se levante la siguiente ronda que emita acciones y convierta los valores convertibles.
              </p>
              <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
                La LLC da la posibilidad de transformarse en una C-Corporation o constituir una sociedad en Caimán sobre la LLC sin gatillar impuestos, lo que podría ocurrir si quieres transformar una C-Corp en LLC o constituir una sociedad en Islas Caimán sobre una C-Corp.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Callout>
        <p className="font-sans font-medium text-black/60 text-sm leading-relaxed">
          Este proceso de constituir sociedades sobre las sociedades operativas o sobre la LLC es lo que se conoce como un <span className="bg-[#3d3a00] text-[#FFEC40] px-1">"Flip"</span>.
        </p>
      </Callout>
    </section>
  );
}
