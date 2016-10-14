import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppMenuBar from './AppMenuBar';
import LineText from './LineComponent';

import AceEditor from 'react-ace';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'brace/mode/markdown';
import 'brace/theme/github';

injectTapEventPlugin();
var ws = new WebSocket('ws://jukainlp.hshindo.com');

class Chunk {

    constructor() {
    }

    setNe(ne) {
        this.ne = ne;
    }

    setBgColorNe(bgColor) {
        this.bgColor = bgColor;
    }

    setLink(link) {
        this.link = link;
    }

    setWords(words) {
        words.map(item => {
            if(item.metadata) {
                item.bgColor = WordBuilder.convertHex(item.metadata.bgColor, 20);
                item.cacheBgColor = item.bgColor;
            }
            return item;
        });
        this.words = words;
    }

    getTranslate(lang = Chunk.LANG_EN) {
        if(lang == Chunk.LANG_EN) {
            return {
                ne: this.ne,
                link: this.link,
                words: this.words,
                bgColor: this.bgColor
            }
        }
    }

    static get LANG_EN() {
        return 'en';
    }

    static get LANG_JA() {
        return 'ja';
    }

    static get LANG_CN() {
        return 'cn';
    }
}

class WordBuilder {
    
    static build(raw) {
        var list = [];
        raw.forEach(function (item) {
            let newItem = new Chunk();
            newItem.setBgColorNe(item.itemNe.bgColor);
            newItem.setNe(item.ne[0]);
            newItem.setLink(item.link[0]);
            if (item.link.length) {
                newItem.setWords(raw.splice(raw.indexOf(item), item.link.length));
            } else if (item.ne.length) {
                newItem.setWords(raw.splice(raw.indexOf(item), item.ne.length));
            } else {
                let lst = [];
                lst.push(item);
                newItem.setWords(lst);
            }
            list.push(newItem.getTranslate());
        });
        return list;
    }
    static convertHex(hex,opacity){
        hex = hex.replace('#','');
        let r = parseInt(hex.substring(0,2), 16);
        let g = parseInt(hex.substring(2,4), 16);
        let b = parseInt(hex.substring(4,6), 16);

        return 'rgba('+r+','+g+','+b+','+opacity/100+')';
    }
}

class JukaiApp extends React.Component {
    constructor(props) {
        super(props);
        let entityTypes = {};
        this.state = {chuck: [], editorValue: '', settingDisplay: {
            en: true,
            ja: true,
            cn: true,
            pos: true,
            ne: true,
            wikilink: true
        }};
        this.onChange = this.onChange.bind(this);
        this.onMose = this.onMose.bind(this);
        this.onCheckMenuTran = this.onCheckMenuTran.bind(this);
        this.onCheckMenuAnal = this.onCheckMenuAnal.bind(this);

        ws.onmessage = ((msg) => {
            let data = JSON.parse(msg.data);

            if(data['entity_types']) {
                return data['entity_types'].forEach( type => {
                    entityTypes[type.type] = type;
                });
            }
            let lst = [];
            if (data[0]) {
                data.map(item=> {
                    let text = '';
                    let words = item.map( word => {
                        text += word.form + '\n';
                        word.metadata = entityTypes[word.cat];
                        if(word.ne.length) {
                            word.itemNe = entityTypes[word.ne[0]];
                        }else {
                            word.itemNe = {};
                        }
                        return word;
                    });
                    let list = WordBuilder.build(words);
                    lst.push({
                        list: list,
                        text: text
                    });
                });
            }
            this.setState({chuck : lst});
        });
    }
    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }

    componentDidMount() {
        event = new CustomEvent("resize");
        window.dispatchEvent(event);
    }

    onMose (list,index) {
        this.state.chuck[index] = list;
        this.setState({chuck: this.state.chuck})
    }

    onChange(newValue) {
        this.setState({editorValue: newValue});
        ws.send(newValue);
    }

    onCheckMenuTran(item) {

        if(item.type =='tran_en') {
            this.state.settingDisplay.en = item.checked;
        }
        if(item.type =='tran_ja') {
            this.state.settingDisplay.ja = item.checked;
        }
        if(item.type =='tran_cn') {
            this.state.settingDisplay.cn = item.checked;
        }
        this.setState({settingDisplay : this.state.settingDisplay});
    }

    onCheckMenuAnal(item) {
        if(item.type =='pos') {
            this.state.settingDisplay.pos = item.checked;
        }
        if(item.type =='ne') {
            this.state.settingDisplay.ne = item.checked;
        }
        if(item.type =='wikilink') {
            this.state.settingDisplay.wikilink = item.checked;
        }
        this.setState({settingDisplay : this.state.settingDisplay});
    }

    render() {
        let renderLine = this.state.chuck.map((item,index) =>{
           return (
               <LineText settingDisplay={this.state.settingDisplay} key={index} index={index} onMose={this.onMose} text={item} enText={this.state.editorValue}/>
           );
        });
        return (
            <div>
                <AppMenuBar onCheckMenuAnal={this.onCheckMenuAnal} onCheckMenuTran={this.onCheckMenuTran} />
                <div className="ace-editor-wrapper">
                    <div className="col-sm-6" style={{paddingLeft: 0}}>
                            <AceEditor
                                width="100%"
                                className="ace-editor"
                                showPrintMargin={false}
                                fontSize={18}
                                value={this.state.editorValue}
                                mode="markdown"
                                theme="github"
                                onChange={this.onChange}
                                name="UNIQUE_ID_OF_DIV"
                                editorProps={{$blockScrolling: true}}
                            />
                    </div>
                    <div className="col-sm-6 line">
                        {renderLine}
                    </div>
                </div>
            </div>
        );
    }
}

JukaiApp.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

let mapStateToProps = (state) => {
    return {
        radioLangVal           : state.setting_nlp.radioLangVal,
        isOpenSnackbar_LangAuto: state.setting_nlp.isOpenSnackbar[0],
        isOpenSnackbar_LangEn  : state.setting_nlp.isOpenSnackbar[1],
        isOpenSnackbar_LangJp  : state.setting_nlp.isOpenSnackbar[2],
        isOpenSnackbar_AnalPOS : state.setting_nlp.isOpenSnackbar[3],
        isChecked_POS          : state.setting_nlp.isChecked_POS,
        isOpenSnackbar_AnalNE  : state.setting_nlp.isOpenSnackbar[4],
        isChecked_NE           : state.setting_nlp.isChecked_NE,
        isOpenSnackbar_AnalWiki: state.setting_nlp.isOpenSnackbar[5],
        isChecked_WikiLink     : state.setting_nlp.isChecked_WikiLink,
        isOpenSnackbar_TransEn : state.setting_nlp.isOpenSnackbar[6],
        isChecked_TransEn      : state.setting_nlp.isChecked_TransEn,
        isOpenSnackbar_TransJp : state.setting_nlp.isOpenSnackbar[7],
        isChecked_TransJp      : state.setting_nlp.isChecked_TransJp,
        isOpenSnackbar_TransCn : state.setting_nlp.isOpenSnackbar[8],
        isChecked_TransCn      : state.setting_nlp.isChecked_TransCn,
    };
}

(JukaiApp) = connect(mapStateToProps)(JukaiApp);

export default JukaiApp;
