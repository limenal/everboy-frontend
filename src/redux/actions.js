import {
    SET_ACCOUNT_ADDRESS,
    SET_ACCOUNT,
    SET_EVER_RPC
} from './constants'

export const setAccountAddress = (accountAddress) => ({
    type: SET_ACCOUNT_ADDRESS,
    payload: {accountAddress}
})

export const setAccount = (account) => ({
    type: SET_ACCOUNT,
    payload: {account}
})

export const setEverRpc = (ever) => ({
    type: SET_EVER_RPC,
    payload: {ever}
})