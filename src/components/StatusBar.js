import React from 'react';
import { connect } from 'react-redux';

class StatusBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="bottomStatusBar">
                <div className="status-left-part">
                    <p>Language</p>
                    <div style={{ padding: '6px 0 0 12px' }}>
                        <span className={ this.props.radioLangVal == "lang_auto" ? 'setting-on' : 'setting-off' }>Auto</span>
                        <span className={ this.props.radioLangVal == "lang_en" ? 'setting-on' : 'setting-off' }>English</span>
                        <span className={ this.props.radioLangVal == "lang_jp" ? 'setting-on' : 'setting-off' }>Japanese</span>
                    </div>
                </div>
                <div className="status-central-part">
                    <p>Analysis</p>
                    <div style={{ padding: '6px 0 0 0' }}>
                        <span className={ this.props.isChecked_POS ? 'setting-on' : 'setting-off' }>POS</span>
                        <span className={ this.props.isChecked_NE ? 'setting-on' : 'setting-off' }>NE</span>
                        <span className={ this.props.isChecked_WikiLink ? 'setting-on' : 'setting-off' }>Wiki-link</span>
                    </div>
                </div>
                <div className="status-right-part">
                    <p>Translation</p>
                    <div style={{ padding: '6px 12px 0 0' }}>
                        <span className={ this.props.isChecked_TransEn ? 'setting-on' : 'setting-off' }>English</span>
                        <span className={ this.props.isChecked_TransJp ? 'setting-on' : 'setting-off' }>Japanese</span>
                        <span className={ this.props.isChecked_TransCn ? 'setting-on' : 'setting-off' }>Chinese</span>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        radioLangVal: state.setting_nlp.radioLangVal,
        isChecked_POS: state.setting_nlp.isChecked_POS,
        isChecked_NE: state.setting_nlp.isChecked_NE,
        isChecked_WikiLink: state.setting_nlp.isChecked_WikiLink,
        isChecked_TransEn: state.setting_nlp.isChecked_TransEn,
        isChecked_TransJp: state.setting_nlp.isChecked_TransJp,
        isChecked_TransCn: state.setting_nlp.isChecked_TransCn
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
    }
}

(StatusBar) = connect(mapStateToProps, mapDispatchToProps)(StatusBar);

export default StatusBar;
