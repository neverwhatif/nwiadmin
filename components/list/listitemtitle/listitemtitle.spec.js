import React from 'react';
import { shallow } from 'enzyme';

import store from 'nwiadmin/utility/store';
import ListItemTitle from './index';

jest.mock('nwiadmin/components/link', () => 'Link');
jest.mock('nwiadmin/components/reference', () => 'Reference');

describe('ListItemTitle', () => {
    const component = shallow(<ListItemTitle className="lorem" title="Lorem" />);
    const componentLink = shallow(<ListItemTitle className="lorem" title="Lorem" to="ipsum" />);
    const componentRef = shallow(<ListItemTitle className="lorem" title="Lorem" reference="ipsum" />);
    const componentLinkRef = shallow(<ListItemTitle className="lorem" title="Lorem" to="ipsum" reference="ipsum" />);
    const componentPreload = shallow(<ListItemTitle className="lorem" title="Lorem" to="ipsum" shouldInitPreload />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentLink).toMatchSnapshot();
        expect(componentRef).toMatchSnapshot();
        expect(componentLinkRef).toMatchSnapshot();
        expect(componentPreload).toMatchSnapshot();
    });
    it('should render class', () => {
        expect(component.hasClass('lorem')).toBe(true);
    });
    it('should render link', () => {
        expect(component.find('Link').length).toBe(0);
        expect(componentLink.find('Link').length).toBe(1);
        expect(componentLink.find('Link').prop('to')).toBe('ipsum');
    });
    it('should render reference', () => {
        expect(component.find('Reference').length).toBe(0);
        expect(componentRef.find('Reference').length).toBe(1);
        expect(componentRef.find('Reference').prop('title')).toBe('Lorem');
        expect(componentRef.find('Reference').prop('reference')).toBe('ipsum');
        expect(componentRef.find('Reference').prop('isLinked')).toBe(true);
    });
    it('should render link reference', () => {
        expect(componentLinkRef.find('Link').length).toBe(1);
        expect(componentLinkRef.find('Reference').length).toBe(1);
        expect(componentLinkRef.find('Reference').prop('isLinked')).toBe(false);
    });
    it('should preload', () => {
        const spy = jest.spyOn(store, 'setItem');

        componentPreload.find('Link').simulate('click');
        expect(spy).toHaveBeenCalled();
    });
});
