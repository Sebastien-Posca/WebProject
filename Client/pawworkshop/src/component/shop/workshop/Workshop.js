import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NavigationBar from '../../core/navigation-bar/NavigationBar';
import PluginCard from '../../PluginCard';
import {Spin} from 'antd';
import {BACKEND_ROOT_PATH} from "../../../constants";

const Workshop = props => {


    const [pluginList, setPluginList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([]);
    const pluginListStored = useSelector((state) => state.pluginList);
    const dispatch = useDispatch();
    const fetchPlugin = async () => {

        let response = await fetch(`${BACKEND_ROOT_PATH}/plugin`);
        let results = await response.json();

        console.log(results);
        dispatch({type: 'plugin_list', pluginList: results});
        setLoading(false);
        setResult(results);
    };

    const fetchPluginInformations = () => {

    };

    useEffect(() => {
        fetchPlugin();
    }, []);

    return (
        <>
            <NavigationBar/>
            {loading ? <div>
                    <Spin size="large" tip="Chargement des Plugins"/>
                </div>
                :
                <div>

                    {result.map((item) => {
                        return <PluginCard item={item}/>
                    })}

                </div>
            }
        </>
    );
};

Workshop.propTypes = {};

export default Workshop;
