import {
    SET_ACCOUNT_ADDRESS,
    SET_ACCOUNT,
    SET_EVER_RPC,
    SET_NFTS,
    SET_GAME
} from './constants'

export const setAccountAddress = (accountAddress) => ({
    type: SET_ACCOUNT_ADDRESS,
    payload: {accountAddress}
})

export const setNfts = (nfts) => ({
    type: SET_NFTS,
    payload: {nfts}
})

export const setGame = (game) => ({
    type: SET_GAME,
    payload: {game}
})

export const setAccount = (account) => ({
    type: SET_ACCOUNT,
    payload: {account}
})

export const setEverRpc = (ever) => ({
    type: SET_EVER_RPC,
    payload: {ever}
})