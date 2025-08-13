import { LOCALES } from '../i18n'

const LanguageReducer = (state = LOCALES.ENGLISH, action) => {
  switch (action.type) {
    case 'TOGGLE_LANGUAGE':
      return state === LOCALES.ENGLISH ? LOCALES.TURKISH : LOCALES.ENGLISH
    default:
      return state
  }
}
export const toggleLanguage = () => {
  return async (dispatch) => {
    dispatch({
      type: 'TOGGLE_LANGUAGE',
    })
  }
}

export default LanguageReducer
