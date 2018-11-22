import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { addPrefixToClassNames } from 'nwiadmin/utility';

import Button from 'nwiadmin/components/button';
import ListItemTitle from '../listitemtitle';
import ListItemMeta from '../listitemmeta';

import styles from './styles.scss';

const ListItem = (props) => {
    const rootClass = classNames(addPrefixToClassNames(styles, 'root', props.$rootClassName));
    const basicTitleClass = addPrefixToClassNames(styles, 'title', props.$titleClassName);
    const titleClass = classNames(basicTitleClass, props.onClick ? styles.titleLink : null);

    const actions = typeof props.$actions === 'function' ? props.$actions(props) : props.$actions;

    return (
        <article className={rootClass}>
            <div className={styles.content}>
                <div className={styles.primary}>
                    <ListItemTitle {...props} className={titleClass} shouldInitPreload={props.shouldInitPreload} />
                    {props.subtitle && (<p className={styles.subtitle}>{props.subtitle}</p>)}
                </div>

                {props.secondary && props.secondary.title && (
                    <div className={styles.secondary}>
                        <p className={classNames(basicTitleClass)}>
                            {props.secondary.title}
                        </p>
                        {props.secondary.subtitle && (<p className={styles.subtitle}>{props.secondary.subtitle}</p>)}
                    </div>
                )}
            </div>

            {props.meta && (
                <div className={styles.meta}>
                    <ListItemMeta data={props.meta} />
                    {props.secondary && props.secondary.meta && (
                        <ListItemMeta data={props.secondary.meta} />
                    )}
                </div>
            )}

            {actions && (
                <footer className={styles.footer}>
                    {actions.filter(item => item !== null).map(item => (
                        <Button
                            buttonStyle="empty"
                            key={item.label}
                            onClick={() => item.action({ row: props, ...props.$functions })}
                            isDisabled={typeof item.isDisabled === 'function'
                                ? item.isDisabled(props)
                                : item.isDisabled
                            }
                        >
                            {item.label}
                        </Button>
                    ))}
                </footer>
            )}
        </article>
    );
};

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({}),
    ])),
    cta: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired,
    })),
    secondary: PropTypes.shape({
        title: PropTypes.string,
        meta: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({}),
        ])),
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
