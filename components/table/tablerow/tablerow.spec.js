import React from 'react';
import { shallow } from 'enzyme';

import TableRow from './index';

jest.mock('nwiadmin/components/link', () => 'Link');
jest.mock('nwiadmin/components/reference', () => 'Reference');

const data = {
    $id: 1,
    Title: 'Lorem',
};

const referenceData = {
    $id: 1,
    Title: {
        title: 'Lorem',
        reference: 'IPSUM',
        type: 'reference',
    },
};

const linkData = {
    $id: 1,
    Title: {
        title: 'Lorem',
        path: 'ipsum',
        type: 'link',
    },
};

describe('TableRow', () => {
    const component = shallow(<TableRow data={data} />);
    const componentIsOdd = shallow(<TableRow data={data} isOdd />);
    const componentWithReference = shallow(<TableRow data={referenceData} />);
    const componentWithLink = shallow(<TableRow data={linkData} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
    });
    it('should render cells', () => {
        expect(component.find('td').length).toBe(1); // Don't include $id
        expect(component.find('td').first().text()).toBe('Lorem');
    });
    it('should render isOdd', () => {
        expect(componentIsOdd.hasClass('rootOdd')).toBe(true);
    });
    it('should render cell with reference', () => {
        expect(componentWithReference.find('Reference').length).toBe(1);
        expect(componentWithReference.find('Reference').prop('title')).toBe('Lorem');
        expect(componentWithReference.find('Reference').prop('reference')).toBe('IPSUM');
    });
    it('should render cell with link', () => {
        expect(componentWithLink.find('Link').length).toBe(1);
        expect(componentWithLink.find('Link').prop('to')).toBe('ipsum');
    });
});
