import { useEffect, useState } from "react"
import { useSelector } from "react-redux/es/exports"
import { BsChevronRight } from 'react-icons/bs'
import { BsChevronLeft } from 'react-icons/bs'
import CartridgesList from '../components/CartridgesList'
const MyGamesPage = () => {

    const nfts = useSelector((state) => state.nfts)
    const [cartridges, setCartridges] = useState([])
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
                pictureSrc: url
            }
        })
        setCartridges(newArray)
    }, [nfts])
    return (
        <div className='flex justify-center h-full'>
        <div className='w-full h-[700px] rounded-2xl flex flex-col '>
            <div className="flex py-6 mt-5 justify-between">
                <div className="flex space-x-4">
                    <h1 className="text-6xl font-monoton">MY GAMES</h1>
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
                <CartridgesList cartridgesArray={cartridges}/>
            </div>
        </div>
      </div>
    )
  }
  
export default MyGamesPage