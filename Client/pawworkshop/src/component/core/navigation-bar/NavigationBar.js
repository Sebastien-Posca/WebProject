import React, { useState } from 'react';
import { Button, Icon, Menu, Modal, Popover, message, } from 'antd';
import './NavigationBar.css';
import { Link } from 'react-router-dom';
import WrappedSignInForm from './SignInForm';
import { useSelector, useDispatch } from 'react-redux';
import { BACKEND_ROOT_PATH } from "../../../constants";
import reqwest from 'reqwest';
import logUser from '../../../store/actions/logUser';
import setUserToken from '../../../store/actions/setUserToken';

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
        setSignIn(true);
    };

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
                <WrappedSignInForm handleRequest={(credentials) => handleRequest(credentials)} loading={loading} />
            </Modal>
        </div >

    );
};

NavigationBar.propTypes = {};

export default NavigationBar;
