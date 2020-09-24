import React from 'react';
import PropTypes from 'prop-types';
import store from 'nwiadmin/utility/store';

import Link from 'nwiadmin/components/link';
import Reference from 'nwiadmin/components/reference';

import { stringifyRemote, onAccessibleKeyDown } from 'nwiadmin/utility';

const renderTitleOrReference = (reference, title, isLinked = true) => {
    if (reference) {
        return <Reference reference={reference} title={title} isLinked={isLinked} />;
    }
    return title;
};

const initPreload = (title) => {
    store.setItem('preload', title);
};

const renderLinkOrAnchor = (to, props) => {
    if (to.match(/^http/)) {
        return <a href={to}>{renderTitleOrReference(props.reference, props.title, false)}</a>;
    }

    const handleClick = () => {
        if (!props.shouldInitPreload) {
            return;
        }

        initPreload(props.shouldInitPreload === true ? props.title : props.shouldInitPreload);
    };

    return (
        <Link to={to} onClick={handleClick}>
            {renderTitleOrReference(props.reference, props.title, false)}
        </Link>
    );
};

const ListItemTitle = (props) => {
    const to = stringifyRemote(props.to);

    return (
        <h1
            role="button"
            className={props.className}
            onClick={() => props.onClick && props.onClick()}
            onKeyDown={(e) => onAccessibleKeyDown(e, () => props.onClick && props.onClick())}
        >
            {props.to
                ? renderLinkOrAnchor(to, props)
                : renderTitleOrReference(props.reference, props.title)}
        </h1>
    );
};

ListItemTitle.propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    reference: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    shouldInitPreload: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onClick: PropTypes.func,
};

ListItemTitle.defaultProps = {
    to: null,
    reference: null,
    shouldInitPreload: false,
    onClick: null,
};

export default ListItemTitle;
