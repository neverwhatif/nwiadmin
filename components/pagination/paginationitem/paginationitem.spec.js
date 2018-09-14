import React from 'react';
import { shallow } from 'enzyme';

import PaginationItem from './index';

describe('PaginationItem', () => {
    const component = shallow(<PaginationItem to="lorem" label={1} />);
    const componentIsCurrent = shallow(<PaginationItem to="lorem" label={2} isCurrent />);
    const componentEllipsis = shallow(<PaginationItem type="ellipsis" />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentIsCurrent).toMatchSnapshot();
        expect(componentEllipsis).toMatchSnapshot();
    });
    it('should render link', () => {
        expect(component.is('Link')).toBe(true);
    });
    it('should render current', () => {
        expect(componentIsCurrent.hasClass('rootCurrent')).toBe(true);
    });
    it('should render ellipsis', () => {
        expect(componentEllipsis.is('span')).toBe(true);
        expect(componentEllipsis.hasClass('ellipsis')).toBe(true);
    });
    it('should handle scrollToTop', () => {
        window.scroll = jest.fn();

        component.simulate('click');
        expect(window.scroll).toHaveBeenCalled();
    });
});
