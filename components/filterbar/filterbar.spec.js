import React from 'react';
import { shallow } from 'enzyme';

import FilterBar from './index';

jest.mock('nwiadmin/components/button', () => 'Button');
jest.mock('nwiadmin/components/modalform', () => 'ModalForm');
jest.mock('nwiadmin/components/form', () => ({ Dropdown: 'Dropdown', TextInput: 'TextInput' }));
jest.mock('./filterbarcta', () => 'FilterBarCta');

const mockLocation = {
    pathname: '/lorem',
    search: '',
};

const mockHistory = {
    push: () => jest.fn(),
};

describe('FilterBar', () => {
    const component = shallow(<FilterBar location={mockLocation} history={mockHistory} filters={() => <div />} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
});
