import {LOCALES } from '../i18n'

const LanguageReducer = (state = LOCALES.ENGLISH, action) => {
    switch (action.type){
        case 'TOGGLE_LANGUAGE':
            return state === LOCALES.ENGLISH ? LOCALES.TURKISH : LOCALES.ENGLISH
        default:
            return state
    }
}
export const toggleLanguage = (lang) => {
    return async dispatch => {
        const language = lang === 'EN' ? LOCALES.ENGLISH : LOCALES.TURKISH
        dispatch ({
            type: 'TOGGLE_LANGUAGE',
            data: language
        })
    }
}

export default LanguageReducer