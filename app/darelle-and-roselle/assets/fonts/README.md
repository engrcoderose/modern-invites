# Invitation fonts

Anastasia Script, weight 400, preserves the heading lettering of the requested
Vincent and Gabrielle design. Source copy:
`app/vincent-and-gabrielle/assets/fonts/anastasia-script.woff2`.
The original reference's source notice identifies AnastasiaScript Regular at
Fontsgeek; confirm licensing before distributing the font outside this project.

Noto Serif Latin, normal weights 400–600 and italic weights 300–600, uses the existing licensed
WOFF2 subset copies from `app/ryan-and-anne/assets/fonts/`. The accompanying
`notoserif-OFL.txt` license applies to these files. Original repository source:
Google Fonts Noto Serif. These compact files provide the same typeface as the
reference invitation's full TTF files without bundling unused character sets.

All fonts load through `next/font/local` with invitation-specific CSS variables
and `display: swap`. Add a suitable character subset if future content requires
another script.
