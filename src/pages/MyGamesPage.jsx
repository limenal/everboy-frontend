import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { BsChevronRight } from 'react-icons/bs'
import { BsChevronLeft } from 'react-icons/bs'
import { setNfts } from '../redux/actions'
import getAllUserNfts from '../services/ntfIndexHelper'
import getNftInfo from '../services/nftService'
import everConn from '../connectors/everConnector'
import Cartridge from '../components/Cartridge'

const MyGamesPage = () => {

    const walletAddress = useSelector((state) => state.accountAddress)
    const nfts = useSelector((state) => state.nfts)

    const [userNfts, setUserNfts] = useState([])
    const [cartridges, setCartridges] = useState([])
    const [gamesCount, setGamesCount] = useState(0)

    const dispatch = useDispatch()

    const listRef = useRef(null)

    useEffect(() => {
        const newArray = nfts.map((value) => {
            let indexOfName = value.json.indexOf(':')
            let endIndexName = value.json.indexOf(`'`, indexOfName+2)
            const name = value.json.substring(indexOfName + 2, endIndexName)
            const urlIndex = value.json.indexOf('https')
            const endIndexUrl = value.json.indexOf(`'`, urlIndex)
            const url = value.json.substring(urlIndex, endIndexUrl)
            return {
                name: name,
                pictureSrc: url,
                gameCode: value.gameCode
            }
        })
        setGamesCount(newArray.length)
        setCartridges(newArray)
    }, [nfts])

    useEffect(() => {
        if (walletAddress) {
            getUserNfts()
        }
    }, [walletAddress])

    const getUserNfts = async () => {
        const [ever, account] = await everConn.connectToEverWallet()
        const userNfts = await getAllUserNfts(walletAddress, ever)
        console.log(userNfts)
        const nftsInfo = await getNftInfo(userNfts, ever)
        console.log(nftsInfo)
        dispatch(setNfts(nftsInfo))
        setUserNfts(userNfts)
    }

    const sideScroll = (
        speed,
        distance,
        step
      ) => {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
          listRef.current.scrollLeft += step;
          scrollAmount += Math.abs(step);
          if (scrollAmount >= distance) {
            clearInterval(slideTimer);
          }
        }, speed);
      };

    return (
        <div className='flex justify-center h-full'>
        <div className='w-full h-[700px] rounded-2xl flex flex-col '>
            <div className="flex py-6 mt-5 justify-between">
                <div className="flex space-x-4">
                    <h1 className="text-6xl font-monoton select-none">MY GAMES</h1>
                    <h1 className="text-6xl font-monoton opacity-30 select-none">{gamesCount ? gamesCount : ''}</h1>
                </div>
                <div className="flex justify-center items-center mr-8">
                    <div className="rounded-full w-[64px] h-[64px] hover:bg-black flex items-center justify-center cursor-pointer" 
                        onClick={()=>{
                            sideScroll(25, 100, -150)
                        }}
                    >
                        <BsChevronLeft color="white"/>
                    </div>
                    <div className="rounded-full w-[64px] h-[64px] hover:bg-black flex items-center justify-center cursor-pointer" 
                    onClick={() => {
                        sideScroll(25, 100, 150)
                    }}>
                        <BsChevronRight color="white"/>
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className='flex justify-start gap-x-10 overflow-hidden select-none' ref={listRef}>
                    {cartridges.map((value, index) => {
                        return <Cartridge cartridgeInfo={value} key={index}/>
                    })}
                </div>
            </div>
        </div>
      </div>
    )
  }
  
export default MyGamesPage