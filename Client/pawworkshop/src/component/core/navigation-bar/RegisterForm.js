import React, { useState } from 'react';
import { Form, Icon, Input, Button, } from 'antd';

const RegisterForm = props => {

    const { getFieldDecorator } = props.form;
    let loading = props.loading;

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        let credentials;
        props.form.validateFields((err, values) => {
            if (!err) {
                loading = true;
                formData.append('name', values.username)
                formData.append("password", values.password)
                credentials = { name: values.username, password: values.password };

            }
        });
        props.handleRegister(credentials);
    };


    return (
        <div>
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Entrez votre identifiant !' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Nom de compte"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Entrez votre mot de passe !' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Mot de passe"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
                        Créer son compte
          </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const WrappedRegisterForm = Form.create()(RegisterForm);

export default WrappedRegisterForm;