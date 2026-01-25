// Font Registry - Central registry of all available custom fonts

export interface FontDefinition {
  name: string;
  family: string;
  filename: string;
  weight?: number;
  style?: 'normal' | 'italic' | 'oblique';
  category?: 'display' | 'sans-serif' | 'serif' | 'monospace';
}

export const CUSTOM_FONTS: FontDefinition[] = [
  // Use apenas o nome base da família (sem variantes de peso)
  // O peso será selecionado separadamente no dropdown de Font Weight
  // IMPORTANTE: NÃO adicionar aspas extras ao redor dos nomes - elas são adicionadas automaticamente no CSS
  { name: 'Bebas Neue', family: 'Bebas Neue', filename: 'BebasNeue-Regular.ttf', weight: 400, style: 'normal', category: 'display' },
  { name: 'Montserrat', family: 'Montserrat', filename: 'Montserrat-Regular.ttf', weight: 400, style: 'normal', category: 'sans-serif' },
  { name: 'Product Sans', family: 'Product Sans', filename: 'ProductSans-Regular.ttf', weight: 400, style: 'normal', category: 'sans-serif' },
  { name: 'Gilroy', family: 'Gilroy', filename: 'Gilroy-Black.ttf', weight: 900, style: 'normal', category: 'sans-serif' },
  { name: 'Akkordeon Ten', family: 'Akkordeon Ten', filename: 'akkordeon-ten.otf', weight: 400, style: 'normal', category: 'display' },
  { name: 'Europa Grotesk SH', family: 'Europa Grotesk SH', filename: 'europa-grotesk-sh-bold.otf', weight: 700, style: 'normal', category: 'sans-serif' },
  { name: 'Helvetica Now Text', family: 'Helvetica Now Text', filename: 'helveticanowtext-bold-demo.ttf', weight: 700, style: 'normal', category: 'sans-serif' },
  { name: 'Neue Kaine', family: 'Neue Kaine', filename: 'neue-kaine-variable.ttf', weight: 400, style: 'normal', category: 'sans-serif' }
];

