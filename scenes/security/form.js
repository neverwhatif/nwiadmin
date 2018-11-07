import React, { Fragment } from 'react';

import { get } from 'nwiadmin/services/api';

import FormScene from 'nwiadmin/scenes/form';
import FixedBar from 'nwiadmin/components/fixedbar';
import Modal from 'nwiadmin/components/modal';
import ModalActions from 'nwiadmin/components/modal/modalactions';

import Button from 'nwiadmin/components/button';
import { Fieldset, FormSubmit, Dropdown, PasswordInput } from 'nwiadmin/components/form';
import { renderFields } from 'nwiadmin/components/form/helpers';

const methods = [{
    id: 'yubikey',
    name: 'Yubikey',
}, {
    id: 'google',
    name: 'Google',
}];

const passwordFields = [{
    name: 'password',
    desc: 'Required for changing password & two factor authentication',
    label: 'Password',
    component: PasswordInput,
}, '-', {
    name: 'new_password',
    desc: 'Minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one punctuation mark or symbol.',
    label: 'New Password',
    component: PasswordInput,
}, {
    name: 'new_password_confirmation',
    label: 'Confirm New Password',
    component: PasswordInput,
}];

const twofactorField = [{
    name: 'twofactor_provider',
    label: 'Provider',
    component: Dropdown,
    props: {
        data: methods,
    },
}];

const yubikeyField = [{
    name: 'twofactor_code',
    label: 'Code',
    desc: 'Make sure the field is focused by clicking into it, and then insert the yubikey into a usb socket',
}];

const getGoogleFields = getQrCode => [{
    name: '$qr',
    component: Button,
    props: {
        buttonStyle: 'bordered',
        children: 'Get QR Code',
        onClick: () => getQrCode(),
    },
}, {
    name: 'twofactor_code',
    label: 'Code',
}];

class SecurityFormScene extends FormScene {
    /* eslint-disable class-methods-use-this */
    setInitialState() {
        return {
            isModalOpen: false,
            qrCode: null,
        };
    }

    setLabel() {
        return 'Two factor authentication';
    }

    setMethod() {
        return 'patch';
    }

    setRemote() {
        return 'me';
    }
    /* eslint-enable */

    getQrCode() {
        get('two_factor/google/secret').then((response) => {
            this.setState({
                isModalOpen: true,
                qrCode: response.data.url,
                pendingData: { ...this.state.pendingData, twofactor_secret: response.data.secret },
            });
        });
    }

    render() {
        const { pendingData, isLoading } = this.state;

        return (
            <Fragment>
                <Fieldset legend="Password">
                    {renderFields(passwordFields, this)}
                </Fieldset>

                <Fieldset legend="Two Factor Authentication">
                    {renderFields(twofactorField, this)}
                </Fieldset>

                {pendingData.twofactor_provider === 'yubikey' && (
                    <Fieldset legend="Yubikey">
                        {renderFields(yubikeyField, this)}
                    </Fieldset>
                )}

                {pendingData.twofactor_provider === 'google' && (
                    <Fieldset legend="Google">
                        {renderFields(getGoogleFields(() => this.getQrCode()), this)}
                    </Fieldset>
                )}

                <FixedBar>
                    <FormSubmit onClick={() => this.submit()} isLoading={isLoading}>Apply</FormSubmit>
                </FixedBar>

                <Modal title="Google QR Code" isOpen={this.state.isModalOpen}>
                    <div>
                        <img src={this.state.qrCode} alt="QR Code for Google Authentication" />
                        <ModalActions
                            cancel={() => this.setState({ isModalOpen: false })}
                            cancelText="Close"
                        />
                    </div>
                </Modal>
            </Fragment>
        );
    }
}

export default SecurityFormScene;
