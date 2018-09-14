import React from 'react';
import { shallow } from 'enzyme';

import List from './index';

jest.mock('./listitem', () => 'ListItem');

const data = [{
    id: 1,
    title: 'Lorem',
    description: 'lorem',
}, {
    id: 2,
    title: 'Ipsum',
    description: 'ipsum',
}];

const mockTransformer = item => ({
    id: item.id * 2,
});

describe('List', () => {
    const component = shallow(<List data={data} />);
    const componentIsDisabled = shallow(<List data={data} isDisabled />);
    const componentWithNoData = shallow(<List data={[]} />);
    const componentWithTransformer = shallow(<List data={data} transformer={mockTransformer} />);
    const componentWithPreload = shallow(<List data={data} shouldInitPreload />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentIsDisabled).toMatchSnapshot();
        expect(componentWithNoData).toMatchSnapshot();
        expect(componentWithTransformer).toMatchSnapshot();
        expect(componentWithPreload).toMatchSnapshot();
    });
    it('should render list items', () => {
        expect(component.find('ListItem').length).toBe(2);
    });
    it('should render disabled', () => {
        expect(componentIsDisabled.hasClass('rootDisabled')).toBe(true);
    });
    it('should render nothing if no data', () => {
        expect(componentWithNoData.type()).toBeNull();
    });
    it('should have a default transformer', () => {
        expect(List.defaultProps.transformer('lorem')).toBe('lorem');
    });
    it('should have a transformer', () => {
        expect(componentWithTransformer.find('li').first().key()).toBe('2');
    });
    it('should pass shouldInitPreload', () => {
        expect(component.find('ListItem').first().prop('shouldInitPreload')).toBe(false);
        expect(componentWithPreload.find('ListItem').first().prop('shouldInitPreload')).toBe(true);
    });
});
