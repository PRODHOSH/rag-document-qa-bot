"""
Run this once to generate the PNG icon files needed by the Chrome extension.
Uses the website's logo.png from public/ as the source.
Requires: pip install Pillow
"""

from PIL import Image
import os, pathlib

SIZES = [16, 48, 128]
os.makedirs("icons", exist_ok=True)

# Resolve path to public/logo.png relative to this script
script_dir = pathlib.Path(__file__).parent
logo_path = script_dir.parent / "public" / "logo.png"

if not logo_path.exists():
    raise FileNotFoundError(f"Could not find logo at {logo_path}")

src = Image.open(logo_path).convert("RGBA")

for size in SIZES:
    icon = src.resize((size, size), Image.LANCZOS)
    out = script_dir / "icons" / f"icon{size}.png"
    icon.save(out)
    print(f"Created {out}")

print("Done! Icons match the website logo.")
