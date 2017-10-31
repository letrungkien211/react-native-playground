
import { SIGNIN_START, SIGNIN_SUCCESS, SIGNIN_FAIL, SIGNOUT_SUCCESS, SIGNOUT_FAIL, SIGNOUT_START } from "./types";
import firebase from 'firebase'
import Expo from 'expo'
import { AsyncStorage } from "react-native";

const SIGNIN_TOKEN_KEY = 'SIGNIN_TOKEN_KEY'

import { facebookConfig } from "../appconfig";

export const signIn = (provider, isUseStoredToken) => async (dispatch) => {
    dispatch({
        type: SIGNIN_START
    })
    switch (provider) {
        default: {
            let token = null;
            try {

                if (isUseStoredToken) {
                    token = await AsyncStorage.getItem(SIGNIN_TOKEN_KEY);
                }
                else {
                    const ret = await Expo.Facebook.logInWithReadPermissionsAsync(
                        facebookConfig.app_id,
                        {
                            permissions: ['public_profile'],
                            behavior: 'native'
                        }
                    );

                    if (ret.type === 'success') {
                        token = ret.token;
                    }
                }
            }
            catch (error) {
                console.log('Failed to login!', error)
                dispatch({
                    type: SIGNIN_FAIL,
                    payload: error
                })
            }


            if (token) {
                const credential = firebase.auth.FacebookAuthProvider.credential(token);

                firebase.auth().signInWithCredential(credential).then((user) => {
                    AsyncStorage.setItem(SIGNIN_TOKEN_KEY, token)
                    dispatch({
                        type: SIGNIN_SUCCESS,
                        payload: user
                    })
                }).catch((error) => {
                    dispatch({
                        type: SIGNIN_FAIL,
                        payload: isUseStoredToken ? '' : error
                    })
                });
            }
            else {
                dispatch({
                    type: SIGNIN_FAIL,
                    payload: 'Failed to acquire sign-in token!'
                })
            }
        }
    }
}

export const signOut = () => (dispatch) => {
    dispatch({
        type: SIGNOUT_START
    })
    firebase.auth().signOut().then(() => {
        AsyncStorage.removeItem(SIGNIN_TOKEN_KEY)
        dispatch({
            type: SIGNOUT_SUCCESS
        })
    }).catch((error) => {
        dispatch({
            type: SIGNOUT_FAIL
        })
    })
}