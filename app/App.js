import React, { Component } from 'react'
import { StyleSheet, Text, View, AsyncStorage, ActivityIndicator } from 'react-native'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from "redux-logger";

import reducers from './src/reducers'
import Router from './src/routers/Router'

import { SIGNIN_SUCCESS } from "./src/actions/types";

import {bmiFetch} from './src/actions/BmiCalculatorActions'

import BmiCalculatorMiddleware from "./src/store/BmiCalculatorMiddleware";

import firebase from 'firebase'
import Expo from 'expo'

import {firebaseConfig} from './src/config'

const middleware = applyMiddleware(ReduxThunk, logger, BmiCalculatorMiddleware)
const store = createStore(reducers, {}, middleware)

export default class App extends React.Component {
    componentWillMount() {
        firebase.initializeApp(firebaseConfig)
    }

    componentDidMount(){
        store.dispatch(bmiFetch())
    }

    render() {
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        )
    }
}
