import React from 'react';
import { shallow } from 'enzyme';

import DropdownInput from './index';

jest.mock('nwiadmin/utility');

describe('DropdownInput', () => {
    const component = shallow(<DropdownInput text="Lorem" />);
    const componentIsLoading = shallow(<DropdownInput text="Lorem" isLoading />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentIsLoading).toMatchSnapshot();
    });
    it('should render text', () => {
        expect(component.text()).toBe('Lorem');
    });
    it('should render loading', () => {
        expect(componentIsLoading.text()).toBe('Loading...');
    });
    it('should have a default onClick', () => {
        expect(DropdownInput.defaultProps.onClick()).toBeNull();
    });
    it('should handle onClick', () => {
        const mockOnClick = jest.fn();
        const componentWithClick = shallow(<DropdownInput text="Lorem" onClick={() => mockOnClick()} />);

        componentWithClick.simulate('click');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
    it('should handle onKeyDown', () => {
        const mockOnClick = jest.fn();
        const componentWithClick = shallow(<DropdownInput text="Lorem" onClick={() => mockOnClick()} />);

        componentWithClick.simulate('keyDown');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});
