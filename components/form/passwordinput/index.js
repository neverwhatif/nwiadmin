import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextInput from '../textinput';

import styles from './styles.scss';

class PasswordInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            visible: false,
        };
    }

    onChange(e) {
        this.setState({ value: e.target.value });
        this.props.onChange(e);
    }

    toggleVisibility() {
        this.setState({
            visible: !this.state.visible,
        });
    }

    render() {
        const { onChange, ...otherProps } = this.props;

        return (
            <div className={styles.root}>
                <TextInput
                    {...otherProps}
                    onChange={e => this.onChange(e)}
                    type={this.state.visible ? 'text' : 'password'}
                    autoComplete="off"
                />
                <button
                    className={styles.control}
                    type="button"
                    onClick={() => this.toggleVisibility()}
                    style={{ display: this.state.value ? 'block' : 'none' }}
                >
                    { this.state.visible ? 'Hide password' : 'Show password' }
                </button>
            </div>
        );
    }
}

PasswordInput.propTypes = {
    onChange: PropTypes.func,
};

PasswordInput.defaultProps = {
    onChange: () => null,
};

export default PasswordInput;
