import React, { useState } from 'react';
import { Avatar, Button, Comment, Form, message, Tooltip } from 'antd';
import moment from 'moment';
import './CommentComponent.css';
import TextArea from 'antd/lib/input/TextArea';
import reqwest from 'reqwest';
import { BACKEND_ROOT_PATH } from "../../../constants";
import { useSelector } from 'react-redux';

const CommentComponent = props => {
    const [submitting, setSubmitting] = useState(false);
    const comments = props.comments;
    const pluginId = props.pluginId;
    const [value, setValue] = useState('');

    const selector = useSelector(state => state.loggedUser);

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
        };

        formDataComment.append('id', pluginId);
        formDataComment.append('comment', JSON.stringify(comment));
        console.log(pluginId)
        console.log(comment)
        reqwest({
            url: `${BACKEND_ROOT_PATH}/plugins/comment`,
            method: 'post',
            type: 'json',
            processData: false,
            headers: {
                Authorization: selector.userToken
            },
            contentType: 'application/json',
            data: JSON.stringify({ id: pluginId, comment: comment }),
            success: () => {
                message.success('Commentaire envoyé');
                props.refresh();
                setValue('');
                setSubmitting(false);
            },
            error: (err) => {
                console.log(err)
                message.error('Problème avec l\'envoi du commentaire');
                setSubmitting(false);
            },
        });
    };

    return (
        <div className="commentComponent">
            {comments.map((item) => {

                return <Comment
                    author={item.user}
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
                            <span>Il y a {moment(item.date, 'YYYY-MM-DD HH:mm:ss').fromNow()
                                .replace(/hour/, 'heure')
                                .replace(/hours/, 'heures')
                                .replace(/month/, 'mois')
                                .replace(/months/, 'mois')
                                .replace(/an/, 'une')
                                .replace(/day/, 'jour')
                                .replace(/days/, 'jours')
                                .replace(/ago/, '')}</span>
                        </Tooltip>
                    }
                />

            })}

            {selector.userProfil ?
                <Comment
                    avatar={
                        <Avatar
                            src={selector.userProfil.thumbnail}
                            alt={selector.userProfil.name}
                        />
                    }
                    content={
                        <div>
                            <Form.Item>
                                <TextArea rows={4} onChange={handleChange} value={value} />
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" loading={submitting} onClick={handleSubmit} type="primary">
                                    Laisser un commentaire
                            </Button>
                            </Form.Item>
                        </div>

                    }
                /> :
                <>
                    <TextArea rows={4} disabled={true} value="Vous devez être connecté pour laisser un commentaire ! " >
                    </TextArea>
                </>
            }


        </div>
    );
};


export default CommentComponent;
