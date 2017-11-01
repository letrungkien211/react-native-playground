// Write here
import React, { Component } from "react";

import { List, ListItem, Text } from "react-native-elements";

import { Button } from "react-native";

import { connect } from "react-redux";

import { setStorageInfo, listBlobs, explore } from "../actions/AzureBlobsActions";

class AzureBlobExplorer extends Component {
    componentWillMount() {
        const { storageAccountName, storageAccessKey } = this.props.navigation.state.params
        if (storageAccountName && storageAccessKey) {
            this.props.setStorageInfo({ storageAccountName, storageAccessKey })
        }
        console.log({ storageAccountName, storageAccessKey })
    }

    render() {
        const { items, explore } = this.props
        return <List style={{ paddingTop: 0 }}>
            {
                this.props.items.map(({ name, type }, i) => {
                    let hideChevron = false, onPress = null
                    if (type == 'file') {
                        hideChevron = true
                    }
                    else {
                        onPress = () => { explore({ name }) }
                    }
                    return <ListItem
                        key={name}
                        title={name}
                        onPress={onPress}
                        hideChevron= {hideChevron} />
                })
            }
        </List>
    }
}

AzureBlobExplorer.navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.storageAccountName ?
        screenProps.storageAccountName + screenProps.path :
        navigation.state.params.storageAccountName
})

const mapStateToProps = ({ azureBlobExplorer }) => {
    const { storageAccountName, items, path, blobService } = azureBlobExplorer
    return { storageAccountName, items, path, blobService }
}

export default connect(mapStateToProps, { setStorageInfo, listBlobs, explore })(AzureBlobExplorer)