import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Tag, Icon } from 'antd';
import './PluginCard.css';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const PluginCard = props => {

    const plugin = props.item;

    const handleClick = () => {

    }
    return (
        <Card className="pluginCardWorkshop"
            hoverable
            cover={<img alt="example" src={plugin.thumbnail} />}
        >
            <Meta
                title={plugin.moduleName}
                description="pluginDescription (tags?)"
            >
            </Meta>

            <div className="pluginTags">
                {plugin.tags.map((item) => {
                    return <Tag>{item}</Tag>
                })}
            </div>
            <Button onClick={handleClick} type="primary">Détails</Button>

            <div className="divLikes">
                <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
                <label>50</label>
            </div>
        </Card>
    );
};

PluginCard.propTypes = {

};

export default PluginCard;