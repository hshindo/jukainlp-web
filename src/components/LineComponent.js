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
        let text = this.props.text || [];
        let renderWord = text.map((item, index) => {
            return (
                <Word onMose={this.onMose} key={index} index={index} word={item}/>
            );
        });
        return (
            <div className="item-translate">
                <div style={{alignItems: 'flex-end', display: 'flex'}}>
                    <div className="col-xs-1 text-right">
                        {this.props.index + 1}
                    </div>
                    <div className="col-xs-11">
                        <div className="line-word">
                            {renderWord}
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                <div className="col-xs-1 text-right">
                    EN
                </div>
                <div className="col-xs-11">
                    {this.props.enText}
                </div>
                <div className="clearfix"></div>
                <div className="col-xs-1 text-right">
                    JP
                </div>
                <div className="col-xs-11">
                    こんにちは。お世話になります。
                </div>
                <div className="clearfix"></div>
                <div className="col-xs-1 text-right">
                    CN
                </div>
                <div className="col-xs-11">
                    你好。最近你身体怎么样？
                </div>
                <div className="clearfix"></div>
            </div>);
    }
}