import React, { Component } from "react"

import { View } from 'react-native'

import { List, ListItem } from 'react-native-elements'

import { connect } from "react-redux"

import { signOut } from "../actions/SignInActions"

const ToolsScreen = ({ navigation, signOut }) => {
    return (<List
        containerStyle={{ marginTop: 0 }}>
        <ListItem
            key="bmi"
            onPress={() => navigation.navigate('BmiCalculatorScreen')}
            title="BMI Calculator"
        />
        <ListItem
            key="oxforddict"
            onPress={() => navigation.navigate('OxfordDictScreen')}
            title="Oxford Dictionary"
        />
    </List>
    )
}

export default connect(null, { signOut })(ToolsScreen)