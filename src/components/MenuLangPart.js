import React from 'react';
import { connect } from 'react-redux';
import { chooseLangAuto, chooseLangEn, chooseLangJp } from '../actions';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import ToggleRadioButtonChecked from 'material-ui/svg-icons/toggle/radio-button-checked';
import ToggleRadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';

const styles = {
    subHeaderItem : {
        cursor: 'pointer',
    },
};

class MenuLangPart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <MenuItem className="menu-item" disabled={ true } style={ styles.subHeaderItem }>
                    <Subheader>Language</Subheader>
                </MenuItem>
                <MenuItem className="menu-item">
                    <List>
                        <ListItem
                            primaryText="Auto"
                            leftCheckbox={
                                <Checkbox
                                    value="lang_auto"
                                    onCheck={ this.props.onChooseLangAuto }
                                    checked={ this.props.radioLangVal == "lang_auto" }
                                    checkedIcon={ <ToggleRadioButtonChecked /> }
                                    uncheckedIcon={ <ToggleRadioButtonUnchecked /> }
                                    iconStyle={{ fill: '#58a7d2' }}
                                />
                            }
                        />
                    </List>
                </MenuItem>
                <MenuItem className="menu-item">
                    <List>
                        <ListItem
                            primaryText="English"
                            leftCheckbox={
                                <Checkbox
                                    value="lang_en"
                                    onCheck={ this.props.onChooseLangEn }
                                    checked={ this.props.radioLangVal == "lang_en" }
                                    checkedIcon={ <ToggleRadioButtonChecked /> }
                                    uncheckedIcon={ <ToggleRadioButtonUnchecked /> }
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
                                    value="lang_jp"
                                    onCheck={ this.props.onChooseLangJp }
                                    checked={ this.props.radioLangVal == "lang_jp" }
                                    checkedIcon={ <ToggleRadioButtonChecked /> }
                                    uncheckedIcon={ <ToggleRadioButtonUnchecked /> }
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
        radioLangVal: state.setting_nlp.radioLangVal
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onChooseLangAuto: () => {
            dispatch(chooseLangAuto());
        },
        onChooseLangEn: () => {
            dispatch(chooseLangEn());
        },
        onChooseLangJp: () => {
            dispatch(chooseLangJp());
        },
    }
}

MenuLangPart = connect(mapStateToProps, mapDispatchToProps)(MenuLangPart);

export default MenuLangPart;
