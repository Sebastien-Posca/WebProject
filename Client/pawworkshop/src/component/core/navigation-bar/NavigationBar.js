import React, {useState} from 'react';
import {Button, Icon, Menu, Modal, Popover} from 'antd';
import './NavigationBar.css';
import {Link} from 'react-router-dom';
import WrappedSignInForm from './SignInForm';
import { useSelector } from 'react-redux';


const NavigationBar = props => {

    const selector = useSelector(state => state.loggedUser);
    console.log(selector)

    const [signIn, setSignIn] = useState(false);

    const hideModal = () => {
        setSignIn(false)
    };

    const showSignIn = () => {
        setSignIn(true);
    };
    return (
        <div className="navigationBar">
            <Menu
                defaultSelectedKeys={['2']}
                defaultOpenKeys={['sub1']}
                mode="horizontal"
                theme="dark"
                className="navigationBarLinks"
            >
                <Menu.Item key="2">
                    <Icon type="desktop"/>
                    <span>Visiter le magasin</span>

                    <Link to="/workshop"/>

                </Menu.Item>
                <Menu.Item key="1">
                    <Icon type="pie-chart"/>
                    <span>Ajouter un plugin</span>

                    <Link to="/form"/>
                </Menu.Item>
            </Menu>

            {selector.userProfil ?
                <div className="navigationBarProfil" onClick={showSignIn}>
                    <p>{selector.userProfil.name}</p>

                    <Popover placement="bottomRight" content={<div className="popoverContent"><img className="popoverImageProfil" src={selector.userProfil.thumbnail}></img> <p>{selector.userProfil.name}</p></div>} trigger="hover">
                        <img className="navigationProfilImage" src={selector.userProfil.thumbnail}></img>
                    </Popover>
                </div>
                :

                <div className="navigationBarProfil" onClick={showSignIn}>
                    <p>Se connecter</p>
                    <Button icon="user"></Button>
                </div>

            }


            <Modal
                visible={signIn}
                onOk={hideModal}
                onCancel={hideModal}
                okText="Sign in"
                cancelText="Cancel"
                className="signInModal"
                footer={null}
            >
                <WrappedSignInForm/>
            </Modal>
        </div >

    );
};

NavigationBar.propTypes = {};

export default NavigationBar;
