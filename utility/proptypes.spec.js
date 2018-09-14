// defaultWithConnected is the only function that needs explicitly testing. All other exports are dealt with by other
// components.

import { defaultWithConnected } from './proptypes';

describe('PropTypes', () => {
    it('should defaultWithConnected', () => {
        expect(defaultWithConnected.transformer('lorem')).toBe('lorem');
    });
});
