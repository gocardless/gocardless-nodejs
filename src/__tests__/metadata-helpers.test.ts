import { toMetadataValue, toMetadata, isValidMetadata, parseMetadataValue } from '../metadata-helpers';

describe('metadata helpers', () => {
  describe('toMetadataValue', () => {
    it('converts numbers to strings', () => {
      expect(toMetadataValue(12345)).toBe('12345');
      expect(toMetadataValue(0)).toBe('0');
      expect(toMetadataValue(-42)).toBe('-42');
      expect(toMetadataValue(3.14)).toBe('3.14');
    });

    it('converts booleans to strings', () => {
      expect(toMetadataValue(true)).toBe('true');
      expect(toMetadataValue(false)).toBe('false');
    });

    it('returns strings unchanged', () => {
      expect(toMetadataValue('hello')).toBe('hello');
      expect(toMetadataValue('12345')).toBe('12345');
    });

    it('converts null and undefined', () => {
      expect(toMetadataValue(null)).toBe('null');
      expect(toMetadataValue(undefined)).toBe('undefined');
    });

    it('serializes objects to JSON', () => {
      expect(toMetadataValue({ theme: 'dark' })).toBe('{"theme":"dark"}');
      expect(toMetadataValue({ a: 1, b: 2 })).toBe('{"a":1,"b":2}');
    });

    it('serializes arrays to JSON', () => {
      expect(toMetadataValue(['vip', 'early_bird'])).toBe('["vip","early_bird"]');
      expect(toMetadataValue([1, 2, 3])).toBe('[1,2,3]');
    });
  });

  describe('toMetadata', () => {
    it('converts all values to strings', () => {
      const result = toMetadata({
        user_id: 12345,
        is_active: true,
        name: 'John',
        settings: { theme: 'dark' },
      });

      expect(result).toEqual({
        user_id: '12345',
        is_active: 'true',
        name: 'John',
        settings: '{"theme":"dark"}',
      });
    });

    it('handles empty objects', () => {
      expect(toMetadata({})).toEqual({});
    });

    it('preserves existing strings', () => {
      const result = toMetadata({
        already_string: 'test',
        another_string: 'value',
      });

      expect(result).toEqual({
        already_string: 'test',
        another_string: 'value',
      });
    });
  });

  describe('isValidMetadata', () => {
    it('returns true for valid metadata', () => {
      expect(isValidMetadata({ key: 'value' })).toBe(true);
      expect(isValidMetadata({ a: 'foo', b: 'bar' })).toBe(true);
      expect(isValidMetadata({})).toBe(true);
    });

    it('returns false for objects with non-string values', () => {
      expect(isValidMetadata({ key: 123 })).toBe(false);
      expect(isValidMetadata({ key: true })).toBe(false);
      expect(isValidMetadata({ key: { nested: 'value' } })).toBe(false);
    });

    it('returns false for non-objects', () => {
      expect(isValidMetadata(null)).toBe(false);
      expect(isValidMetadata(undefined)).toBe(false);
      expect(isValidMetadata('string')).toBe(false);
      expect(isValidMetadata(123)).toBe(false);
    });
  });

  describe('parseMetadataValue', () => {
    it('parses numbers', () => {
      expect(parseMetadataValue('12345', 'number')).toBe(12345);
      expect(parseMetadataValue('3.14', 'number')).toBe(3.14);
      expect(parseMetadataValue('-42', 'number')).toBe(-42);
    });

    it('parses booleans', () => {
      expect(parseMetadataValue('true', 'boolean')).toBe(true);
      expect(parseMetadataValue('false', 'boolean')).toBe(false);
    });

    it('returns strings unchanged', () => {
      expect(parseMetadataValue('hello', 'string')).toBe('hello');
    });

    it('parses JSON', () => {
      expect(parseMetadataValue('{"theme":"dark"}', 'json')).toEqual({ theme: 'dark' });
      expect(parseMetadataValue('["vip","early_bird"]', 'json')).toEqual(['vip', 'early_bird']);
    });

    it('handles invalid JSON gracefully', () => {
      expect(parseMetadataValue('not valid json', 'json')).toBe('not valid json');
    });
  });
});
