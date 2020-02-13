import React, {useEffect} from 'react';
import NavigationBar from '../../core/navigation-bar/NavigationBar';
import './TestPlugin.css';

export const TestPlugin = () => {
    useEffect(() => {
        loadPluginTest('https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/freeverbMichelBuffa/', 'FaustfreeverbMichelBuffa');
    });

    function loadPluginTest(pluginUrl, pluginName) {
        loadScriptThen('https://mainline.i3s.unice.fr/WebAudioPluginBank/bower_components/webaudio-controls2/webcomponents-lite.js', () => {
            loadScriptThen('https://mainline.i3s.unice.fr/WebAudioPluginBank/bower_components/webaudio-controls2/webaudio-controls.js', () => {
                loadScriptThen(pluginUrl + '/main.js', () => {
                    const ctx = new AudioContext();
                    const player = document.getElementById("soundSample");
                    player.onplay = () => {
                        ctx.resume().then(() => {
                            console.log('Playback resumed successfully');
                        });
                    };
                    const mediaSource = ctx.createMediaElementSource(player);
                    const plugin = new window[pluginName](ctx, pluginUrl);
                    let state;
                    plugin.load().then((node) => {
                        console.log('Plugin loaded');
                        console.log(node);
                        plugin.loadGui().then((elem) => {
                            console.log('Load Gui');
                            document.getElementById('plugin-preview-container').appendChild(elem);
                            document.querySelector("#save").addEventListener('click', () => {
                                node.getState()
                                    .then((data) => {
                                        state = data;
                                        console.log("State saved :", data);
                                    })
                            });
                            document.querySelector("#load").addEventListener('click', () => {
                                node.setState(state).then((data) => {
                                    console.log("State restored :", data)
                                })
                            });
                        });
                        mediaSource.connect(node);
                        node.connect(ctx.destination);
                    });
                });
            });
        });
    }

    return (<>
        <NavigationBar/>
        <div className="plugin-test-container">
            <audio
                crossOrigin="anonymous"
                src="https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/freeverbMichelBuffa/CleanGuitarRiff.mp3"
                id="soundSample" controls loop/>
            <div id="plugin-preview-container">
            </div>
            <div className="plugin-control">
                <button className={"ant-btn ant-btn-primary"} id="save">Save current state</button>
                <button className={"ant-btn ant-btn-primary"} id="load">Load last saved state</button>
            </div>
        </div>
    </>);
};

TestPlugin.propTypes = {};

function loadScriptThen(url, callback) {
    // adding the script tag to the head as suggested before
    let head = document.getElementsByTagName('head')[0];
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // then bind the event to the callback function
    // there are several events for cross browser compatibility
    script.onreadystatechange = callback;
    script.onload = callback;

    // fire the loading
    head.appendChild(script);
}

export default TestPlugin;
