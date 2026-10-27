from pathlib import Path
import random
random.seed(76)
p=Path('public/art')
# Original vector artwork: no game screenshots, logos or third-party assets.
head='''<svg xmlns="http://www.w3.org/2000/svg" width="1800" height="1000" viewBox="0 0 1800 1000"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#121b42"/><stop offset=".4" stop-color="#795071"/><stop offset=".72" stop-color="#ef937f"/><stop offset="1" stop-color="#343154"/></linearGradient><linearGradient id="water" x2="0" y2="1"><stop stop-color="#91607c"/><stop offset="1" stop-color="#0c2333"/></linearGradient><linearGradient id="road" x2="0" y2="1"><stop stop-color="#59516d"/><stop offset="1" stop-color="#171828"/></linearGradient><radialGradient id="sun"><stop stop-color="#ffd6b1"/><stop offset=".5" stop-color="#ffb89d" stop-opacity=".65"/><stop offset="1" stop-color="#ffb89d" stop-opacity="0"/></radialGradient><filter id="glow"><feGaussianBlur stdDeviation="4"/></filter><filter id="grain"><feTurbulence baseFrequency=".7" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".07"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter><g id="palm"><path d="M0 0Q-14-130 4-260" stroke="#111a26" stroke-width="13" fill="none"/><g fill="#101c28"><path d="M4-260Q-65-330-118-272Q-40-292 4-250Q-95-281-140-219Q-63-254 4-250Q-52-240-63-167Q-20-209 4-250Q32-311 102-284Q48-279 4-250Q87-278 137-212Q66-243 4-250Q51-243 70-172Q34-214 4-250Q1-309-36-338Q-10-292 4-250"/></g></g></defs>'''
s=[head,'<g filter="url(#grain)"><path fill="url(#sky)" d="M0 0h1800v1000H0z"/><circle cx="1190" cy="410" r="280" fill="url(#sun)"/><circle cx="1190" cy="410" r="67" fill="#fbc6a6" opacity=".8"/>']
# cloud streaks
for y in [180,220,275,330,365]:
 s.append(f'<path d="M{random.randrange(300,700)} {y}q350 -22 950 4" fill="none" stroke="#e6a5a2" opacity=".15" stroke-width="{random.randrange(4,14)}"/>')
s.append('<path d="M0 590h1800v410H0z" fill="url(#water)"/>')
for layer in range(2):
 for i in range(43):
  x=i*46+random.randrange(-15,15); w=random.randrange(26,66); h=random.randrange(50,240)+(70 if 21<i<30 else 0); y=595-h+layer*22
  color=['#44465f','#242f47'][layer]
  s.append(f'<path d="M{x} 640V{y}h{w}v{640-y}z" fill="{color}"/>')
  if h>200:s.append(f'<path d="M{x+w/2} {y}v-28" stroke="{color}" stroke-width="2"/>')
  for wx in range(x+6,x+w-4,8):
   for wy in range(y+10,610,13):
    if random.random()>.42:s.append(f'<rect x="{wx}" y="{wy}" width="3" height="4" fill="{random.choice(["#e8a8b6","#ebc7a5","#75a7bb"])}" opacity="{random.uniform(.25,.8):.2f}"/>')
for i in range(70):
 y=random.randrange(635,990); x=random.randrange(0,1800)
 s.append(f'<path d="M{x} {y}h{random.randrange(10,100)}" stroke="#e4a1a3" opacity=".12"/>')
s.append('<path d="M950 610 1800 710v290H200z" fill="#141f2a"/><path d="m1070 610 730 122v268H520z" fill="url(#road)"/><path d="m1100 625 340 375" stroke="#ecbbaa" stroke-width="3" opacity=".6" stroke-dasharray="25 40"/><path d="m1050 630-430 370" stroke="#b98c9b" stroke-width="5"/><path d="m1200 632 600 97" stroke="#f5b68f" stroke-width="4"/>')
for x,y,scale in [(1700,920,1.65),(1490,802,1.1),(1325,710,.65),(1235,665,.35),(360,1000,1.8),(550,895,1.35),(730,790,.95),(870,710,.58)]:
 s.append(f'<use href="#palm" transform="translate({x} {y}) scale({scale})"/>')
# original low-slung car silhouette with neon rear lights
s.append('''<g transform="translate(1060 800)"><ellipse cx="110" cy="102" rx="141" ry="22" fill="#070c18" opacity=".7"/><path d="m-8 34 33-48q5-10 24-12h114q20 3 29 17l31 48 23 16-3 49H-17l-5-43z" fill="#171b2c" stroke="#646075" stroke-width="2"/><path d="m39-7-20 39h181L175-7z" fill="#343447"/><path d="M33 0h138l18 24H23z" fill="#c598a1" opacity=".27"/><path d="M-8 48h70l6 13H-8zm158 0h70v13h-76z" fill="#ff5379"/><path d="M-8 51h70m88 0h70" stroke="#ff307a" stroke-width="13" filter="url(#glow)"/><path d="M79 75h52v14H79z" fill="#c0b4b4"/><path d="M-12 93h250" stroke="#615263" stroke-width="4"/><rect x="-17" y="87" width="27" height="23" rx="6" fill="#080d18"/><rect x="211" y="87" width="27" height="23" rx="6" fill="#080d18"/></g>''')
s.append('</g></svg>'); (p/'coast.svg').write_text(''.join(s))
# Other original covers, derived from our own illustration.
for name,view in [('city','580 130 1150 650'),('drive','570 500 1150 500'),('palms','900 0 900 650')]:
 (p/f'{name}.svg').write_text(''.join(s).replace('viewBox="0 0 1800 1000"',f'viewBox="{view}"'))
# Original fictional map for preview.
(p/'map.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500"><defs><pattern id="g" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0v36" fill="none" stroke="#5e7990" opacity=".12"/></pattern><pattern id="b" width="45" height="35" patternUnits="userSpaceOnUse" patternTransform="rotate(-18)"><rect x="5" y="5" width="33" height="23" rx="3" fill="#273748"/><path d="M0 0h45v35" fill="none" stroke="#72829a" stroke-width="2" opacity=".2"/></pattern></defs><path fill="#101f30" d="M0 0h900v500H0z"/><path fill="url(#g)" d="M0 0h900v500H0z"/><path d="m-50 45 240-85 218 100 65 108-35 108 80 66-65 158H-30zM680-30l190 20 80 530-230 20-92-90 40-139-54-109z" fill="#1b2e3d" stroke="#3f5460" stroke-width="3"/><path d="m-50 45 240-85 218 100 65 108-35 108 80 66-65 158H-30zM680-30l190 20 80 530-230 20-92-90 40-139-54-109z" fill="url(#b)"/><path d="M0 190q220-70 420 0t420 35M290 0q-65 170 25 300t-25 230M775 0q-65 170 5 510" fill="none" stroke="#c4a16f" stroke-width="5" opacity=".55"/><path d="M435 194 670 210" stroke="#80a1b1" stroke-width="8"/><path d="M435 194 670 210" stroke="#283b4e" stroke-width="4"/><g fill="#6d8795" font-family="sans-serif" letter-spacing="5" font-size="16"><text x="145" y="340" transform="rotate(-18 145 340)">WEST DISTRICT</text><text x="730" y="330" transform="rotate(90 730 330)">OCEAN DRIVE</text><text x="480" y="400" transform="rotate(-80 480 400)">THE BAY</text></g></svg>''')
