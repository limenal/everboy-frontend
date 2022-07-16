import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Game from '../components/Game'
import {getAllSales} from '../services/salesService.js'
import getNftInfo from '../services/nftService'
import everConn from '../connectors/everConnector'
import { BsChevronLeft } from 'react-icons/bs'
import { BsChevronRight } from 'react-icons/bs'

import SalesList from '../components/SalesList'

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
      <div className='flex justify-center h-full'>
      <div className='w-full h-[700px] rounded-2xl flex flex-col '>
          <div className="flex py-6 mt-5 justify-between">
              <div className="flex space-x-4">
                  <h1 className="text-6xl font-monoton">MARKET</h1>
                  <h1 className="text-6xl font-monoton opacity-30">10</h1>
              </div>
              <div className="flex justify-center items-center mr-8">
                  <div className="rounded-full w-[64px] h-[64px] hover:bg-black flex items-center justify-center cursor-pointer">
                      <BsChevronLeft color="white"/>
                  </div>
                  <div className="rounded-full w-[64px] h-[64px] hover:bg-black flex items-center justify-center cursor-pointer">
                      <BsChevronRight color="white"/>
                  </div>
              </div>
          </div>
          <div className="">
              <SalesList SalesArray={[]}/>
          </div>
      </div>
    </div>
    )
  }
  
  export default MarketPage