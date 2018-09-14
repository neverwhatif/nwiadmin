import React from 'react';
import { shallow } from 'enzyme';

import ErrorMessage from './index';

describe('ErrorMessage', () => {
    const component = shallow(<ErrorMessage />);
    const componentWithTitle = shallow(<ErrorMessage title="Lorem" />);
    const componentWithDescription = shallow(<ErrorMessage description="Lorem" />);
    const componentWithDetails = shallow(<ErrorMessage details="Lorem" />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentWithTitle).toMatchSnapshot();
        expect(componentWithDescription).toMatchSnapshot();
        expect(componentWithDetails).toMatchSnapshot();
    });
    it('should render default title', () => {
        expect(shallow(<ErrorMessage />).find('h1').text()).toBe('Error');
    });
    it('should render a title', () => {
        expect(componentWithTitle.find('h1').length).toBe(1);
        expect(componentWithTitle.find('h1').text()).toBe('Lorem');
    });
    it('should render a description', () => {
        expect(componentWithDescription.find('p.description').length).toBe(1);
        expect(componentWithDescription.find('p.description').text()).toBe('Lorem');
    });
    it('should render details', () => {
        expect(componentWithDetails.find('small').length).toBe(1);
        expect(componentWithDetails.find('small').text()).toBe('Details: Lorem');
    });
    it('should render PrimaryButton', () => {
        expect(component.find('PrimaryButton').length).toBe(1);
    });

    it('should handle reload', () => {
        window.location.reload = jest.fn();

        const primaryButton = component.find('PrimaryButton');
        primaryButton.simulate('click');

        expect(window.location.reload).toHaveBeenCalled();
    });
});
