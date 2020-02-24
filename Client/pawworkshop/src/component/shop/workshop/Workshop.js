import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PluginCard from '../plugin-card/PluginCard';
import {Icon, Input, Spin, Tag} from 'antd';
import {BACKEND_ROOT_PATH} from "../../../constants";
import Search from 'antd/lib/input/Search';
import './Workshop.css';

const Workshop = props => {


    const [pluginList, setPluginList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState([]);
    const pluginListStored = useSelector((state) => state.pluginList);
    const dispatch = useDispatch();
    const [filterName, setFilterName] = useState('');

    //Tags
    const [inputVisible, setInputVisible] = useState(false);
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    const handleTagClose = (removedTag) => {
        const newTags = tags.filter(tag => tag !== removedTag);
        setTags(newTags);
    };

    const handleInputConfirm = () => {
        console.log('flag');
        if (inputValue && tags.indexOf(inputValue) === -1) {
            const newTags = [];
            newTags.push(...tags);
            newTags.push(inputValue);
            setTags(newTags);
        }
        setInputVisible(false);
        setInputValue('');
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const passFilters = (plugin) => {
        if (plugin.moduleName.toLowerCase().includes(filterName.toLowerCase()) && checkForTag(plugin))
            return true;
        return false;
    };

    const checkForTag = (plugin) => {
        const tagsLowerCase = plugin.tags.map(tag => tag.toLowerCase());
        for (let tag of tags) {
            console.log(tag);
            if (!tagsLowerCase.includes(tag.toLowerCase())) {
                return false
            }
        }
        return true;
    };

    const fetchPlugin = async () => {

        let response = await fetch(`${BACKEND_ROOT_PATH}/plugins`);
        let results = await response.json();

        console.log(results);
        dispatch({type: 'plugin_list', pluginList: results});
        setLoading(false);
        setResult(results);
    };

    useEffect(() => {
        fetchPlugin();
    }, []);

    const handleChange = (e) => {
        console.log(e.target.value);
        setFilterName(e.target.value);
    };

    const onTagClick = (tag) => {
        if (!tags.includes(tag)) {
            setTags([...tags, tag]);
        }
    };

    return (
        <>
            {loading ? <div>
                    <Spin size="large" tip="Chargement des Plugins"/>
                </div>
                :
                <>
                    <div className="filterSection">
                        <div className="filters"><Icon type="filter" style={{fontSize: '50px', color: '#08c'}}/>
                            <h1>Filtres</h1></div>

                        <Search className="searchBarWorkshop" placeholder="Chercher un plugin"
                                onChange={handleChange}></Search>

                        <div className={"tags"}>
                            <span className={"searchTag"}>Chercher par tag</span>
                            {tags.map((item) => {
                                return <Tag key={item} color="#f50" closable={true}
                                            onClose={() => handleTagClose(item)}>{item}</Tag>
                            })}
                            {inputVisible && (
                                <>
                                    <Input
                                        type="text"
                                        size="small"
                                        style={{width: 78}}
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onBlur={handleInputConfirm}
                                        onPressEnter={handleInputConfirm}
                                    />
                                </>
                            )}
                            {!inputVisible && (
                                <>
                                    <Tag onClick={showInput}
                                         style={{background: '#fff', borderStyle: 'dashed', cursor: 'pointer'}}>
                                        <Icon type="plus"/> Nouveau tag
                                    </Tag>
                                </>
                            )}
                        </div>


                    </div>
                    <div className={"cards-container"}>

                        {result.map((item) => {
                            if (passFilters(item)) {
                                return <PluginCard item={item} handleTagClick={onTagClick}/>
                            }
                            return <></>
                        })}

                    </div>
                </>
            }
        </>
    );
};

Workshop.propTypes = {};

export default Workshop;
