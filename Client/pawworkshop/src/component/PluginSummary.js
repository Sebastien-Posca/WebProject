import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Tabs, Tag, Avatar, Comment, Tooltip } from 'antd';
import { BACKEND_ROOT_PATH } from "../constants";
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import CommentComponent from './CommentComponent';
import './PluginSummary.css';
const { TabPane } = Tabs;
const PluginSummary = props => {
    const params = useParams();
    const selectedPlugin = useSelector((state) => state.pluginSelected)
    const [fetchedPlugin, setFetchedPlugin] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`${BACKEND_ROOT_PATH}/plugins/${params.id}`);
            const results = await result.json();

            console.log(result)
            console.log(results)

            setFetchedPlugin(results);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            {loading ? <></> :
                <>
                    <div className="pluginCard">
                        <div className="pluginImage">
                            <img src={fetchedPlugin.thumbnail} alt="Image du plugin" />
                        </div>
                        <div className="pluginSideNotes">
                            <h1 className="title">{fetchedPlugin.name}</h1>
                            <h3>Version : <Text code>{fetchedPlugin.version}</Text> </h3>
                            <p>Category : {fetchedPlugin.category}</p>
                            <p>Tags : {fetchedPlugin.tags.map((item) => {
                                return <Tag>item</Tag>
                            })}</p>
                        </div>
                    </div>

                    <section className='summarySection'>
                        <Tabs type="card">
                            <TabPane tab="Description" key="1">
                                <div className="pluginDescription">
                                    <h1> Description </h1>

                                    <div>Essayer {fetchedPlugin.name}</div>

                                    <p> Description du plugin séléctionné </p>
                                </div>
                            </TabPane>
                            <TabPane tab="Commentaires" key="2">
                                <section className="commentSection">
                                    <CommentComponent pluginId={fetchedPlugin._id} comments={fetchedPlugin.comments} />
                                </section>
                            </TabPane>
                        </Tabs>

                    </section>


                </>
            }

        </>

    )
};

export default PluginSummary;