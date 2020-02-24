import React from 'react';
import { Card, Button, Tag, Icon, Tooltip } from 'antd';
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
            cover={<img className="workshopImage" alt="example" src={plugin.thumbnail} />}
        >
            <Meta className="metaCardSection"
                title={plugin.moduleName}
                description={<Text code>version : {plugin.version}</Text>}
            >
            </Meta>

            <div className="pluginDescription">
                <div className="pluginTags">
                    {plugin.tags.map((item) => {
                        return <Tag color="#f50" onClick={() => props.handleTagClick(item)}>{item}</Tag>
                    })}
                </div>
                <Button onClick={handleClick} type="primary">Détails</Button>
            </div>
            <div className="pluginCommentLikes">
                <div className="comments">
                    <Tooltip title={plugin.comments.length + " commentaires"} >
                        <Icon className="cardIcons" style={{ fontSize: '24px' }} type="message" theme="twoTone" twoToneColor="#1a98c9" className="hoverableIcon" />
                        <label>{plugin.comments.length}</label>
                    </Tooltip>
                </div>
                <div className="likes">
                    <Tooltip title={plugin.likes + " likes"} >
                        <Icon className="cardIcons" style={{ fontSize: '24px' }} type="heart" theme="twoTone" twoToneColor="#eb2f96" className="hoverableIcon" />
                        <label>{plugin.likes}</label>
                    </Tooltip>
                </div>
            </div>
        </Card>
    );
};

PluginCard.propTypes = {

};

export default PluginCard;