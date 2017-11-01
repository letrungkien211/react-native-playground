const azure = require('azure-storage')
const fetch = require('node-fetch')
const crypto = require("crypto");


const storageAccountName = 'kienteststorage'
const storageAccessKey = 'JzhtXqmy1tW/zE7fAZbeFKqGUE44mq8OlEMHbMNLV55STbNdVA8A80vcRZxk6CY7XOnM3zHCYzZ02Me8k924sQ=='
const blobService = azure.createBlobService(storageAccountName, storageAccessKey)

// it('Test service creation', () => {
//     blobService.createContainerIfNotExists('rnpunitest', function (error, result, response) {
//         console.log({error, result, response})
//         expect(result.created).toBe(true)
//         blobService.deleteContainerIfExists('rnpunitest', function(error, result, response){
//             console.log({error, result, response})
//             expect(result).toBe(true)
//         })
//     })

//     blobService.listContainersSegmented(null, function(error, result, response){
//         console.log({error, result, response})
//     })
// })

function calculateSignature(accountName, accesskey, date, params = 'comp:list', version = '2016-05-31') {
    // construct input value
    var inputvalue = "GET\n" + /*VERB*/
        "\n" + /*Content-Encoding*/
        "\n" + /*Content-Language*/
        "\n" + /*Content-Length*/
        "\n" + /*Content-MD5*/
        "\n" + /*Content-Type*/
        "\n" + /*Date*/
        "\n" + /*If-Modified-Since*/
        "\n" + /*If-Match*/
        "\n" + /*If-None-Match*/
        "\n" + /*If-Unmodified-Since*/
        "\n" + /*Range*/
        `x-ms-date:${date}\n` +
        `x-ms-version:${version}\n` +
        `/${accountName}/\n${params}`;

    console.log(inputvalue)
    // create base64 encoded signature
    var key = new Buffer(accesskey, "base64");
    var hmac = crypto.createHmac("sha256", key);
    hmac.update(inputvalue);
    var sig = hmac.digest("base64");
    return sig
}

it('Test Signature', () => {
    const sig = calculateSignature(storageAccountName, storageAccessKey, "Tue, 31 Oct 2017 16:21:02 GMT")
    expect(sig).toBe('yH+CX25kztkhEgltDgeZWk3p4311vOrAqNKQNphw3ZA=')
})

it('Test azure storage api', () => {
    // var accesskey = "93K17Co74T2lDHk2rA+wmb/avIAS6u6lPnZrk2hyT+9+aov82qNhrcXSNGZCzm9mjd4d75/oxxOr6r1JVpgTLA==";
    // var accountName = "tsmatsuzsttest0001"
    var accesskey = storageAccessKey
    var accountName = storageAccountName
    var date = (new Date()).toUTCString()
    var params = 'comp:list'
    var version = '2017-04-17'

    var sig = calculateSignature(accountName, accesskey, date, params, version)

    fetch(`https://${accountName}.blob.core.windows.net/?${params.replace(':','=')}`, {
        headers: {
            'Authorization': `SharedKey ${storageAccountName}:` + sig,
            'x-ms-date': date,
            'x-ms-version': version
        }
    }).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
})

