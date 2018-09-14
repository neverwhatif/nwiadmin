import React from 'react';
import { shallow } from 'enzyme';

import ListItemMeta from './index';

describe('ListItemMeta', () => {
    const component = shallow(<ListItemMeta data={['Lorem', 'Ipsum']} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });

    it('should render a list', () => {
        expect(component.find('li').length).toBe(2);
    });
});
