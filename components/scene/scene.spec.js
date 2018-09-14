import React from 'react';
import { shallow } from 'enzyme';

import Scene from './index';

jest.mock('nwiadmin/components/errorboundary', () => 'ErrorBoundary');
jest.mock('nwiadmin/components/tabs', () => 'Tabs');

const mockTabs = [{
    data: [{
        label: 'Lorem',
        path: 'lorem',
    }, {
        label: 'Ipsum',
        path: 'ipsum',
    }],
}];

describe('Scene', () => {
    const component = shallow(<Scene title="Lorem">Ipsum</Scene>);
    const componentWithSubtitle = shallow(<Scene title="Lorem" subtitle="Ipsum">Ipsum</Scene>);
    const componentWithTabs = shallow(<Scene title="Lorem" tabs={mockTabs}>Ipsum</Scene>);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentWithSubtitle).toMatchSnapshot();
        expect(componentWithTabs).toMatchSnapshot();
    });
    it('should render ErrorBoundary', () => {
        expect(component.find('ErrorBoundary').length).toBe(1);
    });
    it('should render subtitle', () => {
        expect(component.find('p.subtitle').length).toBe(0);
        expect(componentWithSubtitle.find('p.subtitle').length).toBe(1);
    });
    it('should render tabs', () => {
        expect(component.find('Tabs').length).toBe(0);
        expect(componentWithTabs.find('Tabs').length).toBe(1);
    });
});
