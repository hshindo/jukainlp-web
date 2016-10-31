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
import ConfigBgColor from './../config/ConfigBgColor.js';

injectTapEventPlugin();
var ws       = new WebSocket('ws://jukainlp.hshindo.com');
ws.onmessage = ((msg) => {
    console.log(msg)
});
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
            if (item.metadata) {
                item.bgColor      = WordBuilder.convertHex(item.metadata.bgColor, 20);
                item.cacheBgColor = item.bgColor;
            }
            return item;
        });
        this.words = words;
    }

    getTranslate(lang = Chunk.LANG_EN) {
        if (lang == Chunk.LANG_EN) {
            return {
                ne     : this.ne,
                link   : this.link,
                words  : this.words,
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

    static convertHex(hex, opacity) {
        hex   = hex.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    }
}

class JukaiApp extends React.Component {
    constructor(props) {
        super(props);
        let entityTypes      = {};
        this.state           = {
            chuck: [], editorValue: '', settingDisplay: {
                en      : true,
                ja      : true,
                cn      : true,
                pos     : true,
                ne      : true,
                wikilink: true
            }
        };
        this.onChange        = this.onChange.bind(this);
        this.onMose          = this.onMose.bind(this);
        this.onCheckMenuTran = this.onCheckMenuTran.bind(this);
        this.onCheckMenuAnal = this.onCheckMenuAnal.bind(this);

        ws.onmessage = ((msg) => {
            let data = JSON.parse(msg.data);
            let lst  = [];

            data.map(function (sentence) {
                let word = {
                    text : sentence.text,
                    items: []
                };
                sentence.anno.map(item=> {
                    if (item[0] != 'entity') {
                        let itemWord = {
                            words: [
                                {
                                    form      : sentence.text.substring(item[1], item[2] + 1),
                                    pos       : item[3],
                                    bgColorPos: ConfigBgColor.getColor(item[3]),
                                    bgColorForm: WordBuilder.convertHex(ConfigBgColor.getColor(item[3]), 20),
                                    cacheBgColorForm: WordBuilder.convertHex(ConfigBgColor.getColor(item[3]), 20)
                                }]
                        };
                        word.items.push(itemWord);
                    } else {
                        word.items[word.items.length - 1].ne      = item[3];
                        word.items[word.items.length - 1].bgColor = ConfigBgColor.getColor(item[3]);
                    }

                });
                lst.push(word);
            });
            console.log(lst);
            this.setState({chuck: lst});
        });
    }

    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }

    componentDidMount() {
        event = new CustomEvent("resize");
        window.dispatchEvent(event);
    }

    onMose(list, index) {
        this.state.chuck[index] = list;
        this.setState({chuck: this.state.chuck})
    }

    onChange(newValue) {
        this.setState({editorValue: newValue});
        ws.send(JSON.stringify({
            "text"    : newValue,
            "lang"    : "en",
            "pos"     : true,
            "entity"  : true,
            "trans-ja": true,
            "trans-en": true,
            "trans-cn": true,
        }));
    }

    onCheckMenuTran(item) {

        if (item.type == 'tran_en') {
            this.state.settingDisplay.en = item.checked;
        }
        if (item.type == 'tran_ja') {
            this.state.settingDisplay.ja = item.checked;
        }
        if (item.type == 'tran_cn') {
            this.state.settingDisplay.cn = item.checked;
        }
        this.setState({settingDisplay: this.state.settingDisplay});
    }

    onCheckMenuAnal(item) {
        if (item.type == 'pos') {
            this.state.settingDisplay.pos = item.checked;
        }
        if (item.type == 'ne') {
            this.state.settingDisplay.ne = item.checked;
        }
        if (item.type == 'wikilink') {
            this.state.settingDisplay.wikilink = item.checked;
        }
        this.setState({settingDisplay: this.state.settingDisplay});
    }

    render() {
        let renderLine = this.state.chuck.map((item, index) => {
            return (
                <LineText settingDisplay={this.state.settingDisplay} key={index} index={index} onMose={this.onMose}
                          text={item} enText={this.state.editorValue}/>
            );
        });
        return (
            <div>
                <AppMenuBar onCheckMenuAnal={this.onCheckMenuAnal} onCheckMenuTran={this.onCheckMenuTran}/>
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

export default JukaiApp;