export const SYSTEM_FONTS: FontDefinition[] = [
  // Stack Sans family (Google Fonts)
  { name: 'Stack Sans Notch', family: 'Stack Sans Notch', filename: '', category: 'display' },
  { name: 'Stack Sans Text', family: 'Stack Sans Text', filename: '', category: 'sans-serif' },
  { name: 'Stack Sans Headline', family: 'Stack Sans Headline', filename: '', category: 'display' },
  // System Fonts
  { name: 'Arial', family: 'Arial', filename: '', category: 'sans-serif' },
  { name: 'Helvetica', family: 'Helvetica', filename: '', category: 'sans-serif' },
  { name: 'Times New Roman', family: 'Times New Roman', filename: '', category: 'serif' },
  { name: 'Georgia', family: 'Georgia', filename: '', category: 'serif' },
  { name: 'Courier New', family: 'Courier New', filename: '', category: 'monospace' },
  { name: 'Verdana', family: 'Verdana', filename: '', category: 'sans-serif' },
  { name: 'System UI', family: 'System UI', filename: '', category: 'sans-serif' },
  // Core Google Fonts
  { name: 'Inter', family: 'Inter', filename: '', category: 'sans-serif' },
  { name: 'Roboto', family: 'Roboto', filename: '', category: 'sans-serif' },
  { name: 'Roboto Condensed', family: 'Roboto Condensed', filename: '', category: 'sans-serif' },
  { name: 'Open Sans', family: 'Open Sans', filename: '', category: 'sans-serif' },
  { name: 'Lato', family: 'Lato', filename: '', category: 'sans-serif' },
  { name: 'Poppins', family: 'Poppins', filename: '', category: 'sans-serif' },
  { name: 'Montserrat', family: 'Montserrat', filename: '', category: 'sans-serif' },
  { name: 'Work Sans', family: 'Work Sans', filename: '', category: 'sans-serif' },
  { name: 'Nunito', family: 'Nunito', filename: '', category: 'sans-serif' },
  { name: 'Nunito Sans', family: 'Nunito Sans', filename: '', category: 'sans-serif' },
  { name: 'Raleway', family: 'Raleway', filename: '', category: 'sans-serif' },
  { name: 'Ubuntu', family: 'Ubuntu', filename: '', category: 'sans-serif' },
  { name: 'Ubuntu Mono', family: 'Ubuntu Mono', filename: '', category: 'monospace' },
  { name: 'Quicksand', family: 'Quicksand', filename: '', category: 'sans-serif' },
  { name: 'Comfortaa', family: 'Comfortaa', filename: '', category: 'display' },
  // Serif fonts
  { name: 'PT Serif', family: 'PT Serif', filename: '', category: 'serif' },
  { name: 'PT Serif Caption', family: 'PT Serif Caption', filename: '', category: 'serif' },
  { name: 'Libre Baskerville', family: 'Libre Baskerville', filename: '', category: 'serif' },
  { name: 'Instrument Serif', family: 'Instrument Serif', filename: '', category: 'serif' },
  { name: 'EB Garamond', family: 'EB Garamond', filename: '', category: 'serif' },
  { name: 'Lora', family: 'Lora', filename: '', category: 'serif' },
  { name: 'Cormorant SC', family: 'Cormorant SC', filename: '', category: 'serif' },
  { name: 'Zilla Slab', family: 'Zilla Slab', filename: '', category: 'serif' },
  { name: 'Stoke', family: 'Stoke', filename: '', category: 'serif' },
  // Display fonts
  { name: 'Bricolage Grotesque', family: 'Bricolage Grotesque', filename: '', category: 'display' },
  { name: 'Abril Fatface', family: 'Abril Fatface', filename: '', category: 'display' },
  { name: 'Unbounded', family: 'Unbounded', filename: '', category: 'display' },
  { name: 'Syne', family: 'Syne', filename: '', category: 'display' },
  // Sans-serif fonts (additional)
  { name: 'League Spartan', family: 'League Spartan', filename: '', category: 'sans-serif' },
  { name: 'Figtree', family: 'Figtree', filename: '', category: 'sans-serif' },
  { name: 'Manrope', family: 'Manrope', filename: '', category: 'sans-serif' },
  { name: 'DM Sans', family: 'DM Sans', filename: '', category: 'sans-serif' },
  { name: 'Instrument Sans', family: 'Instrument Sans', filename: '', category: 'sans-serif' },
  { name: 'Jost', family: 'Jost', filename: '', category: 'sans-serif' },
  { name: 'Space Grotesk', family: 'Space Grotesk', filename: '', category: 'sans-serif' },
  { name: 'Fira Sans', family: 'Fira Sans', filename: '', category: 'sans-serif' },
  // Monospace
  { name: 'IBM Plex Mono', family: 'IBM Plex Mono', filename: '', category: 'monospace' },
  { name: 'Space Mono', family: 'Space Mono', filename: '', category: 'monospace' },
  // Font Combo fonts (Google Fonts)
  { name: 'Albert Sans', family: 'Albert Sans', filename: '', category: 'sans-serif' },
  { name: 'Barlow', family: 'Barlow', filename: '', category: 'sans-serif' },
  { name: 'Rethink Sans', family: 'Rethink Sans', filename: '', category: 'sans-serif' },
  { name: 'Signika Negative', family: 'Signika Negative', filename: '', category: 'sans-serif' },
  { name: 'Sofia Sans', family: 'Sofia Sans', filename: '', category: 'sans-serif' },
  { name: 'Sofia Sans Condensed', family: 'Sofia Sans Condensed', filename: '', category: 'sans-serif' },
  { name: 'Sora', family: 'Sora', filename: '', category: 'sans-serif' },
  { name: 'Source Sans 3', family: 'Source Sans 3', filename: '', category: 'sans-serif' },
  { name: 'Source Sans Pro', family: 'Source Sans 3', filename: '', category: 'sans-serif' }, // Legacy name, maps to Source Sans 3
  { name: 'Spinnaker', family: 'Spinnaker', filename: '', category: 'sans-serif' },
  { name: 'Spline Sans', family: 'Spline Sans', filename: '', category: 'sans-serif' },
  { name: 'Tajawal', family: 'Tajawal', filename: '', category: 'sans-serif' },
  { name: 'Titillium Web', family: 'Titillium Web', filename: '', category: 'sans-serif' },
  { name: 'Urbanist', family: 'Urbanist', filename: '', category: 'sans-serif' },
  { name: 'Varela', family: 'Varela', filename: '', category: 'sans-serif' },
  { name: 'Yaldevi', family: 'Yaldevi', filename: '', category: 'sans-serif' },
  { name: 'Zen Kaku Gothic New', family: 'Zen Kaku Gothic New', filename: '', category: 'sans-serif' },
  // More Font Combo fonts (Google Fonts)
  { name: 'Google Sans', family: 'Google Sans', filename: '', category: 'sans-serif' },
  { name: 'Hubot Sans', family: 'Hubot Sans', filename: '', category: 'sans-serif' },
  { name: 'Mona Sans', family: 'Mona Sans', filename: '', category: 'sans-serif' },
  { name: 'Geist', family: 'Geist', filename: '', category: 'sans-serif' },
  { name: 'Sentient', family: 'Sentient', filename: '', category: 'serif' },
  { name: 'Supreme', family: 'Supreme', filename: '', category: 'sans-serif' },
  { name: 'Synonym', family: 'Synonym', filename: '', category: 'sans-serif' },
  { name: 'TikTok Sans', family: 'TikTok Sans', filename: '', category: 'sans-serif' },
  { name: 'Wix Madefor Display', family: 'Wix Madefor Display', filename: '', category: 'display' },
  { name: 'Wix Madefor Text', family: 'Wix Madefor Text', filename: '', category: 'sans-serif' },
];

export const ALL_FONTS = [...SYSTEM_FONTS, ...CUSTOM_FONTS];

export function getFontOptions() {
  return ALL_FONTS.map(font => ({ value: font.family, label: font.name }));
}

export function getCustomFontOptions() {
  return CUSTOM_FONTS.map(font => ({ value: font.family, label: font.name }));
}

export function getFontByFamily(family: string): FontDefinition | undefined {
  return ALL_FONTS.find(f => f.family === family);
}
