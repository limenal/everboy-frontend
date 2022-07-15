import {
    ProviderRpcClient,
    Address
} from 'everscale-inpage-provider'
import axios from 'axios'
import NFTIndexHelperAbi from '../abis/NFTIndexHelper.abi.json'
import IndexAbi from '../abis/Index.abi.json'

async function getAllUserNfts (userAddress, rpc) {
    const ntfIndexHelperAddress = new Address('0:26fbe2fb50396d6ba1711cf8deac07bcebd2fc350e8d9f72586bb0085e3f5b81')
    const nftIndexHelper = await rpc.createContract(NFTIndexHelperAbi, ntfIndexHelperAddress)
    const collectionAddress = new Address('0:ddc988a1bfbbc8589a761349843beed5898dc71c57bd5729ac2d4ae4d4005809')
    const owner = new Address('0:4b4a867fc333fd3fac8dc996a4ad76809039f0036bd1276b4a275cbc1c277c07')
    const indexCodeHash = await nftIndexHelper.methods.indexCodeHash({
        answerId: 0,
        collection: collectionAddress,
        owner
    }).call()
    console.log(indexCodeHash)
    const hexString = parseInt(indexCodeHash.indexCodeHash).toString(16)
    console.log(hexString)
    const queryString = ` 
    query { accounts (filter : {
        code_hash :{eq : "${hexString}"}
    })
    {
        id
    }}
    `
    const response = await axios({
        url: 'https://net.ton.dev/graphql',
        method: 'post',
        data: {
            query: queryString
        }
    });
    console.log(response)
}

export default getAllUserNfts