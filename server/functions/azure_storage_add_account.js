
const admin = require('firebase-admin')
const azure = require('azure-storage')

module.exports = function (req, res) {
    if (!req.body.storageAccountName || !req.body.storageAccessKey) {
        return res.status(400).send('Required storageAccountName and storageAccessKey fields are missing.')
    }

    const { storageAccountName, storageAccessKey } = req.body;

    const blobService = azure.createBlobService(storageAccountName, storageAccessKey)

    blobService.listContainersSegmented(null, function(error, result, response){
        res.send({ error, result, response, storageAccountName, storageAccessKey })
    })
    // blobService.createContainerIfNotExists('rnp323232313', function (error, result, response) {
    //     res.send({ error, result, response, storageAccountName, storageAccessKey })
    // })
}

/*
NOT FOUND SAMPLE
{
    "code": "ENOTFOUND",
    "errno": "ENOTFOUND",
    "syscall": "getaddrinfo",
    "hostname": "aaa.blob.core.windows.net",
    "host": "aaa.blob.core.windows.net",
    "port": "443"
}
*/