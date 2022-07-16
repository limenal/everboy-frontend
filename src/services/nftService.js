import {
    ProviderRpcClient,
    Address
} from 'everscale-inpage-provider'
import NftAbi from '../abis/Nft.abi.json'

async function getNftInfo (nfts, rpc) {
    console.log(nfts)
    const contractCreations = []
    nfts.forEach((item) => {
        const contractCreate = rpc.createContract(NftAbi, item.nft) 
        contractCreations.push(contractCreate)
    })
    let gameCodeCalls
    let infoCalls
    let addresses
    await Promise.allSettled(contractCreations)
    .then(results => {
        addresses = results.map((contract) => {
            return contract.value._address._address
        })
        gameCodeCalls = results.map((contract) => {
            return contract.value.methods.gameCode({}).call()
        })
        infoCalls = results.map((contract) => {
            return contract.value.methods.getJson({
                answerId: 0
            }).call()
        })
    })
    const gameCodes = []
    const nftsInfo = []
    const infoAddress = []
    console.log(addresses)
    await Promise.allSettled(gameCodeCalls)
    .then(results => {
        console.log(results)
        results.forEach(item => gameCodes.push(item.value))
    })
    await Promise.allSettled(infoCalls)
    .then(results => {
        console.log(results)
        results.forEach(item => nftsInfo.push(item.value))
    })
    const outputInfo = []
    for (let i = 0; i < gameCodes.length; ++i) {
        outputInfo.push({
            ...nftsInfo[i],
            ...gameCodes[i],
            address: addresses[i]
        })
    }
    return outputInfo
}

export default getNftInfo