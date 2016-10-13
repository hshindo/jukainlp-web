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
        this.state = {colorForm: '#ffffff'};
        this.mouseOverCat = this.mouseOverCat.bind(this);
        this.mouseOutCat = this.mouseOutCat.bind(this);
        this.mouseOverNe = this.mouseOverNe.bind(this);
        this.mouseOutNe = this.mouseOutNe.bind(this);
    }

    mouseOverCat() {
        this.setState({colorForm: this.props.word.catBgColor});
    }

    mouseOutCat() {
        this.setState({colorForm: '#ffffff'});
    }

    mouseOverNe() {
        this.setState({colorForm: this.props.word.neBgColor});
    }

    mouseOutNe() {
        this.setState({colorForm: '#ffffff'});
    }



    render() {
        let renderForm = this.props.word.words.map((item, index) => {
            console.log(item.metadata.bgColor);
            return (
                <div key={index} style={styles.word}>
                    <div style={{backgroundColor: item.metadata.bgColor, padding: '0 5px', border: '1px solid rgb(129, 140, 150)', borderRadius: '4px'}}>
                        {item.cat}
                    </div>
                    <div>
                        {item.form}
                    </div>
                </div>
            );
        });

        let renderWord = (
            <div style={{marginRight: '5px'}}>
                <div style={{padding: '5px 0'}}>
                    {(this.props.word.ne
                            ? <div style={styles.link}>{this.props.word.ne}</div>
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