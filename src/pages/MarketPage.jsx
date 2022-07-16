
import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Game from '../components/Game'
import getAllUserNfts from '../services/ntfIndexHelper'
import {getAllSales} from '../services/salesService.js'
import getNftInfo from '../services/nftService'
import everConn from '../connectors/everConnector'
import spaceInvaders from '../files/SpaceInvaders.ch8'
import IBMLogo from '../files/IBMLogo.ch8'




function MarketPage () {

  const walletAddress = useSelector((state) => state.accountAddress)


  useEffect(() => {
      if (walletAddress) {
        getUserSales()
      }
  }, [walletAddress])






  const getUserSales = async () => {
      const [ever, account] = await everConn.connectToEverWallet()

      const something = await getAllSales(ever)
      console.log("-------")
      console.log(something)
      console.log("-------")

      
      // const userNfts = await getAllUserNfts(walletAddress, ever)
      // console.log(userNfts)
      // const nftsInfo = await getNftInfo(userNfts, ever)
      // console.log(nftsInfo)
      // setUserNfts(userNfts)
  }
    return (
      <div>
        <div className=''>
  
        </div>
      </div>
    )
  }
  
  export default MarketPage