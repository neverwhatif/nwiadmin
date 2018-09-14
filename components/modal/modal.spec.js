import React from 'react';
import { shallow } from 'enzyme';

import { ModalComponent } from './index';

const mockLocation = { pathname: 'lorem' };
const mockNewLocation = { pathname: 'ipsum' };

describe('ModalComponent', () => {
    const component = shallow(<ModalComponent isOpen={false}>Lorem</ModalComponent>);
    const componentOpen = shallow(<ModalComponent isOpen>Lorem</ModalComponent>);
    const componentWithTitle = shallow(<ModalComponent isOpen title="Lorem">Lorem</ModalComponent>);
    const componentWithType = shallow(<ModalComponent isOpen type="lorem">Lorem</ModalComponent>);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentOpen).toMatchSnapshot();
        expect(componentWithTitle).toMatchSnapshot();
        expect(componentWithType).toMatchSnapshot();
    });
    it('should be open', () => {
        expect(component.prop('isOpen')).toBe(false);
        expect(componentOpen.prop('isOpen')).toBe(true);
    });
    it('should be closed', () => {
        componentOpen.setState({ isAllowedOpen: false });
        expect(componentOpen.prop('isOpen')).toBe(false);
    });
    it('should render title', () => {
        expect(componentWithTitle.hasClass('contentHasTitle')).toBe(true);
    });
    it('should render type', () => {
        expect(componentWithType.hasClass('contentLorem')).toBe(true);
    });
    it('should have a default onRequestClose', () => {
        expect(ModalComponent.defaultProps.onRequestClose()).toBe(null);
    });
    it('should handle no location', () => {
        // Kept of the initial component definitions to help with resetting state and props
        const componentWithLocation = shallow(<ModalComponent isOpen location={mockLocation}>Lorem</ModalComponent>);

        componentWithLocation.setProps({ location: null });
        expect(componentWithLocation.state('isAllowedOpen')).toBe(true);
    });
    it('should close on location change', () => {
        // Kept of the initial component definitions to help with resetting state and props
        const componentWithLocation = shallow(<ModalComponent isOpen location={mockLocation}>Lorem</ModalComponent>);

        componentWithLocation.setProps({ location: mockNewLocation });
        expect(componentWithLocation.state('isAllowedOpen')).toBe(false);
    });
});
