/* eslint-disable no-unreachable, no-underscore-dangle */

import React from 'react';
import { mount, shallow } from 'enzyme';

import ErrorBoundary from './index';

jest.mock('nwiadmin/components/errormessage', () => 'ErrorMessage');
jest.mock('nwiadmin/components/scene', () => 'Scene');

const ProblemChild = () => {
    throw new Error('Error thrown from problem child');
    return <div>Error</div>;
};

describe('ErrorBoundary', () => {
    const component = shallow(<ErrorBoundary><div /></ErrorBoundary>);
    const componentIsScene = shallow(<ErrorBoundary isScene><div /></ErrorBoundary>);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentIsScene).toMatchSnapshot();
    });
    it('should render error', () => {
        expect(component.find('div').length).toBe(1);
        component.setState({ error: 'Lorem' });
        expect(component.find('ErrorMessage').length).toBe(1);
    });
    it('should render error scene', () => {
        expect(componentIsScene.find('div').length).toBe(1);
        componentIsScene.setState({ error: 'Lorem' });
        expect(componentIsScene.find('Scene').length).toBe(1);
        expect(componentIsScene.find('Scene').prop('title')).toBe('Error');
    });
});

describe('ErrorBoundary (Catch)', () => {
    beforeEach(() => {
        jest.spyOn(window._virtualConsole, 'emit').mockImplementation(() => false);
    });

    it('should catch errors with componentDidCatch', () => {
        jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');

        mount(<ErrorBoundary><ProblemChild /></ErrorBoundary>);
        expect(ErrorBoundary.prototype.componentDidCatch).toHaveBeenCalled();
    });
});
