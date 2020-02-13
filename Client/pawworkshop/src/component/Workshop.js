import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import NavigationBar from './NavigationBar';
import PluginCard from './PluginCard';
import { Spin } from 'antd';

const Workshop = props => {


    const [pluginList, setPluginList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([]);
    const pluginListStored = useSelector((state) => state.pluginList)
    const dispatch = useDispatch();
    const fetchPlugin = async () => {

        let response = await fetch('http://192.168.43.68:3000/plugin')
        let results = await response.json();

        console.log(results);
        dispatch({ type: 'plugin_list', pluginList: results });
        setLoading(false);
        setResult(results);
    }

    const fetchPluginInformations = () => {

    }

    useEffect(() => {
        fetchPlugin();
    }, [])

    return (
        <>
            <NavigationBar />
            {loading ? <div>
                <Spin size="large" tip="Chargement des Plugins" />
            </div>
                :
                <div>

                    {result.map((item) => {
                        return <PluginCard item={item} />
                    })}

                </div>
            }
        </>
    );
};

Workshop.propTypes = {

};

export default Workshop;