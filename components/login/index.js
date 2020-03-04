import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withLocation } from 'nwiadmin/utility/proptypes';

import config from 'app/config';

import { parseSearch, onAccessibleKeyDown } from 'nwiadmin/utility';
import { useFormData } from 'nwiadmin/utility/hooks';

import { post } from 'nwiadmin/services/api';
import { getToken, login } from 'nwiadmin/services/auth';

import { FormField, TextInput, PasswordInput, FormSubmit } from 'nwiadmin/components/form';
import Logo from 'app/components/logo';

import styles from './styles.scss';

const parseErrors = (data) => (data ? Object.values(data).map((item) => item[0]) : []);

const LoginComponent = ({ location }) => {
    const [formData, setFormData] = useFormData({ email: '', password: '', twofactor_code: '' });

    const [errors, setErrors] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setErrors([]);
        setLoading(true);

        try {
            const response = await post(config.app.authEndpoint || 'login', {}, formData);

            const search = parseSearch(location.search);
            login(response.data.token, search.redirect);
        } catch (err) {
            setErrors(parseErrors(err.response.data.errors));
            setLoading(false);
        }
    };

    if (!isLoading && getToken()) {
        return <p>You are already logged in</p>;
    }

    return (
        <div className={styles.root}>
            <form className={styles.form}>
                <Logo className={styles.logo} />

                {Boolean(errors.length) && (
                    <div className={styles.error}>
                        {errors.map((item) => (
                            <span key={item}>
                                {item}
                                <br />
                            </span>
                        ))}
                    </div>
                )}

                <FormField
                    name={config.app.authUsernameField || 'username'}
                    label={config.app.authUsernameLabel || 'Username'}
                >
                    <TextInput
                        lpIgnore={false}
                        value={formData[config.app.authUsernameField || 'username']}
                        onChange={(event) =>
                            setFormData(
                                config.app.authUsernameField || 'username',
                                event.target.value
                            )
                        }
                        onKeyDown={(event) => onAccessibleKeyDown(event, () => this.handleSubmit())}
                    />
                </FormField>
                <FormField name="password" label="Password">
                    <PasswordInput
                        lpIgnore={false}
                        value={formData.password}
                        onChange={(event) => setFormData('password', event.target.value)}
                        onKeyDown={(event) => onAccessibleKeyDown(event, () => this.handleSubmit())}
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
                                value={formData.twofactor_code}
                                onChange={(event) =>
                                    setFormData('twofactor_code', event.target.value)
                                }
                                onKeyDown={(event) =>
                                    onAccessibleKeyDown(event, () => this.handleSubmit())
                                }
                            />
                        </FormField>
                    </Fragment>
                )}

                <div className={styles.actions}>
                    <FormSubmit buttonStyle="block" isLoading={isLoading} onClick={handleSubmit}>
                        Log In
                    </FormSubmit>
                </div>
            </form>
        </div>
    );
};

LoginComponent.propTypes = {
    ...withLocation,
};

export default withRouter(LoginComponent);
