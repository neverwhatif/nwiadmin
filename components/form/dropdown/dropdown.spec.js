import React from 'react';
import { shallow } from 'enzyme';

import Dropdown from './index';

jest.mock('./dropdownclear', () => 'DropdownClear');
jest.mock('./dropdowninput', () => 'DropdownInput');
jest.mock('./dropdownlist', () => 'DropdownList');

const data = [{
    id: 1,
    name: 'Lorem',
}, {
    id: 2,
    name: 'Ipsum',
}];

describe('Dropdown', () => {
    const component = shallow(<Dropdown name="lorem" data={data} />);
    const componentIsLoading = shallow(<Dropdown name="lorem" data={data} isLoading />);
    const componentWithInitialValue = shallow(<Dropdown name="lorem" data={data} value="1" />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentIsLoading).toMatchSnapshot();
        expect(componentWithInitialValue).toMatchSnapshot();
    });
    it('should render loading', () => {
        expect(componentIsLoading.hasClass('rootDisabled')).toBe(true);
    });
    it('should render clear button', () => {
        expect(component.find('DropdownClear').length).toBe(0);
        component.setState({ value: 'lorem' });
        expect(component.find('DropdownClear').length).toBe(1);
    });
    it('should have initial value', () => {
        expect(componentWithInitialValue.state('value')).toBe('Lorem');
    });
    it('should update value', () => {
        componentWithInitialValue.setProps({ value: 1 });
        expect(componentWithInitialValue.state('value')).toBe('Lorem');
        componentWithInitialValue.setProps({ value: 2 });
        expect(componentWithInitialValue.state('value')).toBe('Ipsum');

        // Change it to the same as previously, to make sure nothing changes
        componentWithInitialValue.setProps({ value: 2 });
        expect(componentWithInitialValue.state('value')).toBe('Ipsum');
    });
    it('should open and close list state', () => {
        expect(component.state('isListOpen')).toBe(false);
        component.instance().openList();
        expect(component.state('isListOpen')).toBe(true);
        component.instance().closeList();
        expect(component.state('isListOpen')).toBe(false);
    });
    it('should have default onChange', () => {
        expect(Dropdown.defaultProps.onChange()).toBeNull();
    });
    it('should selectItem state', () => {
        // Use custom component to help keep track of it's state better
        const localComponent = shallow(<Dropdown name="lorem" data={data} />);
        localComponent.instance().closeList = jest.fn();

        expect(localComponent.state('value')).toBeNull();

        localComponent.instance().selectItem(data[0]);
        expect(localComponent.state('value')).toBe(data[0].name);
        expect(localComponent.instance().closeList).toHaveBeenCalledTimes(1);
    });
    it('should clearItem state', () => {
        // Use custom component to help keep track of it's state better
        const localComponent = shallow(<Dropdown name="lorem" data={data} />);
        localComponent.setState({ value: 'Lorem' });

        localComponent.instance().clearItem();
        expect(localComponent.state('value')).toBeNull();
    });
    it('should handle onChange when selecting', () => {
        // Use custom component to help keep track of it's state better
        const onChange = jest.fn();
        const localComponent = shallow(<Dropdown name="lorem" data={data} onChange={item => onChange(item)} />);
        localComponent.instance().selectItem(data[0]);

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({ target: { name: 'lorem', value: 1 } });
    });
    it('should handle onChange when clearing', () => {
        // Use custom component to help keep track of it's state better
        const onChange = jest.fn();
        const localComponent = shallow(<Dropdown name="lorem" data={data} onChange={item => onChange(item)} />);
        localComponent.instance().clearItem();

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith({ target: { name: 'lorem', value: null } });
    });
    it('should mount and unmount', () => {
        const addEventListener = jest.fn();
        const removeEventListener = jest.fn();

        document.addEventListener = addEventListener;
        document.removeEventListener = removeEventListener;

        const unmountingComponent = shallow(<Dropdown name="lorem" data={data} />);
        unmountingComponent.unmount();

        expect(addEventListener).toHaveBeenCalledTimes(1);
        expect(removeEventListener).toHaveBeenCalledTimes(1);
    });
});
