import React from 'react';
import { shallow } from 'enzyme';

import Pagination from './index';

const mockLocation = {
    pathname: '/lorem',
    search: '',
};

const data = {
    from: 1,
    to: 10,
    last_page: 5,
    current_page: 1,
    total: 54,
};

const nonPaginationData = {
    to: 10,
    last_page: 1,
    current_page: 1,
    total: 54,
};

describe('Pagination', () => {
    const component = shallow(<Pagination data={data} location={mockLocation} />);
    const componentNonPagination = shallow(<Pagination data={nonPaginationData} location={mockLocation} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentNonPagination).toMatchSnapshot();
    });
    it('should not render', () => {
        expect(componentNonPagination.type()).toBeNull();
    });
});
