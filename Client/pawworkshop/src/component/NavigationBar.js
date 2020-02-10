import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Button } from 'antd';
import './NavigationBar.css';
const NavigationBar = props => {
    return (
        <div className="navigationBar">
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
            >
                <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>Option 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="desktop" />
                    <span>Option 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="inbox" />
                    <span>Option 3</span>
                </Menu.Item>
            </Menu>
        </div>
    );
};

NavigationBar.propTypes = {

};

export default NavigationBar;