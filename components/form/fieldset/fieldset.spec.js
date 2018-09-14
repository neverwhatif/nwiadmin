import React from 'react';
import { shallow } from 'enzyme';

import Fieldset from './index';

jest.mock('nwiadmin/components/form/formlegend', () => 'FormLegend');

describe('Fieldset', () => {
    const component = shallow(<Fieldset><span>Lorem</span></Fieldset>);
    const componentWithLegend = shallow(<Fieldset legend="Lorem"><span>Lorem</span></Fieldset>);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentWithLegend).toMatchSnapshot();
    });
    it('should render a legend', () => {
        expect(component.find('FormLegend').length).toBe(0);
        expect(componentWithLegend.find('FormLegend').length).toBe(1);
        expect(componentWithLegend.find('FormLegend').prop('children')).toBe('Lorem');
    });
});
