
const defaultState = { pluginList: null, selectedPlugin: null }

const plugins = (state = defaultState, action) => {
    switch (action.type) {
        case "test":
            for (let plugin of state.pluginList) {
                console.log(plugin)
                if (plugin._id === action.pluginId) {
                    return plugin;
                }
            }
            break;
        case "select_plugin":
            return { ...state, selectedPlugin: action.plugin };
        case "plugin_list":
            return { ...state, pluginList: action.pluginList };
        default:
            return state;
    }
};


export default plugins;