import React from 'react';
import { shallow } from 'enzyme';

import FormLegend from './index';

jest.mock('nwiadmin/components/flag', () => 'Flag');

describe('FormLegend', () => {
    const component = shallow(<FormLegend>Lorem</FormLegend>);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render text', () => {
        expect(component.text()).toBe('Lorem');
    });
});
