import React, { Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { addPrefixToClassNames } from 'nwiadmin/utility';

import Button from 'nwiadmin/components/button';
import ListItemTitle from '../listitemtitle';
import ListItemMeta from '../listitemmeta';
import Styled from 'nwiadmin/components/styled';

import styles from './styles.scss';

const renderActions = (props) => {
    const actions = typeof props.$actions === 'function' ? props.$actions(props) : props.$actions;

    if (!Array.isArray(actions)) {
        return null;
    }

    const filteredActions = actions.filter((item) => item !== null);

    if (!filteredActions.length) {
        return null;
    }

    return (
        <footer className={styles.footer}>
            {filteredActions.map((item) => renderAction(item, props, props.$functions))}
        </footer>
    );
};

const renderAction = (item, row, functions) => {
    const label = typeof item.label === 'function' ? item.label(row) : item.label;
    const isDisabled =
        typeof item.isDisabled === 'function' ? item.isDisabled(row) : item.isDisabled;

    return (
        <Button
            key={label}
            onClick={() => item.action({ row, ...functions })}
            isDisabled={isDisabled}
            buttonStyle="empty"
        >
            {label}
        </Button>
    );
};

const isMetaNotEmpty = (meta) => Boolean((meta || []).filter((item) => item !== null).length);

const shouldRenderMeta = (props) => {
    if (props.meta && isMetaNotEmpty(props.meta)) {
        return true;
    }

    if (props.secondary && props.secondary.meta && isMetaNotEmpty(props.meta)) {
        return true;
    }

    return false;
};

const ListItem = (props) => {
    const rootClass = classNames(addPrefixToClassNames(styles, 'root', props.$rootClassName));
    const basicTitleClass = addPrefixToClassNames(styles, 'title', props.$titleClassName);
    const titleClass = classNames(basicTitleClass, props.onClick ? styles.titleLink : null);

    //const actions = typeof props.$actions === 'function' ? props.$actions(props) : props.$actions;

    const actions = renderActions(props);

    return (
        <article className={rootClass}>
            <div className={styles.content}>
                <div className={styles.primary}>
                    <ListItemTitle
                        {...props}
                        className={titleClass}
                        shouldInitPreload={props.shouldInitPreload}
                    />
                    {props.subtitle && (
                        <p className={styles.subtitle}>
                            <Styled data={props.subtitle} />
                        </p>
                    )}
                </div>

                {props.secondary && props.secondary.title && (
                    <div className={styles.secondary}>
                        <p className={classNames(basicTitleClass)}>
                            <Styled data={props.secondary.title} />
                        </p>
                        {props.secondary.subtitle && (
                            <p className={styles.subtitle}>
                                <Styled data={props.secondary.subtitle} />
                            </p>
                        )}
                    </div>
                )}
            </div>

            {Boolean(props.description) && (
                <div className={styles.description}>{props.description}</div>
            )}

            {shouldRenderMeta(props) && (
                <div className={styles.meta}>
                    <ListItemMeta data={props.meta} />
                    {props.secondary && props.secondary.meta && (
                        <ListItemMeta data={props.secondary.meta} />
                    )}
                </div>
            )}

            {actions}

            {props.$panels && props.$panels[props.$activePanel] ? (
                <Fragment>
                    <hr />
                    {props.$panels[props.$activePanel](props)}
                </Fragment>
            ) : null}
        </article>
    );
};

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
    cta: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            action: PropTypes.func.isRequired,
        })
    ),
    secondary: PropTypes.shape({
        title: PropTypes.string,
        meta: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})])),
    }),
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    shouldInitPreload: PropTypes.bool,
    $rootClassName: PropTypes.string,
    $titleClassName: PropTypes.string,
    onClick: PropTypes.func,
};

ListItem.defaultProps = {
    subtitle: null,
    meta: null,
    cta: null,
    secondary: null,
    to: null,
    shouldInitPreload: false,
    $rootClassName: '',
    $titleClassName: '',
    onClick: null,
};

export default ListItem;
