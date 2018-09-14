import React from 'react';
import { shallow } from 'enzyme';

import BannerLogo from './index';

jest.mock('nwiadmin/components/link', () => 'Link');

describe('BannerLogo', () => {
    it('should render', () => {
        expect(shallow(<BannerLogo />)).toMatchSnapshot();
    });
});
