import {
    parseSearch,
    stringifySearch,
    ucwords,
    isPromise,
    onAccessibleKeyDown,
    unique,
    addPrefixToClassNames,
    parseRemote,
} from './index';

describe('Utility', () => {
    it('should parseSearch', () => {
        expect(parseSearch('lorem=1')).toEqual({ lorem: '1' });
        expect(parseSearch('?lorem=1')).toEqual({ lorem: '1' });
    });
    it('should stringifySearch', () => {
        expect(stringifySearch({
            lorem: 'ipsum',
        })).toBe('lorem=ipsum');
    });
    it('should ucwords', () => {
        expect(ucwords('Lorem')).toBe('Lorem');
        expect(ucwords('lOrem')).toBe('LOrem');
        expect(ucwords('lorem')).toBe('Lorem');
        expect(ucwords('lorem ipsum')).toBe('Lorem Ipsum');
    });
    it('should isPromise', () => {
        const prom = new Promise(() => null);

        expect(isPromise(prom)).toBe(true);
        expect(isPromise({ lorem: 1 })).toBe(false);
        expect(isPromise(null)).toBe(false);
        expect(isPromise('Lorem')).toBe(false);
    });
    it('should onAccessibleKeyDown', () => {
        const mockTrueEvent = { keyCode: 13 };
        const mockFalseEvent = { keyCode: 9 };

        const callback = jest.fn();

        onAccessibleKeyDown(mockTrueEvent, callback);
        onAccessibleKeyDown(mockFalseEvent, callback);

        expect(callback).toHaveBeenCalledTimes(1);
    });
    it('should unique', () => {
        expect(unique([])).toEqual([]);
        expect(unique([1, 2, 2, 3, 4])).toEqual([1, 2, 3, 4]);
        expect(unique([9, 8, 2, 9, 1])).toEqual([9, 8, 2, 1]);
    });
    it('should addPrefixToClassNames', () => {
        const styles1 = {
            prefixLorem: 'prefixedLorem',
            prefixIpsum: 'prefixedIpsum',
        };

        const styles2 = {
            prefix: 'prefixed',
        };

        expect(addPrefixToClassNames(styles1, 'prefix', ['lorem', 'ipsum'])).toEqual([
            'prefixedLorem',
            'prefixedIpsum',
        ]);
        expect(addPrefixToClassNames(styles2, 'prefix')).toEqual(['prefixed']);
    });
    it('should parseRemote', () => {
        expect(parseRemote('lorem', 'lorem=ipsum')).toEqual({
            alias: 'lorem',
            params: {
                lorem: 'ipsum',
            },
        });
        expect(parseRemote(['lorem', { lorem: 'ipsum' }], 'ipsum=lorem')).toEqual({
            alias: 'lorem',
            params: {
                lorem: 'ipsum',
                ipsum: 'lorem',
            },
        });
    });
});
