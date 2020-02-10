
import React from 'react';
import WrappedPluginForm from './PluginForm';
import NavigationBar from './NavigationBar'
const Plugin = props => {
    return (
        <>
            <NavigationBar />
            <WrappedPluginForm />
        </>
    )
};

Plugin.propTypes = {

};

export default Plugin;