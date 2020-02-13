import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Button } from 'antd';
import './NavigationBar.css';
import { Link } from 'react-router-dom';
const NavigationBar = props => {
    return (
        <div className="navigationBar">
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="horizontal"
                theme="dark"
            >
                <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>Ajouter un plugin</span>

                    <Link to="/form" />
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="desktop" />
                    <span>Visiter le magasin</span>

                    <Link to="/workshop" />

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