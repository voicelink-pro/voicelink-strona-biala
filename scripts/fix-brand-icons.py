#!/usr/bin/env python3
"""
Konwertuje pliki w src/components/icons/*.svg, które są faktycznie PNG (binarne),
na poprawny tekstowy SVG z osadzonym obrazem (base64).

Uruchom po wrzuceniu nowych ikon: npm run fix-icons
Wymaga: pip install pillow (Pillow)
"""
from __future__ import annotations

import base64
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Brak Pillow: pip install pillow", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
ICONS = ROOT / "src" / "components" / "icons"


def main() -> None:
    fixed: list[str] = []
    for p in sorted(ICONS.glob("*.svg")):
        raw = p.read_bytes()
        try:
            txt = raw.decode("utf-8")
            if txt.strip().startswith("<") and "<svg" in txt and "xmlns" in txt:
                continue
        except UnicodeDecodeError:
            pass
        try:
            with Image.open(p) as im:
                w, h = im.size
                fmt = (im.format or "PNG").lower()
            b64 = base64.b64encode(raw).decode("ascii")
            svg = (
                f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">\n'
                f'  <image width="{w}" height="{h}" href="data:image/{fmt};base64,{b64}"/>\n'
                f"</svg>\n"
            )
            p.write_text(svg, encoding="utf-8")
            fixed.append(p.name)
        except Exception as e:
            print(f"SKIP {p.name}: {e}", file=sys.stderr)

    if fixed:
        print("Naprawiono:", ", ".join(fixed))
    else:
        print("Wszystkie .svg są już poprawnym tekstem XML.")


if __name__ == "__main__":
    main()
