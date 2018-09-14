import React from 'react';
import { shallow } from 'enzyme';

import MePanel from './index';

const data = {
    name: 'Lorem Ipsum',
};

describe('MePanel', () => {
    const component = shallow(<MePanel data={data} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render name', () => {
        expect(component.text()).toBe('Lorem Ipsum');
    });
});
