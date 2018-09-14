import React from 'react';
import { shallow } from 'enzyme';

import { TabsComponent } from './index';

jest.mock('./tabitem', () => 'TabItem');

const mockLocation = {
    pathname: '/lorem',
    search: '',
};

const mockUpdatedLocation = {
    pathname: '/ipsum',
    search: '',
};

const data = [{
    key: 0,
    label: 'Lorem',
    path: 'lorem',
}, {
    key: 1,
    label: 'Ipsum',
    path: 'ipsum',
}];

describe('TabsComponent', () => {
    const component = shallow(<TabsComponent data={data} basePath="lorem" location={mockLocation} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render tab items', () => {
        expect(component.find('li').length).toBe(2);
        expect(component.find('TabItem').length).toBe(2);
    });
    it('should run shouldComponentUpdate', () => {
        const shouldNotUpdate = component.instance().shouldComponentUpdate({ location: mockLocation });
        expect(shouldNotUpdate).toBe(false);

        const shouldUpdate = component.instance().shouldComponentUpdate({ location: mockUpdatedLocation });
        expect(shouldUpdate).toBe(true);
    });
});
