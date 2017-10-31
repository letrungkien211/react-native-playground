
import {combineReducers} from 'redux'

import BmiCalculatorReducer from './BmiCalculatorReducer'
import SignInReducer from './SignInReducer'
import OxfordDictReducer from "./OxfordDictReducer"

export default combineReducers({
    bmiForm: BmiCalculatorReducer,
    signInForm: SignInReducer,
    googleTranslateForm: OxfordDictReducer
})