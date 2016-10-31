import React from 'react';


export default class LineComponent extends React.Component {
    constructor(props) {
        super(props);
        this.mouseOverCat = this.mouseOverCat.bind(this);
        this.mouseOutCat  = this.mouseOutCat.bind(this);
        this.mouseOverNe  = this.mouseOverNe.bind(this);
        this.mouseOutNe   = this.mouseOutNe.bind(this);
    }

    mouseOverCat(index) {
        this.props.word.words[index].bgColorForm = this.props.word.words[index].bgColorPos;
        this.props.onMose(this.props.word, this.props.index);
    }

    mouseOutCat(index) {
        this.props.word.words[index].bgColorForm = this.props.word.words[index].cacheBgColorForm;
        this.props.onMose(this.props.word, this.props.index);
    }

    mouseOverNe() {
        this.props.word.words.map(item => {
            item.bgColorForm = this.props.word.bgColor;
            return item;
        });

        this.props.onMose(this.props.word, this.props.index);
    }

    mouseOutNe() {
        this.props.word.words.map(item => {
            item.bgColorForm = item.cacheBgColorForm;
            return item;
        });
        this.props.onMose(this.props.word, this.props.index);
    }

    render() {
        let renderForm = this.props.word.words.map((item, index) => {
            let mouseOverCat = this.mouseOverCat.bind(this, index);
            let mouseOutCat  = this.mouseOutCat.bind(this, index);
            return (
                <div key={index} style={{width: this.props.word.words.length == 1 ? '100%':'auto'}}
                     className="item-cat">
                    {(this.props.settingDisplay.pos) ? <div onMouseOver={mouseOverCat}
                                                            onMouseOut={mouseOutCat}
                                                            style={{backgroundColor: item.bgColorPos}}
                                                            className="cat cursor-pointer">
                        {item.pos}
                    </div>
                        : ''}
                    <div className="form" style={{backgroundColor: item.bgColorForm}}>
                        {item.form}
                    </div>
                </div>
            );
        });
        let renderWord = (
            <div className="padding-word-wrapper">
                <div className="padding-word">
                    {(this.props.word.ne && this.props.settingDisplay.ne
                            ? <div
                            onMouseOver={this.mouseOverNe}
                            onMouseOut={this.mouseOutNe}
                            style={{background: this.props.word.bgColor}}
                            className="word-ne cursor-pointer">{this.props.word.ne}</div>
                            : ''
                    )}
                    {(this.props.word.link && this.props.settingDisplay.wikilink
                            ? <div className="cursor-pointer word-link">{this.props.word.link}</div>
                            : ''
                    )}
                    {renderForm}
                </div>
            </div>
        );

        return (
            <div className="word">
                {renderWord}
            </div>
        );
    }
}