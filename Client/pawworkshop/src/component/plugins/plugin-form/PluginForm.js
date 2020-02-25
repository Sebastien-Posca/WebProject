import React, { useState } from 'react';
import { Button, Form, Icon, Input, InputNumber, message, Radio, Select, Tag, Upload } from 'antd';
import 'antd/dist/antd.css'
import Dragger from 'antd/lib/upload/Dragger';
import './PluginForm.css';
import reqwest from 'reqwest';
import { BACKEND_ROOT_PATH } from "../../../constants";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Option } = Select;
const { TextArea } = Input;
const categories = ['Modulation', 'Distortion', 'Egalisation', 'Reverb', 'Accordeur'];

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};


const PluginForm = props => {
    const selector = useSelector(state => state.loggedUser);
    const history = useHistory();
    Form.create();
    const { getFieldDecorator } = props.form;
    const [imageUrl, setImageUrl] = useState(false);

    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState(undefined);
    const [thumbnail, setThumbnail] = useState(undefined);
    const [uploading, setUploading] = useState(false);
    const [thumbnailLoading, setThumbnailLoading] = useState(false);
    const [tags, setTags] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [uploadType, setUploadType] = useState('zip');
    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const zipHandleChange = (info) => {
        const { status } = info.file;
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
        console.log(thumbnail);
        return true;
    };

    const onThumbnailChange = (info) => {
        if (info.file.status === 'uploading') {
            setThumbnailLoading(true);
            return;
        }

        if (info.file.status !== 'uploading') {
            setThumbnailLoading(false);

        }
    };

    const handleTagClose = (removedTag) => {
        const newTags = tags.filter(tag => tag !== removedTag);
        setTags(newTags);
    };

    // START
    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    const handleRadioGroupChange = e => {
        if (setUploadType !== e.target.value) {
            setUploadType(e.target.value);
        }

    };

    const handleInputConfirm = () => {
        console.log('flag');
        if (inputValue && tags.indexOf(inputValue) === -1) {
            const newTags = [];
            newTags.push(...tags);
            newTags.push(inputValue);
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
                if (values.githubAddress) {
                    formData.append('git', values.githubAddress);
                }
                formData.append('categorie', values.category);
                console.log(tags);
                formData.append('tags', JSON.stringify(tags));
                setUploading(true);
                console.log(formData);

                let urlRequest;

                if (uploadType === 'zip') {
                    urlRequest = `${BACKEND_ROOT_PATH}/submit`
                } else {
                    urlRequest = `${BACKEND_ROOT_PATH}/submit/git`
                }

                reqwest({
                    url: urlRequest,
                    method: 'post',
                    processData: false,
                    data: formData,
                    headers: {
                        Authorization: selector.userToken
                    },
                    success: () => {
                        message.success('Plugin bien envoyé !.');
                        setUploading(false);
                        history.push('/workshop')
                    },
                    error: () => {
                        message.error('Probléme avec l\'upload du plugin !.');
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


    };

    return (
        <div className="content">

            <Form {...formItemLayout} onSubmit={(e) => handleClick(e)}>
                <Form.Item label="Nom du Plugin">
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Entrer le nom du plugin !' }]
                    })(
                        <Input
                            placeholder="Nom du Plugin"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Version">
                    {getFieldDecorator('version', {
                        rules: [{ required: true, message: 'Entrer le numéro de version !' }]
                    })(
                        <InputNumber
                            placeholder="Version"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Description">
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: 'Entrer une description !' }]
                    })(
                        <TextArea rows={2}
                            placeholder="Description"
                        />
                    )}
                </Form.Item>
                <Form.Item label="Vignette">
                    {getFieldDecorator('thumbnail', {
                        rules: [{ required: false, message: 'Please upload a thumbnail for your plugin!' }]
                    })(
                        <Upload name="logo" listType="picture-card" customRequest={handleBeforeUploadThumbnail}
                            onChange={onThumbnailChange}>
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    )}
                </Form.Item>
                <Form.Item label="Type d'envoi">
                    {getFieldDecorator('uploadChoice', {
                        rules: [{ required: false, message: 'Please upload a thumbnail for your plugin!' }]
                    })(
                        <Radio.Group onChange={handleRadioGroupChange} defaultValue="a" buttonStyle="solid">
                            <Radio.Button value="zip">Fichier Zip</Radio.Button>
                            <Radio.Button value="github">Dépôt distant</Radio.Button>
                        </Radio.Group>
                    )}
                </Form.Item>

                {uploadType === 'zip' ?
                    <Form.Item label="Fichier Zip">
                        {getFieldDecorator('zipfile', {
                            rules: [{ required: true, message: 'Ajouter le fichier Zip de votre plugin!' }]
                        })(
                            <Dragger data={{ dataName: "SebLEMALADE" }} name="myFile" onChange={zipHandleChange}
                                customRequest={handleCustomRequest} beforeUpload={handleBeforeUploadZip}>
                                <p className="ant-upload-drag-icon">
                                    <Icon type="inbox" />
                                </p>
                                <p className="ant-upload-text">Cliquer ou déposez le fichier sur cette zone pour
                                    ajouter</p>
                            </Dragger>,
                        )}
                    </Form.Item>
                    :
                    <Form.Item label="Adresse Github">
                        {getFieldDecorator('githubAddress', {
                            rules: [{ required: true, message: 'Ajouter une url GitHub !' }]

                        })(
                            <Input placeholder="Url GitHub" />
                        )}
                    </Form.Item>
                }
                <Form.Item label="Catégorie">
                    {getFieldDecorator('category', {
                        rules: [{ required: true, message: 'Selectionner une catégorie !' }]

                    })(
                        <Select>
                            {categories.map((item) => {
                                return <Option value={item}>{item}</Option>
                            })
                            }
                        </Select>
                    )}
                </Form.Item>

                <Form.Item label="Tags">
                    {getFieldDecorator('tags', {
                        rules: [{ required: true, message: 'Selectionner au moins un tag!' }]
                    })(
                        <div>
                            {tags.map((item) => {
                                return <Tag color="#f50" key={item} closable={true} onClose={() => handleTagClose(item)}>{item}</Tag>
                            })}
                            {inputVisible && (
                                <Input
                                    type="text"
                                    size="small"
                                    style={{ width: 78 }}
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onBlur={handleInputConfirm}
                                    onPressEnter={handleInputConfirm}
                                />
                            )}
                            {!inputVisible && (
                                <Tag onClick={showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                                    <Icon type="plus" /> Nouveau Tag
                                </Tag>
                            )}
                        </div>
                    )}
                </Form.Item>

                <Form.Item>
                    {selector.userProfil ? <Button
                        type="primary"
                        loading={uploading}
                        htmlType="submit">
                        {uploading ? 'Envoi en cours' : 'Envoyer le plugin'}
                    </Button> :
                        <Button
                            disabled={true}
                            type="primary"
                        >
                            Connectez vous pour envoyer un plugin !
                        </Button>}
                </Form.Item>
            </Form>
        </div>
    );
};

const WrappedPluginForm = Form.create()(PluginForm);
PluginForm.propTypes = {};

export default WrappedPluginForm;
