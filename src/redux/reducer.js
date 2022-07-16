import {
    SET_ACCOUNT_ADDRESS,
    SET_ACCOUNT,
    SET_EVER_RPC,
    SET_NFTS,
    SET_GAME
} from './constants'

const initialState = {
    accountAddress: '',
    account: null,
    everRpc: null,
    nfts: [],
    game: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACCOUNT_ADDRESS: {
            return {
                ...state,
                accountAddress: action.payload.accountAddress
            }
        }
        case SET_ACCOUNT: {
            return {
                ...state,
                account: action.payload.account
            }
        }
        case SET_EVER_RPC: {
            return {
                ...state,
                everRpc: action.payload.everRpc
            }
        }
        case SET_NFTS: {
            return {
                ...state,
                nfts: action.payload.nfts
            }
        }
        case SET_GAME: {
            return {
                ...state,
                game: action.payload.game
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer