import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withLocation } from 'nwiadmin/utility/proptypes';

import { parseSearch, onAccessibleKeyDown } from 'nwiadmin/utility';
import meable from 'nwiadmin/services/me/meable';
import config from 'app/config';

import { post } from 'nwiadmin/services/api';
import { getToken, login } from 'nwiadmin/services/auth';

import { FormField, TextInput, PasswordInput, FormSubmit } from 'nwiadmin/components/form';
import Logo from 'app/components/logo';

import styles from './styles.scss';

const parseErrors = data => (data ? Object.values(data).map(item => item[0]) : []);

export class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
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
            errors: [],
            isLoading: true,
        });

        post((config.app.authEndpoint || 'login'), {}, this.state.data)
            .then((response) => {
                const search = parseSearch(this.props.location.search);
                login(response.data.token, search.redirect);
            })
            .catch((error) => {
                this.setState({
                    errors: parseErrors(error.response.data.errors),
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

                    {Boolean(this.state.errors.length) && (
                        <div className={styles.error}>
                            {this.state.errors.map(item => <span key={item}>{item}<br /></span>)}
                        </div>
                    )}

                    <FormField
                        name={config.app.authUsernameField || 'username'}
                        label={config.app.authUsernameLabel || 'Username'}>
                        <TextInput
                            value={this.state.data[config.app.authUsernameField || 'username']}
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

                    {config.app.authTwoFactor && (
                        <Fragment>
                            <hr />
                            <FormField
                                name="twofactor_code"
                                label="Google/Yubikey Code"
                                desc="If you are logging in from outside the office"
                            >
                                <TextInput
                                    value={this.state.data.twofactor_code}
                                    onChange={e => this.setInput(e)}
                                    onKeyDown={e => onAccessibleKeyDown(e, () => this.handleSubmit())}
                                />
                            </FormField>
                        </Fragment>
                    )}

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
