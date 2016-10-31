import React, {Component, PropTypes} from 'react';
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


class WordBuilder {
    static convertHex(hex, opacity) {
        hex   = hex.replace('#', '');
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b} , ${opacity / 100})`;
    }
}

class JukaiApp extends React.Component {
    constructor(props) {
        super(props);
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
        this.ws              = new WebSocket('ws://jukainlp.hshindo.com');
        this.ws.onopen       = (() => {
            toastr.options.timeOut = 1500;
            toastr.options.closeButton = true;
            toastr.options.positionClass ="toast-bottom-right";
            toastr.success('Connected successfully');
        });
        this.onChange        = this.onChange.bind(this);
        this.onMose          = this.onMose.bind(this);
        this.onCheckMenuTran = this.onCheckMenuTran.bind(this);
        this.onCheckMenuAnal = this.onCheckMenuAnal.bind(this);

        this.ws.onmessage = ((msg) => {
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
                                    form            : sentence.text.substring(item[1], item[2] + 1),
                                    pos             : item[3],
                                    bgColorPos      : ConfigBgColor.getColor(item[3]),
                                    bgColorForm     : WordBuilder.convertHex(ConfigBgColor.getColor(item[3]), 20),
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
        this.setState({chuck: this.state.chuck})
    }

    onChange(newValue) {
        this.setState({editorValue: newValue});
        this.ws.send(JSON.stringify({
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
