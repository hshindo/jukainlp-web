import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppMenuBar from './AppMenuBar';
import Snackbar from 'material-ui/Snackbar';
import StatusBar from './StatusBar';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class JukaiApp extends React.Component {
    constructor(props) {
        super(props);
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    componentDidMount() {
        event = new CustomEvent("resize");
        window.dispatchEvent(event);
    }

    render() {
        return (
            <div>
                <AppMenuBar />
                <div id="editor"></div>
                <div id="view-wrapper">
                    <div id="view"></div>
                </div>
                <StatusBar />

                <Snackbar
                    open={ this.props.isOpenSnackbar_LangAuto }
                    message="Language Mode: Auto"
                    autoHideDuration={ 3000 }
                    bodyStyle={{ textAlign: 'center' }}
                />
                <input
                    type="text"
                    id="state-lang-auto"
                    value={ this.props.radioLangVal == "lang_auto" }
                    style={{ display: 'none' }}
                    readOnly
                />
                <Snackbar
                    open={ this.props.isOpenSnackbar_LangEn }
                    message="Language Mode: English"
                    autoHideDuration={ 3000 }
                    bodyStyle={{ textAlign: 'center' }}
                />
                <input
                    type="text"
                    id="state-lang-en"
                    value={ this.props.radioLangVal == "lang_en" }
                    style={{ display: 'none' }}
                    readOnly
                />
                <Snackbar
                    open={ this.props.isOpenSnackbar_LangJp }
                    message="Language Mode: Japanese"
                    autoHideDuration={ 3000 }
                    bodyStyle={{ textAlign: 'center' }}
                />
                <input
                    type="text"
                    id="state-lang-jp"
                    value={ this.props.radioLangVal == "lang_jp" }
                    style={{ display: 'none' }}
                    readOnly
                />
                <Snackbar
                    open={ this.props.isOpenSnackbar_AnalPOS }
                    message={ this.props.isChecked_POS == true ? "Analysis Mode: POS - ON" : "Analysis Mode: POS - OFF" }
                    autoHideDuration={ 3000 }
                    bodyStyle={{ textAlign: 'center' }}
                />
                <input
                    type="text"
                    id="state-anal-pos"
                    value={ this.props.isChecked_POS }
                    style={{ display: 'none' }}
                    readOnly
                />
                <Snackbar
                    open={ this.props.isOpenSnackbar_AnalNE }
                    message={ this.props.isChecked_NE == true ? "Analysis Mode: NE - ON" : "Analysis Mode: NE - OFF" }
                    autoHideDuration={ 3000 }
                    bodyStyle={{ textAlign: 'center' }}
                />
                <input
                    type="text"
                    id="state-anal-ne"
                    value={ this.props.isChecked_NE }
                    style={{ display: 'none' }}
                    readOnly
                />
                <Snackbar
                    open={ this.props.isOpenSnackbar_AnalWiki }
                    message={ this.props.isChecked_WikiLink == true ? "Analysis Mode: Wiki-Link - ON" : "Analysis Mode: Wiki-Link - OFF" }
                    autoHideDuration={ 3000 }
                    bodyStyle={{ textAlign: 'center' }}
                />
                <input
                    type="text"
                    id="state-anal-wiki"
                    value={ this.props.isChecked_WikiLink }
                    style={{ display: 'none' }}
                    readOnly
                />
                <Snackbar
                    open={ this.props.isOpenSnackbar_TransEn }
                    message={ this.props.isChecked_TransEn == true ? "Translation Mode: English - ON" : "Translation Mode: English - OFF" }
                    autoHideDuration={ 3000 }
                    bodyStyle={{ textAlign: 'center' }}
                />
                <input
                    type="text"
                    id="state-trans-en"
                    value={ this.props.isChecked_TransEn }
                    style={{ display: 'none' }}
                    readOnly
                />
                <Snackbar
                    open={ this.props.isOpenSnackbar_TransJp }
                    message={ this.props.isChecked_TransJp == true ? "Translation Mode: Japanese - ON" : "Translation Mode: Japanese - OFF" }
                    autoHideDuration={ 3000 }
                    bodyStyle={{ textAlign: 'center' }}
                />
                <input
                    type="text"
                    id="state-trans-jp"
                    value={ this.props.isChecked_TransJp }
                    style={{ display: 'none' }}
                    readOnly
                />
                <Snackbar
                    open={ this.props.isOpenSnackbar_TransCn }
                    message={ this.props.isChecked_TransCn == true ? "Translation Mode: Chinese - ON" : "Translation Mode: Chinese - OFF" }
                    autoHideDuration={ 3000 }
                    bodyStyle={{ textAlign: 'center' }}
                />
                <input
                    type="text"
                    id="state-trans-cn"
                    value={ this.props.isChecked_TransCn }
                    style={{ display: 'none' }}
                    readOnly
                />
            </div>
        );
    }
}

JukaiApp.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

let mapStateToProps = (state) => {
    return {
        radioLangVal:               state.setting_nlp.radioLangVal,
        isOpenSnackbar_LangAuto:    state.setting_nlp.isOpenSnackbar[0],
        isOpenSnackbar_LangEn:      state.setting_nlp.isOpenSnackbar[1],
        isOpenSnackbar_LangJp:      state.setting_nlp.isOpenSnackbar[2],
        isOpenSnackbar_AnalPOS:     state.setting_nlp.isOpenSnackbar[3],
        isChecked_POS:              state.setting_nlp.isChecked_POS,
        isOpenSnackbar_AnalNE:      state.setting_nlp.isOpenSnackbar[4],
        isChecked_NE:               state.setting_nlp.isChecked_NE,
        isOpenSnackbar_AnalWiki:    state.setting_nlp.isOpenSnackbar[5],
        isChecked_WikiLink:         state.setting_nlp.isChecked_WikiLink,
        isOpenSnackbar_TransEn:     state.setting_nlp.isOpenSnackbar[6],
        isChecked_TransEn:          state.setting_nlp.isChecked_TransEn,
        isOpenSnackbar_TransJp:     state.setting_nlp.isOpenSnackbar[7],
        isChecked_TransJp:          state.setting_nlp.isChecked_TransJp,
        isOpenSnackbar_TransCn:     state.setting_nlp.isOpenSnackbar[8],
        isChecked_TransCn:          state.setting_nlp.isChecked_TransCn,
    };
}

(JukaiApp) = connect(mapStateToProps)(JukaiApp);

export default JukaiApp;
