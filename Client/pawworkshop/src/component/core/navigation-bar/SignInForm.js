import React, { useState } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { BACKEND_ROOT_PATH } from "../../../constants";
import reqwest from 'reqwest';
import { useDispatch } from 'react-redux';
import logUser from '../../../store/actions/logUser';
import setUserToken from '../../../store/actions/setUserToken';

const SignInForm = props => {

    const { getFieldDecorator } = props.form;
    const [loading, setLoading] = useState(false);
    const dispatcher = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        let credentials;
        props.form.validateFields((err, values) => {
            if (!err) {
                setLoading(true);
                formData.append('name', values.username)
                formData.append("pwd", values.password)
                credentials = { name: values.username, pwd: values.password };

            }
        });

        reqwest({
            url: `${BACKEND_ROOT_PATH}/user/login`,
            method: 'post',
            type: 'json',
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            success: (response) => {
                console.log(response);
                message.success('Commentaire envoyé');
                setLoading(false);
                dispatcher(logUser(response.user))
                dispatcher(setUserToken(response.token));
                // TODO : store user
            },
            error: (user) => {
                console.log(user);
                message.error('Problème avec le commentaire');
                setLoading(false);
            },
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