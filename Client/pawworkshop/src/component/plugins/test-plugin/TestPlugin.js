import React, {useEffect} from 'react';
import {useHistory, useParams} from "react-router";
import './TestPlugin.css';
import {BACKEND_ROOT_PATH} from "../../../constants";
import {Button} from "antd";

export const TestPlugin = () => {
    let {idPlugin} = useParams();
    const history = useHistory();
    let plugin = undefined;
    useEffect(() => {
        fetchPlugin(idPlugin).then(pluginRes => {
            plugin = pluginRes;
            loadPluginTest(`${BACKEND_ROOT_PATH}/${pluginRes.path}`, pluginRes.moduleName);
        });
    }, [plugin]);
    let state;
    let popupOpened = 'none';
    let removePopupTimer;

    const fetchPlugin = async (id) => {
        const response = await fetch(`${BACKEND_ROOT_PATH}/plugins/${id}`);
        return await response.json();
    };

    function loadPluginTest(pluginUrl, pluginName) {
        loadScriptThen('https://mainline.i3s.unice.fr/WebAudioPluginBank/bower_components/webaudio-controls2/webcomponents-lite.js', () => {
            loadScriptThen('https://mainline.i3s.unice.fr/WebAudioPluginBank/bower_components/webaudio-controls2/webaudio-controls.js', () => {
                loadScriptThen(pluginUrl + '/main.js', () => {
                    const ctx = new AudioContext();
                    const player = document.getElementById("soundSample");
                    console.log(player);
                    player.onplay = () => {
                        ctx.resume().then(() => {
                            console.info('Playback resumed successfully');
                        });
                    };
                    const mediaSource = ctx.createMediaElementSource(player);
                    const plugin = new window[pluginName](ctx, pluginUrl);
                    plugin.load().then((audioWorkletNode) => {
                        plugin.loadGui().then((elem) => {
                            document.getElementById('plugin-preview-container').appendChild(elem);
                            document.querySelector("#save").addEventListener('click', () => {
                                audioWorkletNode.getState()
                                    .then((data) => {
                                        state = data;
                                    })
                            });
                            document.querySelector("#load").addEventListener('click', async () => {
                                if (state)
                                    try {
                                        await audioWorkletNode.setState(JSON.stringify(state));
                                    } catch (e) {
                                        displayErrorLoadingState();
                                    }
                                else
                                    askForSaveState();
                            });
                        });
                        mediaSource.connect(audioWorkletNode);
                        audioWorkletNode.connect(ctx.destination);
                    });
                });
            });
        });
    }

    function displayErrorLoadingState() {
        if (popupOpened) removePopup();
        popupOpened = 'errorStateLoad';
        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend',
            `<div class="snackbar error popFromBottom">
            Le plugin a échoué à charger son état ou ne permet pas cette fonctionnalité
        </div>`);
        removePopupTimer = setTimeout(removePopup, 5000);
    }

    function askForSaveState() {
        if (popupOpened) removePopup();
        popupOpened = 'warningNoState';
        document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeend',
            `<div class="snackbar warning popFromBottom">
                    Aucun état sauvegardé
            </div>`);
        removePopupTimer = setTimeout(removePopup, 5000);
    }

    function removePopup() {
        if (removePopupTimer) clearTimeout(removePopupTimer);
        document.querySelectorAll('.snackbar').forEach(elem => {
            elem.remove();
        });
        popupOpened = undefined;
    }

    function goToUnitTest() {
        const path = "/unitTestPlugin/" + idPlugin;
        history.push(path);
    }

    return (<>
        {plugin ? <div className="loading"></div> :
            <>
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
                    <Button onClick={goToUnitTest} type="primary" style={{marginTop: '16px'}}
                            icon="play-circle">Lancer les tests techniques</Button>
                </div>
            </>
        }
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
