
import axios from "axios";
import {
    OXFORD_DICT_SEARCH_SUCCESS,
    OXFORD_DICT_SEARCH_START,
    OXFORD_DICT_SEARCH_ERROR,
    OXFORD_DICT_UPDATE_KEYWORD
} from "./types"
import {oxfordApiConfig} from '../config'

export const search = (text) => (dispatch) => {
    if (text) {
        dispatch({
            type: OXFORD_DICT_SEARCH_START
        })

        const instance = axios.create({
            baseURL: 'https://od-api.oxforddictionaries.com/',
            timeout: 10000,
            headers: {
                app_id: oxfordApiConfig.app_id,
                app_key: oxfordApiConfig.app_key
            }
        })

        instance.get('api/v1/entries/en/' + text)
            .then((response) => {
                dispatch({
                    type: OXFORD_DICT_SEARCH_SUCCESS,
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: OXFORD_DICT_SEARCH_ERROR,
                    payload: error
                })
            });
    }
}

export const updateKeyword = (keyword) => {
    return {
        type: OXFORD_DICT_UPDATE_KEYWORD,
        payload: keyword
    }
}