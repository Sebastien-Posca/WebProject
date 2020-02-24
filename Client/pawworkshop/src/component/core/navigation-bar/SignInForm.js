import React, { useState } from 'react';
import { Form, Icon, Input, Button, } from 'antd';

const SignInForm = props => {

    const { getFieldDecorator } = props.form;
    let loading = props.loading;

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        let credentials;
        props.form.validateFields((err, values) => {
            if (!err) {
                loading = false;
                formData.append('name', values.username)
                formData.append("pwd", values.password)
                credentials = { name: values.username, pwd: values.password };

            }
        });
        props.handleRequest(credentials);
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
                        Se connecter
          </Button>
                    Ou <a href="">créer un compte !</a>
                </Form.Item>
            </Form>
        </div>
    );
};

const WrappedSignInForm = Form.create()(SignInForm);

export default WrappedSignInForm;