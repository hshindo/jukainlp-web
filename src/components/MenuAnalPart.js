import React from 'react';
import { connect } from 'react-redux';
import { selAnalPos, selAnalNe, selAnalWiki } from '../actions';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';

const styles = {
    subHeaderItem : {
        cursor: 'pointer',
    },
};

class MenuAnalPart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <MenuItem className="menu-item" disabled={ true } style={ styles.subHeaderItem }>
                    <Subheader>Analysis</Subheader>
                </MenuItem>
                <MenuItem className="menu-item">
                    <List>
                        <ListItem
                            primaryText="POS"
                            leftCheckbox={
                                <Checkbox
                                    id="chk-anal-pos"
                                    onCheck={ this.props.onSelAnalPos }
                                    checked={ this.props.isChecked_POS }
                                    iconStyle={{ fill: '#58a7d2' }}
                                />
                            }
                        />
                    </List>
                </MenuItem>
                <MenuItem className="menu-item">
                    <List>
                        <ListItem
                            primaryText="NE"
                            leftCheckbox={
                                <Checkbox
                                    id="chk-anal-ne"
                                    onCheck={ this.props.onSelAnalNe }
                                    checked={ this.props.isChecked_NE }
                                    iconStyle={{ fill: '#58a7d2' }}
                                />
                            }
                        />
                    </List>
                </MenuItem>
                <MenuItem className="menu-item">
                    <List>
                        <ListItem
                            primaryText="Wiki-link"
                            leftCheckbox={
                                <Checkbox
                                    id="chk-anal-wiki"
                                    onCheck={ this.props.onSelAnalWiki }
                                    checked={ this.props.isChecked_WikiLink }
                                    iconStyle={{ fill: '#58a7d2' }}
                                />
                            }
                        />
                    </List>
                </MenuItem>

            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        isChecked_POS: state.setting_nlp.isChecked_POS,
        isChecked_NE: state.setting_nlp.isChecked_NE,
        isChecked_WikiLink: state.setting_nlp.isChecked_WikiLink
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSelAnalPos: () => {
            dispatch(selAnalPos());
            let editor = ace.edit("editor");
            let tmp = editor.getSession().getValue();
            editor.getSession().setValue(tmp);
        },
        onSelAnalNe: () => {
            dispatch(selAnalNe());
            let editor = ace.edit("editor");
            let tmp = editor.getSession().getValue();
            editor.getSession().setValue(tmp);
        },
        onSelAnalWiki: () => {
            dispatch(selAnalWiki());
            let editor = ace.edit("editor");
            let tmp = editor.getSession().getValue();
            editor.getSession().setValue(tmp);
        },
    }
}

MenuAnalPart = connect(mapStateToProps, mapDispatchToProps)(MenuAnalPart);

export default MenuAnalPart;
