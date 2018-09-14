import { buildNestedPath, checkPathIsActive } from './nav';

describe('Nav Service', () => {
    describe('buildNestedPath', () => {
        it('should build basic path', () => {
            expect(buildNestedPath('lorem', 'ipsum')).toBe('/lorem/ipsum');
        });
        it('should build from empty', () => {
            expect(buildNestedPath()).toBe('/');
        });
        it('should build from empty base path', () => {
            expect(buildNestedPath(null, 'ipsum')).toBe('/ipsum');
        });
        it('should build from empty path', () => {
            expect(buildNestedPath('lorem')).toBe('/lorem');
        });
    });
    describe('checkPathIsActive', () => {
        it('should check if paths match', () => {
            expect(checkPathIsActive('/lorem', '/lorem')).toBe(true);
            expect(checkPathIsActive('/lorem', '/ipsum')).toBe(false);
        });
        it('should check if partial paths match', () => {
            expect(checkPathIsActive('/lorem', '/lorem/123', false)).toBe(true);
            expect(checkPathIsActive('/lorem', '/ipsum', false)).toBe(false);
            expect(checkPathIsActive('/lorem', '/lorem/123')).toBe(false);
        });
    });
});
