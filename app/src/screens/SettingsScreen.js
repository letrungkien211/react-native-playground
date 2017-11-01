import React, { Component } from "react"

import { View } from 'react-native'

import { List, ListItem } from 'react-native-elements'

import { connect } from "react-redux"

import { signOut } from "../actions/SignInActions"

const SettingsScreen = ({ navigation, signOut }) => {
    return (
        <List
            containerStyle={{ marginTop: 0 }}>
            <ListItem
                key="signout"
                onPress={() => navigation.navigate('SignoutScreen')}
                title="Sign Out"
            />
        </List>
    )
}

export default connect(null, { signOut })(SettingsScreen)