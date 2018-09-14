import PropTypes from 'prop-types';

export const withOptionalLocation = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string,
    }),
};

export const withLocation = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string.isRequired,
    }).isRequired,
};

export const withOptionalHistory = {
    history: PropTypes.shape({
        push: PropTypes.func,
    }),
};

export const withHistory = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
};

export const withPath = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string,
        }),
        url: PropTypes.string.isRequired,
    }).isRequired,
    basePath: PropTypes.string.isRequired,
};

export const withConnected = {
    remote: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    transformer: PropTypes.func,
};

export const withFilters = {
    setFilter: PropTypes.func.isRequired,
    filter: PropTypes.shape({}).isRequired,
};

export const defaultWithOptionalHistory = {
    history: {},
};

export const defaultWithOptionalLocation = {
    location: {},
};

export const defaultWithConnected = {
    transformer: item => item,
};
