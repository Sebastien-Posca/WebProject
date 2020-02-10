import React from 'react';
import { Button } from 'antd';
import NavigationBar from './NavigationBar'
import { Link } from 'react-router-dom';
const MainMenu = props => {
    return (
        <>
            <NavigationBar />
            <div>
                <Button><Link to="/form">Envoyer un plugin</Link></Button>
                <Button><Link to="/workshop">Visiter le magasin</Link></Button>
                <Button><Link to="/testPlugin">TEST PLUGIN</Link></Button>


            </div>
        </>
    );
};

MainMenu.propTypes = {

};

export default MainMenu;