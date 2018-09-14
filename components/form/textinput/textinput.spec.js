import React from 'react';
import { shallow } from 'enzyme';

import TextInput from './index';

describe('TextInput', () => {
    it('should render', () => {
        expect(shallow(<TextInput onChange={() => null} />)).toMatchSnapshot();
    });
    it('should handle change', () => {
        let number = 0;
        const component = shallow(<TextInput onChange={() => { number += 1; }} />);

        expect(number).toBe(0);
        component.simulate('change');
        expect(number).toBe(1);
    });
});
