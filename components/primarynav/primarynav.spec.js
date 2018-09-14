import React from 'react';
import { shallow } from 'enzyme';

import { PrimaryNavComponent } from './index';

const mockLocation = {
    pathname: '/lorem',
    search: '',
};

describe('PrimaryNavComponent', () => {
    it('should render', () => {
        expect(shallow(<PrimaryNavComponent location={mockLocation} />)).toMatchSnapshot();
    });
});
