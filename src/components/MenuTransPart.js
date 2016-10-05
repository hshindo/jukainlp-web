import React from 'react';
import { connect } from 'react-redux';
import { selTransEn, selTransJp, selTransCn } from '../actions';
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

class MenuTransPart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <MenuItem className="menu-item" disabled={ true } style={ styles.subHeaderItem }>
                    <Subheader>Translation</Subheader>
                </MenuItem>
                <MenuItem className="menu-item">
                    <List>
                        <ListItem
                            primaryText="English"
                            leftCheckbox={
                                <Checkbox
                                    onCheck={ this.props.onSelTransEn }
                                    checked={ this.props.isChecked_TransEn }
                                    iconStyle={{ fill: '#58a7d2' }}
                                />
                            }
                        />
                    </List>
                </MenuItem>
                <MenuItem className="menu-item">
                    <List>
                        <ListItem
                            primaryText="Japanese"
                            leftCheckbox={
                                <Checkbox
                                    onCheck={ this.props.onSelTransJp }
                                    checked={ this.props.isChecked_TransJp }
                                    iconStyle={{ fill: '#58a7d2' }}
                                />
                            }
                        />
                    </List>
                </MenuItem>
                <MenuItem className="menu-item">
                    <List>
                        <ListItem
                            primaryText="Chinese"
                            leftCheckbox={
                                <Checkbox
                                    onCheck={ this.props.onSelTransCn }
                                    checked={ this.props.isChecked_TransCn }
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
        isChecked_TransEn: state.setting_nlp.isChecked_TransEn,
        isChecked_TransJp: state.setting_nlp.isChecked_TransJp,
        isChecked_TransCn: state.setting_nlp.isChecked_TransCn
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSelTransEn: () => {
            dispatch(selTransEn());
            let editor = ace.edit("editor");
            let tmp = editor.getSession().getValue();
            editor.getSession().setValue(tmp);
        },
        onSelTransJp: () => {
            dispatch(selTransJp());
            let editor = ace.edit("editor");
            let tmp = editor.getSession().getValue();
            editor.getSession().setValue(tmp);
        },
        onSelTransCn: () => {
            dispatch(selTransCn());
            let editor = ace.edit("editor");
            let tmp = editor.getSession().getValue();
            editor.getSession().setValue(tmp);
        }
    }
}

MenuTransPart = connect(mapStateToProps, mapDispatchToProps)(MenuTransPart);

export default MenuTransPart;
