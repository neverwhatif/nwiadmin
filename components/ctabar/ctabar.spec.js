import React from 'react';
import { shallow } from 'enzyme';

import CTABar from './index';

jest.mock('nwiadmin/components/button', () => 'Button');

const data = [{
    label: 'Lorem',
    action: jest.fn(),
}, {
    label: 'Ipsum',
    action: jest.fn(),
}];

describe('CTABar', () => {
    const component = shallow(<CTABar data={data} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render buttons', () => {
        expect(component.find('Button').length).toBe(2);
    });
    it('should render button content', () => {
        expect(component.find('Button').first().key()).toBe('Lorem');
    });
});
