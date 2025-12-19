/**
 * Parser simples e leve para sintaxe inline em HTML estilizado
 *
 * Sintaxe: [texto|propriedade:valor;propriedade:valor]
 * Exemplo: [Olá|cor:#ff0000] [mundo|fonte:arial;negrito:true]
 */
/**
 * Interface para trechos de texto estilizados
 */
export interface StyledChunk {
    text: string;
    color?: string;
    font?: string;
    fontFamily?: string;
    size?: string;
    fontSize?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    letterSpacing?: string;
    lineHeight?: string;
    backgroundColor?: string;
    backgroundBlur?: string;
    blurColor?: string;
    blurOpacity?: number;
    blurFadeDirection?: 'horizontal' | 'vertical' | 'both';
    blurFadeAmount?: number;
    padding?: string;
    lineBreak?: boolean;
}
/**
 * Interface para estilos do campo pai
 */
export interface ParentStyles {
    color?: string;
    fontSize?: string;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    letterSpacing?: string;
    lineHeight?: string;
    backgroundColor?: string;
    padding?: string;
    textAlign?: string;
}
/**
 * Aplica estilos customizados em trechos específicos do texto com herança do campo pai
 *
 * @param text - Texto completo (ex: "Olá, mundo! Texto normal")
 * @param chunks - Array de trechos com estilos (ex: [{text: "Olá", color: "#ff0000"}])
 * @param parentStyles - Estilos do campo pai (titleStyle ou subtitleStyle) para herança
 * @returns HTML com spans estilizados aplicados aos trechos encontrados
 *
 * @example
 * // Com herança de estilos do pai
 * applyStyledChunks("Olá, mundo!", [
 *   {text: "Olá", color: "#ff0000"}  // Herda fontSize e fontFamily do pai
 * ], {
 *   color: "#000000",
 *   fontSize: "32px",
 *   fontFamily: "Arial"
 * })
 * // Retorna: <span style="color:#ff0000;font-size:32px;font-family:Arial">Olá</span>, mundo!
 *
 * @example
 * // Trechos duplicados: processa apenas a primeira ocorrência
 * applyStyledChunks("teste teste", [{text: "teste", bold: true}])
 * // Retorna: <span style="font-weight:bold">teste</span> teste
 */
export declare function applyStyledChunks(text: string, chunks: StyledChunk[], parentStyles?: ParentStyles): string;
/**
 * Converte sintaxe inline em HTML estilizado
 *
 * @param text - Texto com sintaxe inline: [texto|prop:valor;prop:valor]
 * @returns HTML com spans estilizados
 *
 * @example
 * parseInlineStyles('[Olá|cor:#ff0000] mundo')
 * // Retorna: <span style="color:#ff0000">Olá</span> mundo
 *
 * @example
 * parseInlineStyles('[Título|fonte:arial;tamanho:24;negrito:true]')
 * // Retorna: <span style="font-family:arial;font-size:24px;font-weight:bold">Título</span>
 *
 * @example
 * parseInlineStyles('Texto sem formatação')
 * // Retorna: Texto sem formatação
 */
export declare function parseInlineStyles(text: string): string;
//# sourceMappingURL=richTextConverter.d.ts.map