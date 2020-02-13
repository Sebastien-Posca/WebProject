import React from 'react';
import WrappedPluginForm from './test-plugin/PluginForm';
import NavigationBar from '../core/navigation-bar/NavigationBar'

const Plugin = () => {
    return (
        <>
            <NavigationBar/>
            <WrappedPluginForm/>
        </>
    )
};

Plugin.propTypes = {};

export default Plugin;
