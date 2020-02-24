import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Comment, Avatar, Tooltip, Form, Button, message } from 'antd';
import moment from 'moment';
import './CommentComponent.css';
import TextArea from 'antd/lib/input/TextArea';
import reqwest from 'reqwest';
import { BACKEND_ROOT_PATH } from "../constants";

const CommentComponent = props => {
    const [submitting, setSubmitting] = useState(false);
    const comments = props.comments
    const pluginId = props.pluginId
    const [value, setValue] = useState('');

    const handleChange = e => {
        setValue(e.target.value)
    };

    const handleSubmit = () => {
        if (!value) {
            return;
        }

        const formDataComment = new FormData();

        setSubmitting(true);

        const comment = {
            date: `${Date.now()}`,
            text: `${value}`
        }

        formDataComment.append('id', pluginId);
        formDataComment.append('comment', JSON.stringify(comment));

        reqwest({
            url: `${BACKEND_ROOT_PATH}/plugins/comment`,
            method: 'post',
            type: 'json',
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify({ id: pluginId, comment: comment }),
            success: () => {
                message.success('Commentaire envoyé');
                setSubmitting(false);
            },
            error: () => {
                message.error('Problème avec le commentaire');
                setSubmitting(false);
            },
        });
    };

    return (
        <div className="commentComponent">
            {comments.map((item) => {

                return <Comment
                    author={item.author}
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Author thumbnail"
                        />
                    }
                    content={
                        <p>
                            {item.text}
                        </p>
                    }
                    datetime={
                        <Tooltip title={moment(item.date).format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(item.date, 'YYYY-MM-DD HH:mm:ss').fromNow()}</span>
                        </Tooltip>
                    }
                />

            })}

            <Comment
                avatar={
                    <Avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        alt="Han Solo"
                    />
                }
                content={
                    <div>
                        <Form.Item>
                            <TextArea rows={4} onChange={handleChange} value={value} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                                Add Comment
            </Button>
                        </Form.Item>
                    </div>

                }
            />


        </div>
    );
};


export default CommentComponent;