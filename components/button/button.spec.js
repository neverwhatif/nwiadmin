import React from 'react';
import { shallow } from 'enzyme';

import Button, { PrimaryButton } from './index';

jest.mock('nwiadmin/components/link', () => 'Link');
const mockOnClick = jest.fn();

describe('Button', () => {
    const component = shallow(<Button>Lorem</Button>);
    const componentWithStyle = shallow(<Button buttonStyle="lorem">Lorem</Button>);
    const componentDisabled = shallow(<Button isDisabled>Lorem</Button>);
    const componentLink = shallow(<Button to="lorem">Lorem</Button>);
    const componentOnClick = shallow(<Button onClick={() => mockOnClick()}>Lorem</Button>);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentWithStyle).toMatchSnapshot();
        expect(componentDisabled).toMatchSnapshot();
        expect(componentLink).toMatchSnapshot();
        expect(componentOnClick).toMatchSnapshot();
    });
    it('should render text', () => {
        expect(component.text()).toBe('Lorem');
    });
    it('should render styles', () => {
        expect(componentWithStyle.hasClass('rootLorem')).toBe(true);
    });
    it('should have a default onClick', () => {
        expect(Button.defaultProps.onClick()).toBe(null);
    });
    it('should be disabled', () => {
        expect(componentDisabled.prop('disabled')).toBe(true);
    });
    it('should render link', () => {
        expect(componentLink.find('Link').length).toBe(1);
        expect(componentLink.prop('to')).toBe('lorem');
    });
    it('should handle click', () => {
        componentOnClick.simulate('click');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});

describe('PrimaryButton', () => {
    const component = shallow(<PrimaryButton>Lorem</PrimaryButton>);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render a button', () => {
        expect(component.children().length).toBe(1);
        expect(component.containsMatchingElement(<Button>Lorem</Button>)).toBe(true);
    });
    it('should render primary styles', () => {
        expect(component.dive().hasClass('rootPrimary')).toBe(true);
    });
});
