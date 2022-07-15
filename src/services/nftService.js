import {
    ProviderRpcClient,
    Address
} from 'everscale-inpage-provider'
import NftAbi from '../abis/Nft.abi.json'

async function getGameCodes (nfts, rpc) {
    console.log(nfts)
    const contractCreations = []
    nfts.forEach((item) => {
        const contractCreate = rpc.createContract(NftAbi, item.nft) 
        contractCreations.push(contractCreate)
    })
    let contractCalls
    await Promise.allSettled(contractCreations)
    .then(results => {
        contractCalls = results.map((contract) => {
            console.log(contract)
            return contract.value.methods.gameCode({}).call()
        })
    })
    const gameCodes = []
    await Promise.allSettled(contractCalls)
    .then(results => {
        console.log(results)
        results.forEach(item => gameCodes.push(item.value))
    })
    console.log(gameCodes)
    return gameCodes
}

export default getGameCodes