import React from 'react';
import { shallow } from 'enzyme';

import { ConnectedTableComponent } from './index';

jest.mock('nwiadmin/components/connectedlist', () => ({ ConnectedListComponent: 'ConnectedListComponent' }));
jest.mock('nwiadmin/components/table', () => 'Table');

const mockLocation = {
    pathname: '/lorem',
    search: '',
};

describe('ConnectedTable', () => {
    const component = shallow(<ConnectedTableComponent remote="lorem" location={mockLocation} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should use render prop', () => {
        const listComponent = component.find('ConnectedListComponent').first();
        const deepList = listComponent.prop('renderList')({ lorem: 1 });

        expect(deepList.type).toBe('Table');
        expect(deepList.props.lorem).toBe(1);
    });
});
