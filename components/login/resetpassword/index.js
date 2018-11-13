import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { post } from 'nwiadmin/services/api';

import { FormField, TextInput, PasswordInput, FormSubmit } from 'nwiadmin/components/form';
import Logo from 'app/components/logo';

import styles from '../styles.scss';

export class ResetPasswordComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false,
            data: {
                token: props.match.params.token,
                email: '',
                password: '',
                password_confirmation: '',
            },
        };
    }
    setInput(e) {
        const { target: { name, value } } = e;
        this.setState({ data: { ...this.state.data, [name]: value } });
    }
    handleSubmit() {
        this.setState({
            error: null,
            isLoading: true,
        });

        //

        post('password/reset', {}, this.state.data)
            .then(() => {
                window.location = '/';
            })
            .catch((error) => {
                this.setState({
                    error: Object.values(error.response.data.errors)[0][0],
                    isLoading: false,
                });
            });
    }
    render() {
        return (
            <div className={styles.root}>
                <form className={styles.form}>
                    <Logo className={styles.logo} />

                    <em>Minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one punctuation mark or symbol.<br /><br /></em>

                    { this.state.error && (
                        <div className={styles.error}>
                            <strong>Could not reset password.</strong><br />
                            {this.state.error}
                        </div>
                    )}

                    <FormField name="email" label="Email">
                        <TextInput
                            value={this.state.data.email}
                            onChange={e => this.setInput(e)}
                        />
                    </FormField>
                    <FormField name="password" label="Password">
                        <PasswordInput
                            value={this.state.data.password}
                            onChange={e => this.setInput(e)}
                        />
                    </FormField>
                    <FormField name="password_confirmation" label="Confirm Password">
                        <PasswordInput
                            value={this.state.data.password_confirmation}
                            onChange={e => this.setInput(e)}
                        />
                    </FormField>

                    <div className={styles.actions}>
                        <FormSubmit
                            buttonStyle="block"
                            isLoading={this.state.isLoading}
                            onClick={() => this.handleSubmit()}
                        >
                            Reset Password
                        </FormSubmit>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(ResetPasswordComponent);
