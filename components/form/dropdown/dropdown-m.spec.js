import React from 'react';
import { mount, shallow } from 'enzyme';

import Dropdown from './index';

jest.mock('./dropdownclear', () => jest.fn(() => 1));
jest.mock('./dropdowninput', () => jest.fn(() => 1));
jest.mock('./dropdownlist', () => jest.fn(() => 1));

const data = [{
    id: 1,
    name: 'Lorem',
}, {
    id: 2,
    name: 'Ipsum',
}];

describe('Mounted Dropdown', () => {
    const component = (<Dropdown name="lorem" data={data} />);

    it('should have a ref', () => {
        const wrapper = mount(component);
        expect(wrapper.instance().node).toBeTruthy();
    });
    it('should handleClickOutside with outside node', () => {
        const wrapper = mount(component);
        const target = shallow(<div />).instance();
        const spy = jest.spyOn(wrapper.instance(), 'closeList');

        wrapper.instance().handleClickOutside({ target });
        expect(spy).toHaveBeenCalledTimes(1);
    });
    it('should handleClickOutside with inside node', () => {
        const wrapper = mount(component);
        const target = wrapper.find('div').first().instance();
        const spy = jest.spyOn(wrapper.instance(), 'closeList');

        wrapper.instance().handleClickOutside({ target });
        expect(spy).toHaveBeenCalledTimes(0);
    });
});
