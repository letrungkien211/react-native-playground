
import azure from "react-native-azure-storage";
import { testAzureStorage } from "../config";

const blobService = azure.createBlobService(testAzureStorage.storageAccountName, testAzureStorage.storageAccessKey)

// it('Test connect to azure storage', () => {
//     blobService.listContainers()
//         .then((res) => {
//             console.log(res.data)
//             expect(res.status).toBe(200)
//         })
//         .catch(error => {
//             expect(error).toBeNull()
//         })
// })

it('Test get stats', () => {
    blobService.listContainers()
        .then((res) => {
            console.log(res.data)
            expect(res.status).toBe(200)
        })
        .catch(error => {
            expect(error).toBe(null)
        })
})