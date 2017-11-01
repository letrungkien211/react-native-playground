
import {combineReducers} from 'redux'

import BmiCalculatorReducer from './BmiCalculatorReducer'
import SignInReducer from './SignInReducer'
import OxfordDictReducer from "./OxfordDictReducer"
import AzureAccountListReducer from './AzureAccountListReducer'
import AzureAddAccountReducer from "./AzureAddAccountReducer";
import AzureBlobExplorerReducer from "./AzureBlobExplorerReducer";

export default combineReducers({
    bmiForm: BmiCalculatorReducer,
    signInForm: SignInReducer,
    googleTranslateForm: OxfordDictReducer,
    azureAccountList: AzureAccountListReducer,
    azureAddAccountForm: AzureAddAccountReducer,
    azureBlobExplorer: AzureBlobExplorerReducer
})