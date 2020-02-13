import React, {Component} from 'react';
import {Button, Form, Icon, Input} from 'antd';

class BasicPluginForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        // noinspection JSUnusedLocalSymbols
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>

                    <Input
                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                        placeholder="Username"
                    />,

                </Form.Item>
                <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const WrappedBasicPluginForm = Form.create({name: 'horizontal_layout'})(BasicPluginForm);

export default WrappedBasicPluginForm;
