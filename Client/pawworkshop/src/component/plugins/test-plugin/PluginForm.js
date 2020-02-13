import React, {useState} from 'react';
import {Button, Form, Icon, Input, InputNumber, message, Upload} from 'antd';
import 'antd/dist/antd.css'
import Dragger from 'antd/lib/upload/Dragger';
import './PluginForm.css';
import reqwest from 'reqwest';


const {TextArea} = Input;
// noinspection JSUnusedLocalSymbols
const categories = ['Modulation', 'Distortion', 'Egalisation', 'Reverb', 'Accordeur'];

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};


const PluginForm = props => {


    Form.create();
    // noinspection JSUnusedLocalSymbols
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = props.form;
    // noinspection JSUnusedLocalSymbols
    const [imageUrl, setImageUrl] = useState(false);

    // noinspection JSUnusedLocalSymbols
    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState(undefined);
    const [thumbnail, setThumbnail] = useState(undefined);
    const [uploading, setUploading] = useState(false);
    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'}/>
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const zipHandleChange = (info) => {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleCustomRequest = (info) => {
        console.log(info)
    };

    const handleBeforeUploadZip = (file) => {
        setFile(file);
        return false;
    };
    const handleBeforeUploadThumbnail = (thumbnail) => {
        setThumbnail(thumbnail);
        return false;
    };

    const handleClick = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('myFile', file);

        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                setUploading(true);
                console.log('Received values of form: ', values);
                formData.append('name', values.name);
                formData.append('version', values.version);
                formData.append('description', values.description);
                formData.append('thumbnail', thumbnail);
                reqwest({
                    url: 'http://192.168.43.68:3000/submit',
                    method: 'post',
                    processData: false,
                    data: formData,
                    success: () => {
                        message.success('upload successfully.');
                    },
                    error: () => {
                        message.error('upload failed.');
                    },
                });
                setUploading(true);
            }
        });
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });


    };

    return (
        <div className="content">

            <Form {...formItemLayout} onSubmit={(e) => handleClick(e)}>
                <Form.Item label="Nom du Plugin">
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please input the plugin name!'}]
                    })(
                        <Input
                            placeholder="Plugin name"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Version">
                    {getFieldDecorator('version', {
                        rules: [{required: true, message: 'Please input a version!'}]
                    })(
                        <InputNumber
                            placeholder="Version"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Description">
                    {getFieldDecorator('description', {
                        rules: [{required: true, message: 'Please input a description!'}]
                    })(
                        <TextArea rows={2}
                                  placeholder="Description"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Thumbnail">
                    {getFieldDecorator('thumbnail', {
                        rules: [{required: true, message: 'Please upload a thumbnail for your plugin!'}]
                    })(
                        <Upload name="logo" listType="picture-card" customRequest={handleBeforeUploadThumbnail}>
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                        </Upload>
                    )}
                </Form.Item>
                {/* <Form.Item label="ZipFile">
                    {getFieldDecorator('zipfile', {
                        rules: [{ required: true, message: 'Please upload a Zip file for your plugin!' }]
                    })(
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> Select File
          </Button>
                        </Upload>,
                    )}
                </Form.Item> */}


                <Form.Item label="ZipFile">
                    {getFieldDecorator('zipfile', {
                        rules: [{required: true, message: 'Please upload a Zip file for your plugin!'}]
                    })(
                        <Dragger data={{dataName: "SebLEMALADE"}} name="myFile" onChange={zipHandleChange}
                                 action="http://192.168.43.68:3000/submit" customRequest={handleCustomRequest}
                                 beforeUpload={handleBeforeUploadZip}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox"/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or
                                other
                                band files
                            </p>
                        </Dragger>,
                    )}
                </Form.Item>
                {/* <Form.Item label="Category">
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
                </Form.Item> */}
                <Form.Item>
                    <Button
                        type="primary"
                        loading={uploading}
                        htmlType="submit"
                    >
                        {uploading ? 'Envoi en cours' : 'Envoyer le plugin'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

const WrappedPluginForm = Form.create()(PluginForm);
PluginForm.propTypes = {};

export default WrappedPluginForm;
