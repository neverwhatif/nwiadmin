import React from 'react';
import { shallow } from 'enzyme';

import Table from './index';

jest.mock('./tablehead', () => 'TableHead');
jest.mock('./tablerow', () => 'TableRow');

const data = [{
    $id: 1,
    Title: 'Lorem',
}, {
    $id: 2,
    Title: 'Ipsum',
}];

const mockTransformer = item => ({
    $id: item.$id * 2,
});

describe('Table', () => {
    const component = shallow(<Table data={data} />);
    const componentIsDisabled = shallow(<Table data={data} isDisabled />);
    const componentWithNoData = shallow(<Table data={[]} />);
    const componentWithTransformer = shallow(<Table data={data} transformer={mockTransformer} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render head', () => {
        expect(component.find('TableHead').length).toBe(1);
    });
    it('should render rows', () => {
        expect(component.find('TableRow').length).toBe(2);
    });
    it('should render disabled', () => {
        expect(componentIsDisabled.hasClass('rootDisabled')).toBe(true);
    });
    it('should render nothing if no data', () => {
        expect(componentWithNoData.type()).toBeNull();
    });
    it('should have a default transformer', () => {
        expect(Table.defaultProps.transformer('lorem')).toBe('lorem');
    });
    it('should have a transformer', () => {
        expect(componentWithTransformer.find('TableRow').first().key()).toBe('2');
    });
});
