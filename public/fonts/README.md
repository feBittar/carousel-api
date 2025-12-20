# Custom Fonts for Carousel API

This directory should contain custom font files that are referenced in carousel templates.

## Required Font Files

The following custom fonts may be needed based on your carousel configurations:

1. **BebasNeue-Regular.ttf** - Bebas Neue (Display font)
2. **Gilroy-Black.ttf** - Gilroy (Sans-serif)
3. **akkordeon-ten.otf** - Akkordeon Ten (Display)
4. **europa-grotesk-sh-bold.otf** - Europa Grotesk SH (Sans-serif)
5. **helveticanowtext-bold-demo.ttf** - Helvetica Now Text (Sans-serif)
6. **neue-kaine-variable.ttf** - Neue Kaine (Sans-serif)
7. **ProductSans-Regular.ttf** - Product Sans (Google proprietary)

## Installation

1. Obtain the font files (ensure you have proper licenses)
2. Place the `.ttf` or `.otf` files directly in this directory
3. Restart the server
4. Fonts will be served at `http://your-domain/fonts/[filename]`

## Important Notes

- **Font Licensing**: Ensure you have proper licenses for all commercial fonts
- **Product Sans**: Google's proprietary font, may not be freely available
- **Fallback**: If custom fonts are missing, the system will fallback to Google Fonts (Inter, Roboto, etc.)

## Google Fonts (Already Available via CDN)

The following fonts work via Google Fonts CDN and don't need local files:
- Inter, Roboto, Open Sans, Lato, Montserrat, Poppins, Quicksand, Nunito
- Work Sans, Comfortaa, Raleway, Ubuntu, PT Serif, Libre Baskerville, League Spartan

## Troubleshooting

If you see 404 errors for fonts:
1. Check that the font file exists in this directory
2. Verify the filename matches exactly (case-sensitive)
3. Check the file extension (.ttf vs .otf)
4. Restart the server after adding new fonts

## Current Status

⚠️ This directory currently contains only this README. Add font files as needed based on your carousel templates.
