import React from 'react';
import { shallow } from 'enzyme';

import Reference from './index';

jest.mock('nwiadmin/components/link', () => 'Link');

describe('Reference', () => {
    const component = shallow(<Reference title="Lorem" reference="ipsum" />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render text', () => {
        expect(component.text()).toBe('Loremipsum');
    });
    it('should render reference', () => {
        expect(component.find('.reference').length).toBe(1);
        expect(component.find('.reference').text()).toBe('ipsum');
    });
});
