// Write here

import azure from "react-native-azure-storage";
import { parseString } from "react-native-xml2js";

import { AZURE_BLOB_EXPLORER_UPDATE_PROPS } from "./types";

export const listBlobs = ({ blobService, path }) => (dispatch) => {
    blobService.listBlobs(path).then(res => {
        console.log(res)
    }).catch(error => {
        console.error(error)
    })
}

export const setStorageInfo = ({ storageAccountName, storageAccessKey }) => dispatch => {
    const blobService = azure.createBlobService(storageAccountName, storageAccessKey)
    blobService.listContainers().then((res) => {
        parseString(res.data, (err, result) => {
            console.log(JSON.stringify(result))
            const items = result.EnumerationResults.Containers[0].Container.map((val, index) => {
                return {type: 'container', name: val.Name[0]}
            })
            dispatch({
                type: AZURE_BLOB_EXPLORER_UPDATE_PROPS,
                payload: { storageAccountName, storageAccessKey, blobService, items },
            })
        })
    }).catch(error => {
        console.error(error)
    })
}

export const explore = ({name}) => dispatch => {
    console.log(`Explore ${name}` )
}

