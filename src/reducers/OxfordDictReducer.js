
import {
    OXFORD_DICT_SEARCH_ERROR,
    OXFORD_DICT_SEARCH_START,
    OXFORD_DICT_SEARCH_SUCCESS,
    OXFORD_DICT_UPDATE_KEYWORD
} from '../actions/types'

const INITIAL_STATE = {
    keyword: '',
    isSearching: false,
    error: null,
    result: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case OXFORD_DICT_UPDATE_KEYWORD:
        return {...state, keyword: action.payload}
    case OXFORD_DICT_SEARCH_START:
        return {...state, isSearching: true}
    case OXFORD_DICT_SEARCH_SUCCESS:
        return {...state, isSearching: false, result: action.payload}
    case OXFORD_DICT_SEARCH_ERROR:
        return {...state, isSearching: false, result: null, error: action.payload}
    default:
        return state
    }
}