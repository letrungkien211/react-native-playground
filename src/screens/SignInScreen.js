import React, { Component } from 'react'
import { connect } from "react-redux"
import { View } from "react-native"

import { SocialIcon } from 'react-native-elements'

import {NavigationActions} from 'react-navigation'

import { signIn } from "../actions/SignInActions"

import {Spinner} from '../components/common'

import firebase from "firebase"
import Expo from 'expo'

const Screen = ({ signIn, isLoading }) => {
    if (isLoading == true) {
        return <Spinner size='large' />
    }
    else {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <SocialIcon
                button
                title='Sign In With Facebook'
                type='facebook'
                onPress={() => signIn('facebook', false)}
            />
        </View>
    }
}

class ScreenWrapper extends Component {
    componentWillMount(){
        this.props.signIn('facebook', true)
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps)
    }

    onAuthComplete(props) {
        if (props.isAuthenticated) {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'RootTabs'})
                ]
            })
            this.props.navigation.dispatch(resetAction)
        }
    }

    render() {
        return <Screen {...this.props} />
    }
}

const mapStateToProps = (state) => {
    const { isLoading, user } = state.signInForm
    const isAuthenticated = user != null
    return { isLoading, isAuthenticated }
}

export default connect(mapStateToProps, { signIn })(ScreenWrapper)