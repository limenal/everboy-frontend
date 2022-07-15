import {
    ProviderRpcClient,
    Address
} from 'everscale-inpage-provider'
import axios from 'axios'
import NFTIndexHelperAbi from '../abis/NFTIndexHelper.abi.json'
import IndexAbi from '../abis/Index.abi.json'
function dec2hex (str) {
    var dec = str.toString().split(''), sum = [], hex = [], i, s
    while(dec.length){
        s = 1 * dec.shift()
        for(i = 0; s || i < sum.length; i++){
            s += (sum[i] || 0) * 10
            sum[i] = s % 16
            s = (s - sum[i]) / 16
        }
    }
    while(sum.length){
        hex.push(sum.pop().toString(16))
    }
    return hex.join('')
}
async function getAllUserNfts (userAddress, rpc) {
    const ntfIndexHelperAddress = new Address('0:26fbe2fb50396d6ba1711cf8deac07bcebd2fc350e8d9f72586bb0085e3f5b81')
    const nftIndexHelper = await rpc.createContract(NFTIndexHelperAbi, ntfIndexHelperAddress)
    const collectionAddress = new Address('0:64e42d7bfaab3ff46ebf1bfa6e10b42c46fd0702e50dc3aba80d1e2ecc34f0d1')
    const owner = new Address(userAddress)
    const indexCodeHash = await nftIndexHelper.methods.indexCodeHash({
        answerId: 0,
        collection: collectionAddress,
        owner
    }).call()
    const hexString = dec2hex(indexCodeHash.indexCodeHash)
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
    const promises = []
    response.data.data.accounts.forEach((item) => {
        const contractAddress = new Address(item.id)
        const contract = rpc.createContract(IndexAbi, contractAddress)
        promises.push(contract)
    })
    let contractCalls
    await Promise.allSettled(promises)
    .then(results => {
        contractCalls = results.map((contract) => {
            return contract.value.methods.getInfo({
                answerId: 0
            }).call()
        })
    })
    const userNfts = []
    await Promise.allSettled(contractCalls)
    .then(results => {
        results.forEach(item => userNfts.push(item.value))
    })
    return userNfts
}

export default getAllUserNfts