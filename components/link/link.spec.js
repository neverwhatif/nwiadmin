import React from 'react';
import { shallow } from 'enzyme';

import Link from './index';

describe('Link', () => {
    const component = (<Link to="lorem">Lorem</Link>);

    it('should render', () => {
        expect(shallow(component)).toMatchSnapshot();
    });
});
