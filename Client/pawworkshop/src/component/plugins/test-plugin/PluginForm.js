import React, {useState} from 'react';
import {Button, Form, Icon, Input, InputNumber, message, Select, Upload} from 'antd';
import React, { useState } from 'react';
import { Form, Icon, Input, Button, InputNumber, Upload, Select, message, Tag } from 'antd';
import 'antd/dist/antd.css'
import Dragger from 'antd/lib/upload/Dragger';
import './PluginForm.css';
import reqwest from 'reqwest';
import {BACKEND_ROOT_PATH} from "../../../constants";


const {Option} = Select;
const {TextArea} = Input;
const categories = ['Modulation', 'Distortion', 'Egalisation', 'Reverb', 'Accordeur']

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
};


const PluginForm = props => {


    Form.create();
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = props.form
    const [imageUrl, setImageUrl] = useState(false);

    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState(undefined);
    const [thumbnail, setThumbnail] = useState(undefined)
    const [uploading, setUploading] = useState(false);
    const [thumbnailLoading, setThumbnailLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'}/>
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const zipHandleChange = (info) => {
        const {status} = info.file;

        if (status === 'done') {
            setUploading(false);
            message.success(`${info.file.name} file uploaded successfully.`);

        } else if (status === 'error') {
            setUploading(false);
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    const handleCustomRequest = (info) => {
        console.log(info)
    }

    const handleBeforeUploadZip = (file) => {
        setFile(file);
        return false;
    }
    const handleBeforeUploadThumbnail = (thumbnail) => {
        setThumbnail(thumbnail);
        console.log(thumbnail)
        return true;
    }

    const onThumbnailChange = (info) => {
        if (info.file.status === 'uploading') {
            setThumbnailLoading(true);
            return;
        }

        if (info.file.status !== 'uploading') {
            setThumbnailLoading(false);
            return;
        }
    }

    const handleTagClose = (removedTag) => {
        const newTags = tags.filter(tag => tag !== removedTag);
        setTags(newTags);
    }

    // START
    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        console.log('flag')
        if (inputValue && tags.indexOf(inputValue) === -1) {
            const newTags = [];
            newTags.push(...tags);
            newTags.push(inputValue)
            setTags(newTags);
        }
        setInputVisible(false);
        setInputValue('');
    };

    // const saveInputRef = input => (this.input = input);

    // END
    const handleClick = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('myFile', file);

        props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // setUploading(true);
                console.log('Received values of form: ', values);
                formData.append('name', values.name);
                formData.append('version', values.version);
                formData.append('description', values.description);
                if (values.thumbnail) {
                    formData.append('thumbnail', values.thumbnail.file.thumbUrl);
                }
                formData.append('categorie', values.category);
                console.log(tags);
                formData.append('tags', JSON.stringify(tags));
                setUploading(true);
                reqwest({
                    url: `${BACKEND_ROOT_PATH}/submit`,
                    method: 'post',
                    processData: false,
                    data: formData,
                    success: () => {
                        message.success('upload successfully.');
                        setUploading(false);
                    },
                    error: () => {
                        message.error('upload failed.');
                        setUploading(false);
                    },
                });
            }
        });
        props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });


    }

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
                        rules: [{required: false, message: 'Please upload a thumbnail for your plugin!'}]
                    })(
                        <Upload name="logo" listType="picture-card" customRequest={handleBeforeUploadThumbnail}
                                onChange={onThumbnailChange}>
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
                        </Upload>
                    )}
                </Form.Item>

                <Form.Item label="ZipFile">
                    {getFieldDecorator('zipfile', {
                        rules: [{required: true, message: 'Please upload a Zip file for your plugin!'}]
                    })(
                        <Dragger data={{dataName: "SebLEMALADE"}} name="myFile" onChange={zipHandleChange}
                                 customRequest={handleCustomRequest} beforeUpload={handleBeforeUploadZip}>
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
                <Form.Item label="Category">
                    {getFieldDecorator('category', {
                        rules: [{required: true, message: 'Please select a category!'}]

                    })(
                        <Select>
                            {categories.map((item) => {
                                return <Option value={item}>{item}</Option>
                            })
                            }
                        </Select>
                    )}
                </Form.Item>
                {/* <Form.Item label="Tags">
                    {getFieldDecorator('tags', {
                        rules: [{required: true, message: 'Please select tag(s)!'}]
                    })(
                        <Select
                            mode="tags"
                            placeholder="Please select"
                            onChange={handleTagChange}
                            style={{width: '100%'}}
                        >
                        </Select>
                    )}
                </Form.Item> */}

                <Form.Item label="Tags">
                    {getFieldDecorator('tags', {
                        rules: [{required: true, message: 'Please select tag(s)!'}]
                    })(
                        <div>
                            {tags.map((item) => {
                                return <Tag key={item} closable={true} onClose={() => handleTagClose(item)}>{item}</Tag>
                            })}
                            {inputVisible && (
                                <Input
                                    type="text"
                                    size="small"
                                    style={{width: 78}}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onBlur={handleInputConfirm}
                                    onPressEnter={handleInputConfirm}
                                />
                            )}
                            {!inputVisible && (
                                <Tag onClick={showInput} style={{background: '#fff', borderStyle: 'dashed'}}>
                                    <Icon type="plus"/> New Tag
                                </Tag>
                            )}
                        </div>
                    )}
                </Form.Item>

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
