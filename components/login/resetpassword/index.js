import React, { useState } from 'react';
import { withRouter } from 'react-router';

import { useFormData } from 'nwiadmin/utility/hooks';

import { post } from 'nwiadmin/services/api';

import { FormField, TextInput, PasswordInput, FormSubmit } from 'nwiadmin/components/form';
import Logo from 'app/components/logo';

import styles from '../styles.scss';

const ResetPasswordComponent = ({ match }) => {
    const [formData, setFormData] = useFormData({
        token: match.params.token,
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await post('password/reset', {}, formData);
            window.location = '/';
        } catch (err) {
            setError(Object.values(err.response.data.errors)[0][0]);
            setLoading(false);
        }
    };

    return (
        <div className={styles.root}>
            <form className={styles.form}>
                <Logo className={styles.logo} />

                <em class={styles.rules}>
                    Minimum of eight characters, at least one uppercase letter, one lowercase
                    letter, one number and one punctuation mark or symbol.
                    <br />
                    <br />
                </em>

                {error && (
                    <div className={styles.error}>
                        <strong>Could not reset password.</strong>
                        <br />
                        {error}
                    </div>
                )}

                <FormField name="email" label="Email">
                    <TextInput
                        value={formData.email}
                        onChange={(event) => setFormData('email', event.target.value)}
                    />
                </FormField>
                <FormField name="password" label="Password">
                    <PasswordInput
                        value={formData.password}
                        onChange={(event) => setFormData('password', event.target.value)}
                    />
                </FormField>
                <FormField name="password_confirmation" label="Confirm Password">
                    <PasswordInput
                        value={formData.password_confirmation}
                        onChange={(event) =>
                            setFormData('password_confirmation', event.target.value)
                        }
                    />
                </FormField>

                <div className={styles.actions}>
                    <FormSubmit buttonStyle="block" isLoading={isLoading} onClick={handleSubmit}>
                        Reset Password
                    </FormSubmit>
                </div>
            </form>
        </div>
    );
};

export default withRouter(ResetPasswordComponent);
