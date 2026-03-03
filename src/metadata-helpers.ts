/**
 * Helper utilities for working with metadata fields
 *
 * The GoCardless API requires metadata values to be strings.
 * These helpers make it easy to convert other types to strings.
 */

/**
 * Convert any value to a string suitable for metadata
 *
 * @example
 * const metadata = {
 *   user_id: toMetadataValue(12345),        // "12345"
 *   is_active: toMetadataValue(true),       // "true"
 *   settings: toMetadataValue({theme: 'dark'})  // '{"theme":"dark"}'
 * };
 */
export function toMetadataValue(value: unknown): string {
  if (value === null || value === undefined) {
    return String(value);
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  // Objects and arrays - serialize to JSON
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

/**
 * Convert an object with mixed values to metadata-compatible format
 *
 * @example
 * const metadata = toMetadata({
 *   user_id: 12345,
 *   is_active: true,
 *   tags: ['vip', 'early_bird']
 * });
 * // Result: { user_id: "12345", is_active: "true", tags: '["vip","early_bird"]' }
 */
export function toMetadata(obj: Record<string, unknown>): { [key: string]: string } {
  const result: { [key: string]: string } = {};

  for (const [key, value] of Object.entries(obj)) {
    result[key] = toMetadataValue(value);
  }

  return result;
}

/**
 * Type guard to check if an object is valid metadata
 */
export function isValidMetadata(obj: unknown): obj is { [key: string]: string } {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  return Object.values(obj).every((val) => typeof val === 'string');
}

/**
 * Parse a metadata value back to its original type
 * Useful for reading metadata from API responses
 *
 * @example
 * const userId = parseMetadataValue(metadata.user_id, 'number');  // 12345
 * const isActive = parseMetadataValue(metadata.is_active, 'boolean');  // true
 */
export function parseMetadataValue(value: string, type: 'string'): string;
export function parseMetadataValue(value: string, type: 'number'): number;
export function parseMetadataValue(value: string, type: 'boolean'): boolean;
export function parseMetadataValue(value: string, type: 'json'): unknown;
export function parseMetadataValue(value: string, type: 'string' | 'number' | 'boolean' | 'json'): unknown {
  switch (type) {
    case 'string':
      return value;
    case 'number':
      return Number(value);
    case 'boolean':
      return value === 'true';
    case 'json':
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
  }
}
