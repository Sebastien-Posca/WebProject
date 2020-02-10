import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, InputNumber, Upload, Select } from 'antd';
import 'antd/dist/antd.css'

const { Option } = Select
const { TextArea } = Input;

const categories = ['Modulation', 'Distortion', 'Egalisation', 'Reverb', 'Accordeur']

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};



const PluginForm = props => {

    Form.create();
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form

    const handleClick = (event) => {
        event.preventDefault();
        console.log(props)
        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    return (
        <div>
            <Form {...formItemLayout} onSubmit={(e) => handleClick(e)}>
                <Form.Item label="Nom du Plugin">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input the plugin name!' }]
                    })(
                        <Input
                            placeholder="Plugin name"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Version">
                    {getFieldDecorator('version', {
                        rules: [{ required: true, message: 'Please input a version!' }]
                    })(
                        <InputNumber
                            placeholder="Version"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Description">
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: 'Please input a description!' }]
                    })(
                        <TextArea rows={2}
                            placeholder="Description"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Thumbnail">
                    {getFieldDecorator('thumbnail', {
                        rules: [{ required: true, message: 'Please upload a thumbnail for your plugin!' }]
                    })(
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button>
                                <Icon type="upload" /> Click to upload
                        </Button>
                        </Upload>
                    )}
                </Form.Item>
                <Form.Item label="ZipFile">
                    {getFieldDecorator('zipfile', {
                        rules: [{ required: true, message: 'Please upload a Zip file for your plugin!' }]
                    })(
                        <Upload name="logo" action="/upload.do" listType="picture">
                            <Button>
                                <Icon type="upload" /> Click to upload
                        </Button>
                        </Upload>
                    )}
                </Form.Item>
                <Form.Item label="Category">
                    {getFieldDecorator('category', {
                        rules: [{ required: true, message: 'Please select a category!' }]
                    })(
                        <Select defaultValue={categories[0]}>
                            {categories.map((item) => {
                                return <Option value={item}>{item}</Option>
                            })
                            }
                        </Select>
                    )}
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" className="login-form-button" > Envoyer le plugin </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const WrappedPluginForm = Form.create()(PluginForm);
PluginForm.propTypes = {

};

export default WrappedPluginForm;