
const defaultState = { pluginList: null, selectedPlugin: null }

const plugins = (state = defaultState, action) => {
    switch (action.type) {
        case "select_plugin":
            return { ...state, selectedPlugin: action.plugin };
        case "plugin_list":
            return { ...state, pluginList: action.pluginList };
        default:
            return state;
    }
};


export default plugins;