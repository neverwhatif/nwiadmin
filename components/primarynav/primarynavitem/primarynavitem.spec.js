import React from 'react';
import { shallow } from 'enzyme';

import PrimaryNavItem from './index';

describe('PrimaryNavItem', () => {
    const component = (<PrimaryNavItem path="lorem" title="Lorem" />);
    const activeComponent = (<PrimaryNavItem path="lorem" title="Lorem" isActive />);
    const disabledComponent = (<PrimaryNavItem path="lorem" title="Lorem" isDisabled />);

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
