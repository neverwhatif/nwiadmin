import React from 'react';
import { shallow } from 'enzyme';

import TabItem from './index';

jest.mock('nwiadmin/components/link', () => 'Link');

describe('TabItem', () => {
    const component = (<TabItem path="lorem" label="Lorem" />);
    const activeComponent = (<TabItem path="lorem" label="Lorem" isActive />);
    const disabledComponent = (<TabItem path="lorem" label="Lorem" isDisabled />);

    it('should render', () => {
        expect(shallow(component)).toMatchSnapshot();
    });
    it('should render active', () => {
        expect(shallow(activeComponent).hasClass('rootActive')).toBe(true);
    });
    it('should render disabled', () => {
        expect(shallow(disabledComponent).hasClass('rootDisabled')).toBe(true);
    });
});
