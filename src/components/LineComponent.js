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
    }
    render() {
        let text = this.props.text || [];
        console.log(text);
        let renderWord = text.map((item, index) => {
            return (
                <Word key={index} word={item}/>
            );
        });
        return (
            <div>
                <div style={{display: 'flex', alignItems: 'flex-end'}}>
                    {renderWord}
                </div>
                <div>
                    {this.props.enText}
                </div>
                <div>
                    こんにちは。お世話になります。
                </div>
                <div>
                    你好。最近你身体怎么样？
                </div>
            </div>);
    }
}