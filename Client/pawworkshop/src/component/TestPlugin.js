import React from 'react';
import PropTypes from 'prop-types';
import NavigationBar from './NavigationBar';

const TestPlugin = props => {


    return (
        <>

            <NavigationBar />
            <div>
                {/* <iframe width="100%" height="100%;" src="https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/MyCustomChorus/"></iframe> */}
                <iframe width="100%" height="100%;" src="https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/freeverbMichelBuffa/">

                </iframe>
            </div>
        </>
    );
};

TestPlugin.propTypes = {

};

export default TestPlugin;