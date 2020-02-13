import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import './PluginCard.css';

const { Meta } = Card;
const PluginCard = props => {
    return (

        <Card className="pluginCardWorkshop"
            hoverable
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <Meta
                title="Plugintitle"
                description="pluginDescription (tags?)"
            >
            </Meta>
            <span>Hey ho hey ho</span>
        </Card>
    );
};

PluginCard.propTypes = {

};

export default PluginCard;