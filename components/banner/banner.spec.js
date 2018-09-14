import React from 'react';
import { shallow } from 'enzyme';

import { BannerComponent } from './index';

jest.mock('nwiadmin/services/me/meable');
jest.mock('nwiadmin/components/primarynav', () => 'PrimaryNav');
jest.mock('./bannerlogo', () => 'BannerLogo');
jest.mock('./mepanel', () => 'MePanel');

const me = {
    name: 'Lorem Ipsum',
};

describe('Banner', () => {
    const component = shallow(<BannerComponent />);
    const componentWithMe = shallow(<BannerComponent me={me} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentWithMe).toMatchSnapshot();
    });

    it('should render logo if no me', () => {
        expect(component.children().length).toBe(1);
        expect(component.find('BannerLogo').length).toBe(1);
    });

    it('should render nav and mepanel if me', () => {
        expect(componentWithMe.children().length).toBe(2); // 2 instead of 3 due to Fragment
        expect(componentWithMe.find('MePanel').length).toBe(1);
        expect(componentWithMe.find('MePanel').prop('data')).toEqual(me);
        expect(componentWithMe.find('PrimaryNav').length).toBe(1);
    });
});
