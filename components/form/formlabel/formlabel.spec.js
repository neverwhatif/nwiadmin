import React from 'react';
import { shallow } from 'enzyme';

import FormLabel from './index';

describe('FormLabel', () => {
    const component = shallow(<FormLabel text="Lorem" for="ipsum" />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
});
