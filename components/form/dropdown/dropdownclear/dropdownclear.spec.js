import React from 'react';
import { shallow } from 'enzyme';

import DropdownClear from './index';

jest.mock('nwiadmin/utility');

describe('DropdownClear', () => {
    const component = shallow(<DropdownClear onClick={() => null} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should handle onClick', () => {
        const mockOnClick = jest.fn();
        const componentWithClick = shallow(<DropdownClear onClick={() => mockOnClick()} />);

        componentWithClick.simulate('click');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
    it('should handle onKeyDown', () => {
        const mockOnClick = jest.fn();
        const componentWithClick = shallow(<DropdownClear onClick={() => mockOnClick()} />);

        componentWithClick.simulate('keyDown');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});
