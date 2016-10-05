export const CHOOSE_LANG_AUTO = 'CHOOSE_LANG_AUTO';
export const CHOOSE_LANG_EN = 'CHOOSE_LANG_EN';
export const CHOOSE_LANG_JP = 'CHOOSE_LANG_JP';

export const SEL_ANAL_POS = 'SEL_ANAL_POS';
export const SEL_ANAL_NE = 'SEL_ANAL_NE';
export const SEL_ANAL_WIKI = 'SEL_ANAL_WIKI';

export const SEL_TRANS_EN = 'SEL_TRANS_EN';
export const SEL_TRANS_JP = 'SEL_TRANS_JP';
export const SEL_TRANS_CN = 'SEL_TRANS_CN';


export function chooseLangAuto() {
    return {
        type: CHOOSE_LANG_AUTO,
    };
}
export function chooseLangEn() {
    return {
        type: CHOOSE_LANG_EN,
    };
}
export function chooseLangJp() {
    return {
        type: CHOOSE_LANG_JP,
    };
}

export function selAnalPos() {
    return {
        type: SEL_ANAL_POS,
    };
}
export function selAnalNe() {
    return {
        type: SEL_ANAL_NE,
    };
}
export function selAnalWiki() {
    return {
        type: SEL_ANAL_WIKI,
    };
}

export function selTransEn() {
    return {
        type: SEL_TRANS_EN,
    };
}
export function selTransJp() {
    return {
        type: SEL_TRANS_JP,
    };
}
export function selTransCn() {
    return {
        type: SEL_TRANS_CN,
    };
}
