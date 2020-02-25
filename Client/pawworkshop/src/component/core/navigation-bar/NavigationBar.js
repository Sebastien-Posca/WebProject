import React, { useState } from 'react';
import { Button, Icon, Menu, Modal, Popover, message, Tabs, } from 'antd';
import './NavigationBar.css';
import { Link } from 'react-router-dom';
import WrappedSignInForm from './SignInForm';
import { useSelector, useDispatch } from 'react-redux';
import { BACKEND_ROOT_PATH } from "../../../constants";
import reqwest from 'reqwest';
import logUser from '../../../store/actions/logUser';
import setUserToken from '../../../store/actions/setUserToken';
import WrappedRegisterForm from './RegisterForm';
const { TabPane } = Tabs;
const NavigationBar = props => {

    const selector = useSelector(state => state.loggedUser);
    console.log(selector)
    const dispatcher = useDispatch();
    const [loading, setLoading] = useState(false);

    const [signIn, setSignIn] = useState(false);

    const hideModal = () => {
        setSignIn(false)
    };

    const showSignIn = () => {
        if (!selector.userProfil) {
            setSignIn(true);
        }
    };

    const handleDisconnect = (e) => {
        e.stopPropagation();
        dispatcher(logUser(null))
        dispatcher(setUserToken(null));
    }

    const handleRequest = (credentials) => {
        reqwest({
            url: `${BACKEND_ROOT_PATH}/user/login`,
            method: 'post',
            type: 'json',
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            success: (response) => {
                message.success('Bienvenue ' + response.user.name + " ! ");
                dispatcher(logUser(response.user))
                dispatcher(setUserToken(response.token));
                setLoading(false);
                setSignIn(false);
            },
            error: (user) => {
                console.log(user);
                message.error('Identifiant ou mot de passe incorrects');
                setLoading(false);
            },
        });
    }
    const handleRegister = (credentials) => {
        console.log("register")
        console.log(credentials);
        reqwest({
            url: `${BACKEND_ROOT_PATH}/user/create`,
            method: 'post',
            type: 'json',
            processData: false,
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            success: (response) => {
                console.log(response);
                message.success('Bienvenue ' + response.user.name + " ! ");
                // dispatcher(logUser(response.user))
                // dispatcher(setUserToken(response.token));
                setLoading(false);
                setSignIn(false);
            },
            error: (user) => {
                console.log(user);
                message.error('Probléme avec l"inscription, veuillez recommencer');
                setLoading(false);
            },
        });
    }

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
                    <Icon type="desktop" />
                    <span>Visiter le magasin</span>

                    <Link to="/workshop" />

                </Menu.Item>
                <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>Ajouter un plugin</span>

                    <Link to="/form" />
                </Menu.Item>
            </Menu>

            {selector.userProfil ?
                <div className="navigationBarProfil" onClick={showSignIn}>
                    <p>{selector.userProfil.name}</p>

                    <Popover placement="bottomRight" content={
                        <div className="popoverContent">
                            <img className="popoverImageProfil" src={selector.userProfil.thumbnail}></img>
                            <p>{selector.userProfil.name}</p> <Button type="primary" onClick={handleDisconnect}>Se deconnecter</Button>
                        </div>
                    } trigger="hover">
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
                <Tabs defaultActiveKey="2">
                    <TabPane
                        tab={
                            <span>
                                <Icon type="apple" />
                                S'inscrire
        </span>
                        }
                        key="1"
                    >
                        <WrappedRegisterForm handleRegister={(credentials => handleRegister(credentials))} loading={loading} />

                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <Icon type="android" />
                                Se connecter
        </span>
                        }
                        key="2"
                    >
                        <WrappedSignInForm handleRequest={(credentials) => handleRequest(credentials)} loading={loading} />

                    </TabPane>
                </Tabs>

            </Modal>
        </div >

    );
};

NavigationBar.propTypes = {};

export default NavigationBar;
