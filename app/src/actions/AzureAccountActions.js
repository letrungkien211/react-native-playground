import {
    AZURE_ADD_ACCOUNT_UPDATE_PROP,
    AZURE_ADD_ACCOUNT_ADD,
    AZURE_ADD_ACCOUNT_ADD_START,
    AZURE_ADD_ACCOUNT_ADD_ERROR,
    AZURE_ADD_ACCOUNT_ADD_SUCCESS,
    AZURE_ACCOUNTS_FETCH_SUCCESS,
    AZURE_ACCOUNTS_FETCH
} from "./types";

import azure from "react-native-azure-storage";

import firebase from 'firebase'
import { NavigationActions } from "react-navigation";

export const updateProp = ({ prop, value }) => {
    return {
        type: AZURE_ADD_ACCOUNT_UPDATE_PROP,
        payload: { prop, value }
    }
}

export const addAccount = ({ storageAccountName, storageAccessKey, navigation }) => (dispatch) => {
    dispatch({
        type: AZURE_ADD_ACCOUNT_ADD_START
    })
    console.log({ storageAccountName, storageAccessKey})
    
    const blobService = azure.createBlobService(storageAccountName, storageAccessKey)
    blobService.listContainers().then((res) => {
        if (!res) {
            return
        }
        if (res.status == 200) {
            const { currentUser } = firebase.auth()
            firebase.database().ref(`/users/${currentUser.uid}/azurestorage/accounts`)
                .push({ storageAccountName, storageAccessKey })
                .then(() => {
                    dispatch({
                        type: AZURE_ADD_ACCOUNT_ADD,
                        payload: { storageAccountName, storageAccessKey }
                    })
                    // const resetAction = NavigationActions.reset({
                    //     index: 0,
                    //     actions: [
                    //         NavigationActions.navigate({ routeName: 'AzureAccountListScreen' })
                    //     ]
                    // })
                    navigation.goBack()
                })
        }
        else {
            console.error(res)
            dispatch({ type: AZURE_ADD_ACCOUNT_ADD_ERROR, payload: res.data })
        }
    }).catch(error => {
        if (error.code == 'ENOTFOUND')
            dispatch({ type: AZURE_ADD_ACCOUNT_ADD_ERROR, payload: 'Not Exists!' })
        else if (error.response && error.response.status == 403) {
            dispatch({ type: AZURE_ADD_ACCOUNT_ADD_ERROR, payload: 'Unauthorized. The key is not valid!' })
        }
        else {
            dispatch({ type: AZURE_ADD_ACCOUNT_ADD_ERROR, payload: 'Network Error!' })
        }
    })
}

export const accountsFetch = () => {
    const { currentUser } = firebase.auth()

    return dispatch => {
        dispatch({
            type: AZURE_ACCOUNTS_FETCH
        })
        firebase.database().ref(`/users/${currentUser.uid}/azurestorage/accounts`)
            .on('value', snapshot => {
                dispatch({ type: AZURE_ACCOUNTS_FETCH_SUCCESS, payload: snapshot.val() })
            })
    }
}