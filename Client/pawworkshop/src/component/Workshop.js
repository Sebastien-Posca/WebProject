import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const { Meta } = Card;
const Workshop = props => {


    const [pluginList, setPluginList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([]);

    const fetchPlugin = async () => {

        let response = await fetch('http://mainline.i3s.unice.fr/repository.json')
        let results = await response.json();

        Object.entries(results.plugs).map(([key, value]) => {
            console.log(key)
            console.log(value);
        });

        setResult(Object.entries(results.plugs));
        setLoading(false);
    }

    const printPlugins = (item) => {
        console.log(item)
        return <Card > <Meta title="Europe Street beat" description="www.instagram.com" /></Card>

    }
    const fetchPluginInformations = () => {

    }

    useEffect(() => {
        fetchPlugin();
    }, [])

    return (
        <div>
            {/* {loading ? <div> Nothing Yet </div> : <>{[result].map((item) => {
                return printPlugins(item);
            })}</>} */}

        </div>
    );
};

Workshop.propTypes = {

};

export default Workshop;