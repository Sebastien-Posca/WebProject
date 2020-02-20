import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Tag, Icon } from 'antd';
import './PluginCard.css';
import { Link, useHistory } from 'react-router-dom';
import Text from 'antd/lib/typography/Text';

const { Meta } = Card;
const PluginCard = props => {
    const history = useHistory();
    const plugin = props.item;

    const handleClick = () => {
        const path = "/product/" + plugin._id;
        history.push(path);
    }
    return (
        <Card className="pluginCardWorkshop"
            hoverable
            cover={<img alt="example" src={plugin.thumbnail} />}
        >
            <Meta className="metaCardSection"
                title={plugin.moduleName}
                description={<Text code>version : {plugin.version}</Text>}
            >
            </Meta>

            <div className="pluginDescription">
                <div className="pluginTags">
                    {plugin.tags.map((item) => {
                        return <Tag>{item}</Tag>
                    })}
                </div>
                <Button onClick={handleClick} type="primary">Détails</Button>
            </div>
            <div className="pluginCommentLikes">
                <div className="comments">
                    <Icon className="cardIcons" style={{ fontSize: '24px' }} type="message" theme="twoTone" twoToneColor="#1a98c9" />
                    <label>50</label>
                </div>
                <div className="likes">
                    <Icon className="cardIcons" style={{ fontSize: '24px' }} type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                    <label>50</label>
                </div>
            </div>
        </Card>
    );
};

PluginCard.propTypes = {

};

export default PluginCard;