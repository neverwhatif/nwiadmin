import React from 'react';
import { shallow } from 'enzyme';

import ListItem from './index';

jest.mock('nwiadmin/components/button', () => 'Button');
jest.mock('../listitemtitle', () => 'ListItemTitle');
jest.mock('../listitemmeta', () => 'ListItemMeta');

const meta = [
    'Lorem',
];

const cta = [{
    label: 'Lorem',
    action: jest.fn(),
}];

describe('ListItem', () => {
    const component = shallow(<ListItem title="Lorem" />);
    const componentWithSubtitle = shallow(<ListItem title="Lorem" subtitle="Lorem" />);
    const componentWithSecondary = shallow(<ListItem title="Lorem" secondary={{ title: 'Lorem' }} />);
    const componentWithMeta = shallow(<ListItem title="Lorem" meta={meta} />);
    const componentWithCta = shallow(<ListItem title="Lorem" cta={cta} />);

    it('should render', () => {
        expect(component).toMatchSnapshot();
        expect(componentWithSubtitle).toMatchSnapshot();
        expect(componentWithSecondary).toMatchSnapshot();
        expect(componentWithMeta).toMatchSnapshot();
        expect(componentWithCta).toMatchSnapshot();
    });
    it('should render a subtitle', () => {
        expect(component.find('p.subtitle').length).toBe(0);
        expect(componentWithSubtitle.find('p.subtitle').length).toBe(1);
        expect(componentWithSubtitle.find('p.subtitle').text()).toBe('Lorem');
    });
    it('should render a secondary', () => {
        expect(component.find('div.secondary').length).toBe(0);
        expect(componentWithSecondary.find('div.secondary').length).toBe(1);
        expect(componentWithSecondary.find('div.secondary').text()).toBe('Lorem');
    });
    it('should render a meta', () => {
        expect(component.find('ListItemMeta').length).toBe(0);
        expect(componentWithMeta.find('ListItemMeta').length).toBe(1);
        expect(componentWithMeta.find('ListItemMeta').prop('data')).toEqual(meta);
    });
    it('should render a cta', () => {
        expect(component.find('footer.footer').length).toBe(0);
        expect(componentWithCta.find('footer.footer').length).toBe(1);
        expect(componentWithCta.find('Button').length).toBe(1);
    });
    it('should handle cta click', () => {
        const button = componentWithCta.find('Button');
        button.simulate('click');
        expect(cta[0].action).toHaveBeenCalled();
    });
});
