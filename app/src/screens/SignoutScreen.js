
import React, {Component} from 'react'
import { Spinner, Confirm } from '../components/common/'
import {Text} from 'react-native-elements'
import {NavigationActions} from 'react-navigation'

import {signOut} from '../actions/SignInActions'

import {connect} from 'react-redux'

class SignoutScreen extends Component {
    componentWillReceiveProps(nextProps){
        if(nextProps.isSignedOut){
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'SignInScreen'})
                ]
            })
            this.props.navigation.dispatch(resetAction)        
        }
    }

    render(){
        if(this.props.isSigningOut || this.props.isSignedOut){
            return <Spinner size='large' />
        }
        else{
            return <Confirm onDecline = {()=> this.props.navigation.goBack()}
                onAccept = {()=> this.props.signOut()}
            >
                <Text>Do you want to sign out?</Text>
            </Confirm>
        }
    }
}

const mapStateToProps = ({signInForm}) => {
    const {isSigningOut, user} = signInForm
    const isSignedOut = user == null
    return {isSigningOut, isSignedOut}
}

export default connect(mapStateToProps, {signOut})(SignoutScreen)