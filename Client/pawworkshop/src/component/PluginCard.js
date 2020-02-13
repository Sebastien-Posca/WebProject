import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'antd';
import './PluginCard.css';
import { Link } from 'react-router-dom';

const { Meta } = Card;
const PluginCard = props => {

    const handleClick = () => {
        
    }
    return (
        <Card className="pluginCardWorkshop"
            hoverable
            cover={<img alt="example" src={props.item.thumbnail} />}
        >
            <Meta
                title="Plugintitle"
                description="pluginDescription (tags?)"
            >
            </Meta>
            <span>Hey ho hey ho</span>
            <Button onClick={handleClick}>Détails</Button>
        </Card>
    );
};

PluginCard.propTypes = {

};

export default PluginCard;