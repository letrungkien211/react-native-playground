
import { AZURE_BLOB_EXPLORER_UPDATE_PROPS } from "../actions/types";
const INITIAL_STATE = {
    storageAccountName: '',
    storageAccessKey: '',
    blobService: null,
    path: '',
    items: []
}

export default (state = INITIAL_STATE, {type, payload}) => {
    switch(type){
        case AZURE_BLOB_EXPLORER_UPDATE_PROPS:
            return {...state, ...payload}
        default:
            return state;
    }
}