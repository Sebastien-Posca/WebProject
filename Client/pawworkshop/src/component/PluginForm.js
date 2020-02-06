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
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Nom du plugin"
                    />
                </Form.Item>
                <Form.Item label="Version">
                    <InputNumber
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Version"
                    />
                </Form.Item>
                <Form.Item label="Description">
                    <TextArea rows={2}
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Description"
                    />
                </Form.Item>
                <Form.Item label="Image">
                    <Upload name="logo" action="/upload.do" listType="picture">
                        <Button>
                            <Icon type="upload" /> Click to upload
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Categorie">
                    <Select defaultValue={categories[0]}>
                        {categories.map((item) => {
                            return <Option value={item}>{item}</Option>
                        })
                        }
                    </Select>
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