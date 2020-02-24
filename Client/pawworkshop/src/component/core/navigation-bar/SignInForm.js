import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const SignInForm = props => {

    const { getFieldDecorator } = props.form;
    const [loading, setLoading] = useState(false);


    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
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