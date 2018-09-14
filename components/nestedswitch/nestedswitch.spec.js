import React from 'react';
import { shallow } from 'enzyme';

import NestedSwitch, { renderRoute } from './index';

jest.mock('nwiadmin/scenes/404');

const routes = [{
    path: 'lorem',
    component: jest.fn(),
}, {
    path: 'ipsum',
    component: jest.fn(),
}];

describe('NestedSwitch', () => {
    const component = shallow(<NestedSwitch routes={routes} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render routes', () => {
        expect(component.find('Route').length).toBe(3); // 2 above, plus the error404
    });
    it('should use render prop for route', () => {
        const routeComponent = component.find('Route').first();
        const deepRoute = routeComponent.prop('render')({ lorem: 1 });

        expect(deepRoute.props.lorem).toBe(1);
    });
    it('should have working render prop for route', () => {
        const data = { ipsum: 1 };
        const deepRoute = renderRoute('div', { lorem: 1 }, 'lorem', data);
        const route = shallow(deepRoute);

        expect(route.type()).toBe('div');
        expect(route.prop('lorem')).toBe(1);
        expect(route.prop('basePath')).toBe('lorem');
        expect(route.prop('data')).toEqual(data);
    });
});
