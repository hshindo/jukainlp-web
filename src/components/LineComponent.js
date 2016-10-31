import React from 'react';
import Word from './WordComponent';

const styles = {
    item: {
        display: 'inline',
        float: 'left',
        textAlign: 'center'
    }
};

export default class LineComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onMose = this.onMose.bind(this);
    }


    onMose(item, index) {
        this.props.text[index] =  item;
        this.props.onMose(this.props.text, this.props.index);
    }

    render() {
        let list = this.props.text.items || [];
        let renderWord = list.map((item, index) => {
            return (
                <Word onMose={this.onMose} settingDisplay={this.props.settingDisplay} key={index} index={index} word={item}/>
            );
        });
        return (
            <div className="item-translate">
                <div style={{alignItems: 'flex-end', display: 'flex'}}>
                    <div className="item-count text-right padding-top-bottom">
                        {this.props.index + 1}
                    </div>
                    <div className="border-left text-result padding-top-bottom">
                        <div className="line-word">
                            {renderWord}
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                {(this.props.settingDisplay.en
                    ? <div>
                        <div className="text-right item-count padding-top-bottom">EN</div>
                        <div className="col-xs-10 text-result border-left padding-top-bottom"> {this.props.text.text}</div>
                        <div className="clearfix"></div>
                    </div>:''
                )}

                {(this.props.settingDisplay.ja
                        ? <div>
                        <div className="text-right item-count padding-top-bottom">JP</div>
                        <div className="border-left text-result padding-top-bottom">こんにちは。お世話になります</div>
                        <div className="clearfix"></div>
                    </div>:''
                )}

                {(this.props.settingDisplay.cn
                        ? <div>
                        <div className="text-right item-count padding-top-bottom">CN</div>
                        <div className="border-left text-result padding-top-bottom">你好。最近你身体怎么样？</div>
                        <div className="clearfix"></div>
                    </div>:''
                )}
            </div>);
    }
}