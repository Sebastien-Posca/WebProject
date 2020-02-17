import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PluginSummary = props => {
    const id = useParams();
    const selectedPlugin = useSelector((state) => state.pluginSelected)
    console.log(selectedPlugin)
    return (
        <>
            <img alt="example" src={selectedPlugin.thumbnail} />
            <div className="pluginCard">

            </div>

            <section>
                <div className="pluginDescription">
                    <h1> Description </h1>
                    <p>Description du plugin séléctionné</p>

                </div>
            </section>
            <section className="commentSection">
                <div></div>
            </section>
        </>
    )
};

export default PluginSummary;