import React, { Component } from "react";

import { FormInput, FormLabel, Button, Text } from "react-native-elements";

import {connect} from 'react-redux'
import {View} from 'react-native'

import { addAccount, updateProp } from "../actions/AzureAccountActions";

const AzureAccountAdd = ({ storageAccountName, storageAccessKey, error, updateProp, addAccount, navigation }) => {
    return <View>
        <FormLabel>Name</FormLabel>
        <FormInput
            value={storageAccountName}
            onChangeText={(value) => updateProp({ prop: 'storageAccountName', value })}
        />
        <FormLabel>Key</FormLabel>
        <FormInput
            value={storageAccessKey}
            onChangeText={(value) => updateProp({ prop: 'storageAccessKey', value })}
        />
        <Button
            title="Submit"
            onPress={() => addAccount({ storageAccountName, storageAccessKey, navigation })}
        />
        <Text>{error}</Text>
    </View>
}

AzureAccountAdd.navigationOptions = {
    title: 'Add Azure Storage Account'
}

const mapStateToProps = ({azureAddAccountForm}) => {
    return {...azureAddAccountForm}
}

export default connect(mapStateToProps, {addAccount, updateProp})(AzureAccountAdd)