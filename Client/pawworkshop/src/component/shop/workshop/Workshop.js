import React, {useEffect, useState} from 'react';
import {Card} from 'antd';
import NavigationBar from '../../core/navigation-bar/NavigationBar';

const {Meta} = Card;
const Workshop = () => {


    // noinspection JSUnusedLocalSymbols
    const [pluginList, setPluginList] = useState([]);
    // noinspection JSUnusedLocalSymbols
    const [loading, setLoading] = useState(true);
    // noinspection JSUnusedLocalSymbols
    const [result, setResult] = useState([]);

    const fetchPlugin = async () => {

        let response = await fetch('http://mainline.i3s.unice.fr/repository.json');
        let results = await response.json();

        Object.entries(results.plugs).map(([key, value]) => {
            console.log(key);
            console.log(value);
        });

        setResult(Object.entries(results.plugs));
        setLoading(false);
    };

    // noinspection JSUnusedLocalSymbols
    const printPlugins = (item) => {
        console.log(item);
        return <Card> <Meta title="Europe Street beat" description="www.instagram.com"/></Card>

    };
    // noinspection JSUnusedLocalSymbols
    const fetchPluginInformations = () => {

    };

    useEffect(() => {
        fetchPlugin();
    }, []);

    return (
        <>
            <NavigationBar/>
            <div>

                {/* {loading ? <div> Nothing Yet </div> : <>{[result].map((item) => {
                return printPlugins(item);
            })}</>} */}

            </div>
        </>
    );
};

Workshop.propTypes = {};

export default Workshop;
