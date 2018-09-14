import React from 'react';
import { shallow } from 'enzyme';

import FormError from './index';

describe('FormError', () => {
    it('should render', () => {
        expect(shallow(<FormError />)).toMatchSnapshot();
    });
});
