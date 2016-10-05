import {
        CHOOSE_LANG_AUTO,
        CHOOSE_LANG_EN,
        CHOOSE_LANG_JP,

        SEL_ANAL_POS,
        SEL_ANAL_NE,
        SEL_ANAL_WIKI,

        SEL_TRANS_EN,
        SEL_TRANS_JP,
        SEL_TRANS_CN
    } from '../actions';
import { combineReducers } from 'redux';

const settingInitState = {
    radioLangVal:       "lang_auto",
    
    isChecked_POS:      true,
    isChecked_NE:       true,
    isChecked_WikiLink: true,

    isChecked_TransEn:  true,
    isChecked_TransJp:  true,
    isChecked_TransCn:  true,

    isOpenSnackbar: [ false, false, false, false, false, false, false, false, false ],
};

const setting_nlp = ( state = settingInitState, action ) => {
    switch (action.type) {
        case CHOOSE_LANG_AUTO:
            return Object.assign({}, state, {
                radioLangVal: "lang_auto",
                isOpenSnackbar: [ true, false, false, false, false, false, false, false, false ],
            });
        case CHOOSE_LANG_EN:
            return Object.assign({}, state, {
                radioLangVal: "lang_en",
                isOpenSnackbar: [ false, true, false, false, false, false, false, false, false ],
            });
        case CHOOSE_LANG_JP:
            return Object.assign({}, state, {
                radioLangVal: "lang_jp",
                isOpenSnackbar: [ false, false, true, false, false, false, false, false, false ],
            });

        case SEL_ANAL_POS:
            return Object.assign({}, state, {
                isChecked_POS: !state.isChecked_POS,
                isOpenSnackbar: [ false, false, false, true, false, false, false, false, false ],
            });
        case SEL_ANAL_NE:
            return Object.assign({}, state, {
                isChecked_NE: !state.isChecked_NE,
                isOpenSnackbar: [ false, false, false, false, true, false, false, false, false ],
            });
        case SEL_ANAL_WIKI:
            return Object.assign({}, state, {
                isChecked_WikiLink: !state.isChecked_WikiLink,
                isOpenSnackbar: [ false, false, false, false, false, true, false, false, false ],
            });

        case SEL_TRANS_EN:
            return Object.assign({}, state, {
                isChecked_TransEn: !state.isChecked_TransEn,
                isOpenSnackbar: [ false, false, false, false, false, false, true, false, false ],
            });
        case SEL_TRANS_JP:
            return Object.assign({}, state, {
                isChecked_TransJp: !state.isChecked_TransJp,
                isOpenSnackbar: [ false, false, false, false, false, false, false, true, false ],
            });
        case SEL_TRANS_CN:
            return Object.assign({}, state, {
                isChecked_TransCn: !state.isChecked_TransCn,
                isOpenSnackbar: [ false, false, false, false, false, false, false, false, true ],
            });
        
        default:
            return state;
    }
};

const extra = ( state = {}, action ) => {
    switch (action.type) {
        default:
            return state;
    }
};

const settingNLP = combineReducers({
    setting_nlp,
    extra
});

export default settingNLP;
