import React, {useState} from 'react';
import {Button, Icon, Menu, Modal, Popover} from 'antd';
import './NavigationBar.css';
import {Link} from 'react-router-dom';
import WrappedSignInForm from './SignInForm';

const popoverContent = () => {
    // return (<><img src="https://www.dictionary.com/e/wp-content/uploads/2018/03/PogChamp.jpg"></img>
    //     <p>Random Customer</p></>)
    return ('<><img src="https://www.dictionary.com/e/wp-content/uploads/2018/03/PogChamp.jpg"></img> <p>Random Customer</p></>')
    // return (<p>Enfoiré</p>)
};

const NavigationBar = props => {

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

            <div className="navigationBarProfil" onClick={showSignIn}>
                <p>Se connecter</p>
                <Popover placement="bottomRight"
                         content={<div className="popoverContent"><img className="popoverImageProfil"
                                                                       src="https://www.dictionary.com/e/wp-content/uploads/2018/03/PogChamp.jpg"></img>
                             <p>Random Customer</p></div>} trigger="hover">
                    <Button icon="user"></Button>
                </Popover>
            </div>

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
        </div>

    );
};

NavigationBar.propTypes = {};

export default NavigationBar;
