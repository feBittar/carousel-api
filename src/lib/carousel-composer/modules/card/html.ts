import { ModuleData } from '../../types';
import { CardData } from './schema';

/**
 * Generates HTML for the Card module
 *
 * Returns a card-container div that will wrap content modules.
 * The compositer will inject content modules inside this container.
 */
export function getCardHtml(data: ModuleData): string {
  const card = data as unknown as CardData;

  if (!card.enabled) {
    return '';
  }

  // Return card container div - compositer will inject content inside
  return '<div class="card-container"></div>';
}
