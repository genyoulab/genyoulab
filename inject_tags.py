import os

files = ['index.html', 'brand.html', 'career.html', 'reset-mist.html', 'restore-serum.html', 'recover-cream-balm.html']
tags = """
  <meta property="og:title" content="GenYou Lab — 피부가 쉴 시간을 돌려드립니다">
  <meta property="og:description" content="내버려 두는 것의 미학. 젠유랩과 함께 피부가 쉴 시간을 돌려드립니다.">
  <meta property="og:image" content="/assets/og-image.png">
  <meta property="og:type" content="website">
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-DVR7NZR8MW"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-DVR7NZR8MW');
  </script>
"""

for f in files:
    if not os.path.exists(f):
        continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    if '<meta property="og:title"' not in content:
        content = content.replace('</head>', tags + '</head>')
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
