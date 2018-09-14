import React from 'react';
import { shallow } from 'enzyme';

import Row from './index';

describe('Row', () => {
    const component = shallow(<Row><p /></Row>);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render children', () => {
        expect(component.find('p').length).toBe(1);
    });
});
