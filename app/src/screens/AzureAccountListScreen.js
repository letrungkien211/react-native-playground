// Write here
import React, { Component } from "react";

import { List, ListItem, Text } from "react-native-elements";

import { Button } from "react-native";

import { connect } from "react-redux";

import firebase from 'firebase'

import { Spinner } from "../components/common";

import _ from 'lodash'

import { accountsFetch } from "../actions/AzureAccountActions";

const AzureAccountsList = ({ accounts, navigation }) => {
    return <List style={{paddingTop: 0}}>
        {accounts.map((item, index) => {
            return <ListItem
                key={item.uid}
                title={item.storageAccountName}
                onPress={() => navigation.navigate('AzureBlobExplorerScreen', { ...item })}
            />
        })}
    </List>
}

class AzureAccountListScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Azure Accounts',
        headerRight: <Button title='Add' onPress={() => navigation.navigate('AzureAccountAddScreen')} />
    })

    componentWillMount() {
        this.props.accountsFetch()
    }

    render() {
        if (this.props.isLoading)
            return <Spinner size='large' />
        else
            return <AzureAccountsList {...this.props} />
    }
}

const mapStateToProps = ({ azureAccountList }) => {
    const accounts = _.map(azureAccountList.accounts, (val, uid) => {
        return { ...val, uid }
    })

    const { isLoading } = azureAccountList
    return { accounts, isLoading }
}

export default connect(mapStateToProps, { accountsFetch })(AzureAccountListScreen)