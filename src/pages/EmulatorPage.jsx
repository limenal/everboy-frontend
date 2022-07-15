import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Game from '../components/Game'
import getAllUserNfts from '../services/ntfIndexHelper'
import everConn from '../connectors/everConnector'

function EmulatorPage (props) {

    const walletAddress = useSelector((state) => state.accountAddress)

    useEffect(() => {
        console.log(walletAddress)
        if (walletAddress) {
            getUserNfts()
        }
    }, [walletAddress])

    const getUserNfts = async () => {
        const [ever, account] = await everConn.connectToEverWallet()
        await getAllUserNfts(walletAddress, ever)
    }

    return (
      <div className='flex justify-center'>
          <div className='m-8 p-6 bg-gray-200 w-full h-[700px] rounded-2xl flex items-center gap-x-10 justify-center'>
            <div className='w-1/4 h-[650px] bg-white rounded-2xl'>

            </div>
            <div className='w-3/4 h-[650px] bg-white rounded-2xl'>

            </div>
          </div>
      </div>
    )
}

export default EmulatorPage