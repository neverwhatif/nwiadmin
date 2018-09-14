import React from 'react';
import { shallow } from 'enzyme';

import FormField from './index';

describe('FormField', () => {
    const component = shallow(<FormField name="lorem">Lorem</FormField>);
    const componentWithLabel = shallow(<FormField name="lorem" label="Lorem">Lorem</FormField>);
    const componentWithChildren = shallow(<FormField name="lorem"><input /></FormField>);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render a label', () => {
        expect(component.find('FormLabel').length).toBe(0);
        expect(componentWithLabel.find('FormLabel').length).toBe(1);
    });
    it('should render children', () => {
        expect(componentWithChildren.find('input').prop('name')).toBe('lorem');
    });
});
