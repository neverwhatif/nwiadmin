import { getPagination, getPaginationSummary } from './pagination';

const locationWithoutSearch = {
    pathname: '/lorem/ipsum',
    search: '',
};

const locationWithSearch = {
    pathname: '/lorem/ipsum',
    search: '?filters[lorem]=ipsum&page=2',
};

const datas = [{
    current_page: 1,
    last_page: 5,
}, {
    current_page: 1,
    last_page: 1,
}, {
    current_page: 5,
    last_page: 20,
}, {
    current_page: 2,
    last_page: 2,
}, {
    current_page: 2,
    last_page: 2,
}];

const expecteds = [
    [{
        type: 'link',
        label: 1,
        isCurrent: true,
        to: '/lorem/ipsum?page=1',
    }, {
        type: 'link',
        label: 2,
        isCurrent: false,
        to: '/lorem/ipsum?page=2',
    }, {
        type: 'ellipsis',
    }, {
        type: 'link',
        label: 5,
        isCurrent: false,
        to: '/lorem/ipsum?page=5',
    }],
    [],
    [{
        type: 'link',
        label: 1,
        isCurrent: false,
        to: '/lorem/ipsum?page=1',
    }, {
        type: 'ellipsis',
    }, {
        type: 'link',
        label: 4,
        isCurrent: false,
        to: '/lorem/ipsum?page=4',
    }, {
        type: 'link',
        label: 5,
        isCurrent: true,
        to: '/lorem/ipsum?page=5',
    }, {
        type: 'link',
        label: 6,
        isCurrent: false,
        to: '/lorem/ipsum?page=6',
    }, {
        type: 'ellipsis',
    }, {
        type: 'link',
        label: 20,
        isCurrent: false,
        to: '/lorem/ipsum?page=20',
    }],
    [{
        type: 'link',
        label: 1,
        isCurrent: false,
        to: '/lorem/ipsum?page=1',
    }, {
        type: 'link',
        label: 2,
        isCurrent: true,
        to: '/lorem/ipsum?page=2',
    }],
    [{
        type: 'link',
        label: 1,
        isCurrent: false,
        to: '/lorem/ipsum?filters%5Blorem%5D=ipsum&page=1',
    }, {
        type: 'link',
        label: 2,
        isCurrent: true,
        to: '/lorem/ipsum?filters%5Blorem%5D=ipsum&page=2',
    }],
];

describe('Pagination Service', () => {
    describe('getPagination', () => {
        it('should get basic pagination', () => {
            expect(getPagination(datas[0], locationWithoutSearch)).toEqual(expecteds[0]);
        });
        it('should return nothing if unrequired', () => {
            expect(getPagination(datas[1], locationWithoutSearch)).toEqual(expecteds[1]);
        });
        it('should get large number of pages', () => {
            expect(getPagination(datas[2], locationWithoutSearch)).toEqual(expecteds[2]);
        });
        it('should get small number of pages', () => {
            expect(getPagination(datas[3], locationWithoutSearch)).toEqual(expecteds[3]);
        });
        it('should handle filters', () => {
            expect(getPagination(datas[4], locationWithSearch)).toEqual(expecteds[4]);
        });
    });
    describe('getPaginationSummary', () => {
        it('should get a summary', () => {
            expect(getPaginationSummary({
                from: 1,
                to: 2,
                total: 3,
                lorem: 4,
            })).toEqual({
                from: 1,
                to: 2,
                total: 3,
            });
        });
    });
});
