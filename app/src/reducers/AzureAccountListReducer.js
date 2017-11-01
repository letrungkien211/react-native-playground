
const INITIAL_STATE = {
    accounts: [],
    isLoading: false
}
import { AZURE_ACCOUNTS_FETCH_SUCCESS, AZURE_ACCOUNTS_FETCH } from "../actions/types";

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
    case AZURE_ACCOUNTS_FETCH_SUCCESS:
        return {...state, accounts: action.payload, isLoading: false}
    case AZURE_ACCOUNTS_FETCH:
        return {...state, isLoading: true}
    default:
        return state
    }
}