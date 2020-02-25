import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Icon, message, Tabs, Tag } from 'antd';
import { BACKEND_ROOT_PATH } from "../../../constants";
import Text from 'antd/lib/typography/Text';
import CommentComponent from '../comment/CommentComponent';
import './PluginSummary.css';
import reqwest from 'reqwest';
import { useHistory } from "react-router";


const { TabPane } = Tabs;
const PluginSummary = props => {
    const params = useParams();
    const history = useHistory();
    const selectedPlugin = useSelector((state) => state.pluginSelected);
    const [fetchedPlugin, setFetchedPlugin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [canLike, setCanLike] = useState(false);
    const [reload, setReload] = useState(0);
    const selector = useSelector(state => state.loggedUser.userToken);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`${BACKEND_ROOT_PATH}/plugins/${params.id}`);
            const results = await result.json();
            setFetchedPlugin(results);
            setLoading(false);
        }

        const canLike = async () => {

            reqwest({
                url: `${BACKEND_ROOT_PATH}/plugins/hasLike`,
                method: 'post',
                type: 'json',
                processData: false,
                headers: {
                    Authorization: selector
                },
                contentType: 'application/json',
                data: JSON.stringify({ id: params.id }),
                success: (response) => {
                    console.log(response);
                    setCanLike(response.canLike)
                },
                error: (response) => {
                    console.log(response)
                },
            });

        }

        fetchData();
        canLike();

    }, [canLike, reload]);

    const refresh = () => {
        setReload(reload + 1);
    }
    const handleLike = () => {
        reqwest({
            url: `${BACKEND_ROOT_PATH}/plugins/like`,
            method: 'post',
            type: 'json',
            processData: false,
            headers: {
                Authorization: selector
            },
            contentType: 'application/json',
            data: JSON.stringify({ id: fetchedPlugin._id }),
            success: (plugin) => {
                message.success('Like');
                setCanLike(false);
            },
            error: () => {
                message.error('Pas like');

            },
        });
    };

    function goToTest() {
        const path = "/testPlugin/" + params.id;
        history.push(path);
    }

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
                            <p><span className="categoryName">{fetchedPlugin.category}</span></p>
                            <p>{fetchedPlugin.tags.map((item) => {
                                return (<Tag color="#f50">{item}</Tag>)
                            })}</p>
                            <div className="likesCount">
                                {canLike ?
                                    <Icon className="cardIcons" style={{ fontSize: '30px' }} type="heart" theme="twoTone"
                                        twoToneColor="#eb2f96" onClick={handleLike} /> :
                                    <svg width="30px" height="30px" fill="red" viewBox="0 0 1024 1024">
                                        <path
                                            d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
                                    </svg>
                                }
                                <label>{fetchedPlugin.likes}</label>
                            </div>
                            <h3 className={"version"}>Version : <Text code>{fetchedPlugin.version}</Text></h3>
                            <Button type="primary" icon="download"><a className="downloadLink"
                                href={`${BACKEND_ROOT_PATH}/submit/${fetchedPlugin._id}`}>Telecharger
                                le plugin</a></Button>
                        </div>
                    </div>

                    <section className='summarySection'>
                        <Tabs type="card">
                            <TabPane tab="Description" key="1">
                                <div className="pluginDescription">
                                    <h1> Description </h1>
                                    <p> {fetchedPlugin.description} </p>
                                    <Button onClick={goToTest} type="primary"
                                        icon="play-circle">Essayer {fetchedPlugin.name}</Button>
                                </div>
                            </TabPane>
                            <TabPane tab="Commentaires" key="2">
                                <section className="commentSection">
                                    <CommentComponent pluginId={fetchedPlugin._id} comments={fetchedPlugin.comments} refresh={refresh} />
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
