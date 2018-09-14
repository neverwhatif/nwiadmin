import React from 'react';
import { shallow } from 'enzyme';

import { mockReset } from 'nwiadmin/services/api';
import { ConnectedListComponent } from './index';

jest.mock('nwiadmin/components/emptylist', () => 'EmptyList');
jest.mock('nwiadmin/components/filterbar', () => 'FilterBar');
jest.mock('nwiadmin/components/list', () => 'List');
jest.mock('nwiadmin/components/loading', () => 'Loading');
jest.mock('nwiadmin/components/pagination', () => 'Pagination');
jest.mock('nwiadmin/components/errormessage', () => 'ErrorMessage');
jest.mock('nwiadmin/components/errorboundary', () => 'ErrorBoundary');

jest.mock('nwiadmin/services/api');
jest.mock('nwiadmin/utility');

const mockLocation = {
    pathname: '/lorem',
    search: '',
};

const mockFilters = () => (<div />);

const unLoadingWithDataState = {
    isDataLoading: false,
    data: [{ id: 1, name: 'Lorem' }],
    meta: [{ total: 1 }],
};

const unLoadingState = {
    isDataLoading: false,
};

const errorState = {
    hasDataError: true,
};

describe('ConnectedListComponent', () => {
    beforeEach(() => {
        mockReset();
    });

    const component = shallow(<ConnectedListComponent remote="lorem" location={mockLocation} />);
    const componentWithFilters =
        shallow(<ConnectedListComponent remote="lorem" location={mockLocation} filters={mockFilters} />);
    const componentWithPagination = shallow(<ConnectedListComponent remote="lorem" location={mockLocation} />);
    const componentLoading = shallow(<ConnectedListComponent remote="lorem" location={mockLocation} />);
    const componentEmpty = shallow(<ConnectedListComponent remote="lorem" location={mockLocation} />);
    const componentWithError = shallow(<ConnectedListComponent remote="lorem" location={mockLocation} />);

    componentWithFilters.setState(unLoadingWithDataState);
    componentWithPagination.setState(unLoadingWithDataState);
    componentEmpty.setState(unLoadingState);
    componentWithError.setState(errorState);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentWithFilters).toMatchSnapshot();
        expect(componentWithPagination).toMatchSnapshot();
        expect(componentLoading).toMatchSnapshot();
        expect(componentEmpty).toMatchSnapshot();
        expect(componentWithError).toMatchSnapshot();
    });
    it('should recieveprops', () => {
        jest.spyOn(ConnectedListComponent.prototype, 'getData');

        const newProps = { location: { pathname: '/lorem', search: 'lorem' } };

        component.setProps(newProps);
        expect(ConnectedListComponent.prototype.getData).toHaveBeenCalledTimes(1);

        // Attempt it again, and getData should not be called again (so will remain being called 1 time)
        component.setProps(newProps);
        expect(ConnectedListComponent.prototype.getData).toHaveBeenCalledTimes(1);
    });
    it('should render filters', () => {
        expect(componentWithFilters.find('FilterBar').length).toBe(1);
    });
    it('should render pagination', () => {
        expect(componentWithPagination.find('Pagination').length).toBe(1);
    });
    it('should render a loading icon', () => {
        expect(componentLoading.find('Loading').length).toBe(1);
    });
    it('should render an empty list', () => {
        expect(componentEmpty.find('EmptyList').length).toBe(1);
    });
    it('should render an errormessage', () => {
        expect(componentWithError.find('ErrorMessage').length).toBe(1);
    });
});
