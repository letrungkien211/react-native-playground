import { AZURE_ADD_ACCOUNT_UPDATE_PROP, AZURE_ADD_ACCOUNT_ADD_ERROR } from "../actions/types"

const INITIAL_STATE = {
    storageAccountName: '',
    storageAccessKey: '',
    error: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case AZURE_ADD_ACCOUNT_UPDATE_PROP: {
        return { ...state, [action.payload.prop]: action.payload.value }
    }
    case AZURE_ADD_ACCOUNT_ADD_ERROR: {
        return {...state, error: action.payload}
    }
    default:
        return state
    }
}

