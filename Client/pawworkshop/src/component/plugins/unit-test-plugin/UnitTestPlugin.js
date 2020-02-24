/* eslint-disable */
import React, {useEffect} from 'react';
import {useParams} from "react-router";
import './UnitTestPlugin.css';
import {BACKEND_ROOT_PATH} from "../../../constants";

export const UnitTestPlugin = () => {
    let {idPlugin} = useParams();
    let plugin = undefined;
    useEffect(() => {
        fetchPlugin(idPlugin).then(pluginRes => {
            plugin = pluginRes;
            loadPluginUnitTest(`${BACKEND_ROOT_PATH}/${pluginRes.path}`, pluginRes.moduleName);
        });
    });
    let state;
    let popupOpened = 'none';
    let removePopupTimer;

    const fetchPlugin = async (id) => {
        const response = await fetch(`${BACKEND_ROOT_PATH}/plugins/${id}`);
        return await response.json();
    };

    function loadPluginUnitTest(pluginUrl, pluginName) {
        loadScriptThen('https://wasabi.i3s.unice.fr/WebAudioPluginBank/polyfills/webcomponents-lite.js', () => {
            loadScriptThen('https://mainline.i3s.unice.fr/WebAudioPluginBank/bower_components/webaudio-controls2/webaudio-controls.js', () => {
                loadScriptThen('https://wasabi.i3s.unice.fr/WebAudioPluginBank/bower_components/mocha/mocha.js', () => {
                    loadScriptThen('https://wasabi.i3s.unice.fr/WebAudioPluginBank/node_modules/chai/chai.js', () => {
                        loadScriptThen(pluginUrl, () => {
                            window.mocha.setup('bdd');
                            const checkbox = document.querySelector('#checkBox');
                            const AudioContext = window.AudioContext || window.webkitAudioContext;
                            const ctx = new AudioContext();
                            const player = document.getElementById("soundSample");
                            const mediaSource = ctx.createMediaElementSource(player);
                            checkMetadata(pluginUrl);

                            player.onplay = () => {
                                ctx.resume().then(() => {
                                    console.log('Playback resumed successfully');
                                });
                            };

                            function checkMetadata(baseURL) {
                                fetch(baseURL + "/main.json").then(responseJSON => {
                                    return responseJSON.json();
                                }).then(metadata => {
                                    let className = metadata.vendor + metadata.name;
                                    loadPlugin(className, baseURL);
                                }).catch((e) => {
                                    console.log(e);
                                });
                            }


                            function scriptExists(url) {
                                return document.querySelectorAll(`script[src="${url}"]`).length > 0;
                            }


                            // add the script tag and load the plugin
                            function loadPlugin(className, baseURL) {
                                let scriptURL = baseURL + "/main.js";

                                if (scriptExists(scriptURL)) {
                                    //script exists
                                    buildPlugin(className, baseURL);
                                    return;
                                }

                                // if we are here this means that the script is not present. Add it to the document
                                let script = document.createElement("script");
                                script.src = scriptURL;

                                script.onload = function () {
                                    // Once the script has been loaded instanciate the plugin
                                    buildPlugin(className, baseURL);
                                };

                                // will be executed before the onload above...
                                document.head.appendChild(script);
                            }

                            // instanciate the plugin
                            function buildPlugin(className, baseURL) {

                                const plugin = new window[className](ctx, baseURL);
                                console.log(plugin);

                                plugin.load().then((node) => {
                                    // if (checkbox.checked) {
                                    // plugin.loadGui().then((elem) => {
                                    //     document.querySelector("#testPlugin").appendChild(elem);
                                    // });
                                    // }
                                    document.body.querySelector("#testPlugin").insertAdjacentHTML('afterbegin', '<h2>' + `Tests de ${className}` + '</h2>');
                                    try {
                                        mediaSource.connect(node);
                                    } catch (error) {
                                        console.log("this plugin does not use audioworkletnode or compositenode");
                                        mediaSource.connect(node.getInput(0));
                                    }
                                    // if (node instanceof AudioWorkletNode)
                                    // else mediaSource.connect(node.getInput(0));
                                    node.connect(ctx.destination);

                                    testPlugin(node);
                                });

                            }


                            /*
                            here we use mocha chai.js to apply unit test on the plugin. The test cases cover the existence and (soon) the type of the API calls.
                            */
                            function testPlugin(param) {
                                const expect = window.chai.expect;
                                const assert = window.chai.assert;
                                let plugin = param;
                                describe('Metadata', function () {
                                    it('plugin should have a JSON getMetadata() method', function () {
                                        expect(plugin.getMetadata()).to.exist;
                                    });
                                    it('the getMetadata() function should return a json object', function () {
                                        plugin.getMetadata().then((res) => {
                                            expect(res).to.not.be.empty
                                        });
                                    });
                                });

                                describe('Descriptor', function () {
                                    it('plugin should have a JSON getDescriptor() method', function () {
                                        expect(plugin.getDescriptor()).to.exist;
                                    });
                                    it('getDescriptor() function should return a json object', function () {
                                        expect(plugin.getDescriptor()).to.not.be.empty;
                                    });
                                });

                                describe('Param getter', function () {
                                    it('plugin should have a getParam(key) method', function () {
                                        expect(plugin).to.have.property("getParam")
                                    });
                                });


                                describe('Param setter', function () {
                                    it('plugin should have a setParam(key,value) method', function () {
                                        expect(plugin).to.have.property("setParam");
                                    });
                                });

                                describe('State getter', function () {
                                    it('plugin should have a getState() method', function () {
                                        expect(plugin).to.have.property("setPatch");
                                    });
                                });


                                describe('State setter', function () {
                                    it('plugin should have a setState(value) method', function () {
                                        expect(plugin).to.have.property("setState");
                                    });
                                });

                                describe('midi enable', function () {
                                    it('plugin should have a onMidi(msg) method', function () {
                                        expect(plugin).to.have.property("onMidi");
                                    });
                                });

                                describe('Input Channel Number', function () {
                                    it('plugin should have an inputChannelCount() method', function () {
                                        expect(plugin.inputChannelCount()).to.exist;
                                    });
                                });

                                describe('Number of inputs', function () {
                                    it('plugin should have an numberOfInputs() method', function () {
                                        expect(plugin.numberOfInputs).to.exist;

                                    });
                                });
                                describe('Number of outputs', function () {
                                    it('plugin should have an numberOfOutputs() method', function () {
                                        expect(plugin.numberOfOutputs).to.exist;
                                    });
                                });
                                window.mocha.run();
                            }
                        });
                    });
                });
            });
        });
    }

    return (<>
        {plugin ? <div className="loading"/> :
            <div className={"unitTests"}>
                <audio
                    crossOrigin="anonymous"
                    src="https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/freeverbMichelBuffa/CleanGuitarRiff.mp3"
                    id="soundSample" loop/>
                <div id={"testPlugin"}/>
                <div id={"mocha"}/>
                <div id={"tests"}/>
            </div>
        }
    </>);
};

UnitTestPlugin.propTypes = {};

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

export default UnitTestPlugin;
