import React from 'react';


const styles = {
    link: {
        border: '1px solid rgb(129, 140, 150)',
        margin: '0 5px'
    },
    word: {
        display: 'inline',
        float: 'left',
        textAlign: 'center',
        padding: '0 5px'
    }
};

export default class LineComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listWord : this.props.word.words
        };
        this.mouseOverCat = this.mouseOverCat.bind(this);
        this.mouseOutCat = this.mouseOutCat.bind(this);
        this.mouseOverNe = this.mouseOverNe.bind(this);
        this.mouseOutNe = this.mouseOutNe.bind(this);
    }

    mouseOverCat(index) {
        this.state.listWord[index].bgColor = this.state.listWord[index].color;
        this.setState({listWord: this.state.listWord});
    }

    mouseOutCat(index) {
        this.state.listWord[index].bgColor = '#ffffff';
        this.setState({listWord: this.state.listWord});
    }

    mouseOverNe() {
        this.state.listWord.map(item => {
            item.bgColor = this.props.word.bgColor;
            return item;
        });

        this.setState({listWord: this.state.listWord});
    }

    mouseOutNe() {
        this.state.listWord.map(item => {
            item.bgColor = '#ffffff';
            return item;
        });
        this.setState({listWord: this.state.listWord});
    }



    render() {
        let renderForm = this.state.listWord.map((item, index) => {
            let color = '';
            if(item.metadata) {
                color = item.metadata.bgColor;
            }else {
                color = '';
            }
            item.color = color;
            let mouseOverCat = this.mouseOverCat.bind(this, index);
            let mouseOutCat = this.mouseOutCat.bind(this, index);
            return (
                <div key={index} style={{width: this.props.word.words.length == 1 ? '100%':'auto', display: 'inline', float: 'left', textAlign: 'center', marginTop: '5px'}}>
                    <div onMouseOver={mouseOverCat}
                         onMouseOut={mouseOutCat}
                         style={{backgroundColor: color, border: '1px solid rgb(129, 140, 150)', borderRadius: '4px', marginRight:'2px'}}>
                        {item.cat}
                    </div>
                    <div style={{backgroundColor: item.bgColor, padding: '0 5px', marginTop: '3px'}}>
                        {item.form}
                    </div>
                </div>
            );
        });
        let renderWord = (
            <div style={{marginRight: '5px'}}>
                <div style={{padding: '5px 0'}}>
                    {(this.props.word.ne
                            ? <div
                            onMouseOver={this.mouseOverNe}
                            onMouseOut={this.mouseOutNe}
                            style={{background: this.props.word.bgColor,border: '1px solid rgb(129, 140, 150)', margin: '2px 5px'}}>{this.props.word.ne}</div>
                            :''
                    )}
                    {(this.props.word.link
                            ? <div style={styles.link}>{this.props.word.link}</div>
                            :''
                    )}
                    {renderForm}
                </div>
            </div>
        );

        return (
            <div style={{display: 'inline', float: 'left', textAlign: 'center'}}>
                {renderWord}
            </div>
        );
    }
}