import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withLocation } from 'nwiadmin/utility/proptypes';

import { onAccessibleKeyDown } from 'nwiadmin/utility';
import meable from 'nwiadmin/services/me/meable';

import { post } from 'nwiadmin/services/api';
import { getToken, login } from 'nwiadmin/services/auth';

import { FormField, TextInput, PasswordInput, FormSubmit } from 'nwiadmin/components/form';
import Logo from 'app/components/logo';

import styles from './styles.scss';

export class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isError: false,
            isLoading: false,
            data: {
                email: '',
                password: '',
            },
        };
    }
    setInput(e) {
        const { target: { name, value } } = e;
        this.setState({ data: { ...this.state.data, [name]: value } });
    }
    handleSubmit() {
        this.setState({
            isError: false,
            isLoading: true,
        });

        post('tokens', {}, this.state.data)
            .then((response) => {
                const { state } = this.props.location;
                login(response.data.token, state ? state.redirect : '/');
            })
            .catch(() => {
                this.setState({
                    isError: true,
                    isLoading: false,
                });
            });
    }
    render() {
        if (getToken()) {
            return (<p>You are already logged in</p>);
        }

        return (
            <div className={styles.root}>
                <form className={styles.form}>
                    <Logo className={styles.logo} />

                    { this.state.isError && (
                        <div className={styles.error}>
                            <strong>Could not log in.</strong><br />
                            Please make sure your details are correct.
                        </div>
                    )}

                    <FormField name="email" label="Email">
                        <TextInput
                            value={this.state.data.email}
                            onChange={e => this.setInput(e)}
                            onKeyDown={e => onAccessibleKeyDown(e, () => this.handleSubmit())}
                        />
                    </FormField>
                    <FormField name="password" label="Password">
                        <PasswordInput
                            value={this.state.data.password}
                            onChange={e => this.setInput(e)}
                            onKeyDown={e => onAccessibleKeyDown(e, () => this.handleSubmit())}
                        />
                    </FormField>
                    <hr />

                    <FormField name="twofactor_code" label="Google/Yubikey Code" desc="If you are logging in from outside the office">
                        <TextInput
                            value={this.state.data.twofactor_code}
                            onChange={e => this.setInput(e)}
                            onKeyDown={e => onAccessibleKeyDown(e, () => this.handleSubmit())}
                        />
                    </FormField>

                    <div className={styles.actions}>
                        <FormSubmit
                            buttonStyle="block"
                            isLoading={this.state.isLoading}
                            onClick={() => this.handleSubmit()}
                        >
                            Log In
                        </FormSubmit>
                    </div>
                </form>
            </div>
        );
    }
}

LoginComponent.propTypes = {
    ...withLocation,
    me: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }),
};

LoginComponent.defaultProps = {
    me: null,
};

export default withRouter(meable(LoginComponent));
