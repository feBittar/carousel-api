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
  { name: 'Arial', family: 'Arial', filename: '', category: 'sans-serif' },
  { name: 'Helvetica', family: 'Helvetica', filename: '', category: 'sans-serif' },
  { name: 'Times New Roman', family: 'Times New Roman', filename: '', category: 'serif' },
  { name: 'Georgia', family: 'Georgia', filename: '', category: 'serif' },
  { name: 'PT Serif', family: 'PT Serif', filename: '', category: 'serif' },
  { name: 'Libre Baskerville', family: 'Libre Baskerville', filename: '', category: 'serif' },
  { name: 'Courier New', family: 'Courier New', filename: '', category: 'monospace' },
  { name: 'Verdana', family: 'Verdana', filename: '', category: 'sans-serif' },
  { name: 'Roboto', family: 'Roboto', filename: '', category: 'sans-serif' },
  { name: 'Open Sans', family: 'Open Sans', filename: '', category: 'sans-serif' },
  { name: 'Lato', family: 'Lato', filename: '', category: 'sans-serif' },
  { name: 'League Spartan', family: 'League Spartan', filename: '', category: 'sans-serif' },
  { name: 'Inter', family: 'Inter', filename: '', category: 'sans-serif' },
  { name: 'Instrument Serif', family: 'Instrument Serif', filename: '', category: 'serif' },
  { name: 'Poppins', family: 'Poppins', filename: '', category: 'sans-serif' },
  { name: 'System UI', family: 'System UI', filename: '', category: 'sans-serif' },
  { name: 'Abril Fatface', family: 'Abril Fatface', filename: '', category: 'display' },
  { name: 'Fira Sans', family: 'Fira Sans', filename: '', category: 'sans-serif' },
  { name: 'EB Garamond', family: 'EB Garamond', filename: '', category: 'serif' },
  { name: 'Figtree', family: 'Figtree', filename: '', category: 'sans-serif' },
  { name: 'Lora', family: 'Lora', filename: '', category: 'serif' },
  { name: 'Bricolage Grotesque', family: 'Bricolage Grotesque', filename: '', category: 'sans-serif' },
  { name: 'IBM Plex Mono', family: 'IBM Plex Mono', filename: '', category: 'monospace' },
  { name: 'Manrope', family: 'Manrope', filename: '', category: 'sans-serif' },
  { name: 'Roboto Condensed', family: 'Roboto Condensed', filename: '', category: 'sans-serif' },
  { name: 'DM Sans', family: 'DM Sans', filename: '', category: 'sans-serif' },
  { name: 'Instrument Sans', family: 'Instrument Sans', filename: '', category: 'sans-serif' },
  { name: 'Jost', family: 'Jost', filename: '', category: 'sans-serif' },
  { name: 'Space Grotesk', family: 'Space Grotesk', filename: '', category: 'sans-serif' },
  { name: 'Cormorant SC', family: 'Cormorant SC', filename: '', category: 'serif' },
  { name: 'PT Serif Caption', family: 'PT Serif Caption', filename: '', category: 'serif' }
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
