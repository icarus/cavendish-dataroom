#!/usr/bin/env python3
"""Build standalone presentation from presentation.html.

Reads the source presentation + CSS + JS, inlines everything,
strips auth/tracking, and writes standalone-deck.html.

Usage:
    python3 dataroom/build-standalone.py
"""

import os
import re

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SRC_HTML = os.path.join(SCRIPT_DIR, 'presentation.html')
SRC_CSS = os.path.join(SCRIPT_DIR, 'dataroom.css')
SRC_JS = os.path.join(SCRIPT_DIR, 'presentation.js')
OUT_HTML = os.path.join(SCRIPT_DIR, 'standalone-deck.html')


def main():
    with open(SRC_HTML, 'r') as f:
        html = f.read()
    with open(SRC_CSS, 'r') as f:
        css = f.read()
    with open(SRC_JS, 'r') as f:
        js = f.read()

    # 1. Inline CSS: replace <link> with <style>
    css_with_override = css + '\n\n/* Standalone override — bypass auth-hidden state */\n#app { visibility: visible !important; }\n'
    html = html.replace(
        '<link rel="stylesheet" href="/dataroom/dataroom.css">',
        '<style>\n' + css_with_override + '</style>'
    )

    # 2. Remove all external <script src="..."> tags
    html = re.sub(r'  <script src="[^"]*"></script>\n', '', html)

    # 3. Remove the inline auth/tracking init block
    html = re.sub(
        r'  <script>\n    \(async function \(\) \{.*?\}\)\(\);\n  </script>\n',
        '',
        html,
        flags=re.DOTALL
    )

    # 4. Hide logout button (kept in DOM so presentation.js doesn't error on null)
    html = html.replace(
        '<button class="pres-logout logout--light">Sign out</button>',
        '<button class="pres-logout logout--light" style="display:none"></button>'
    )

    # 5. Convert absolute paths to relative for file:// usage
    html = html.replace('src="/dataroom/images/', 'src="images/')
    html = html.replace("src='/dataroom/images/", "src='images/")

    # 6. Insert standalone init script before </body>
    init_script = """  <script>
    // Stubs — standalone deck has no auth or tracking
    window.InvestorAuth = { signOut: function() {}, guardPresentationPage: function() {} };
    window.InvestorTracking = {
      trackSlideTransition: function() {},
      startSession: function() {},
      endSession: function() {},
      endSessionBeacon: function() {}
    };
  </script>
  <script>
""" + js + """  </script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      InvestorPresentation.init();
    });
  </script>
"""

    html = html.replace('</body>', init_script + '</body>')

    with open(OUT_HTML, 'w') as f:
        f.write(html)
    size = os.path.getsize(OUT_HTML)
    print(f'Built {OUT_HTML} ({size:,} bytes)')


if __name__ == '__main__':
    main()
