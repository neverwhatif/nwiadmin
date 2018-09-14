import React from 'react';
import { shallow } from 'enzyme';

import DropdownList from './index';

jest.mock('nwiadmin/utility');

const data = [{
    id: 1,
    name: 'Lorem',
}, {
    id: 2,
    name: 'Ipsum',
}];

describe('DropdownList', () => {
    const component = shallow(<DropdownList data={data} />);
    const componentIsOpen = shallow(<DropdownList data={data} isOpen />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentIsOpen).toMatchSnapshot();
    });
    it('should be closed', () => {
        expect(component.type()).toBeNull();
    });
    it('should be open', () => {
        expect(componentIsOpen.type()).toBe('ul');
    });
    it('should handle onItemClick', () => {
        const mockOnClick = jest.fn();
        const componentWithClick = shallow(<DropdownList data={data} onItemClick={() => mockOnClick()} isOpen />);

        componentWithClick.find('li').first().simulate('click');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
    it('should handle onKeyDown', () => {
        const mockOnClick = jest.fn();
        const componentWithClick = shallow(<DropdownList data={data} onItemClick={() => mockOnClick()} isOpen />);

        componentWithClick.find('li').first().simulate('keyDown');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});
