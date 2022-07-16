import CartridgeSvg from '../assets/cartridge.svg'
import { BsArrowRight } from 'react-icons/bs'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setGame } from '../redux/actions'
const Cartridge = ({cartridgeInfo}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const playCartridge = () => {
        dispatch(setGame(cartridgeInfo))
        navigate('/emulator')
    }

    return (
        <div className='flex flex-col'>
            <div className='relative top-0 left-0'>
                <img src={CartridgeSvg} className='top-0 left-0'/>
                <img src={cartridgeInfo.pictureSrc} className='absolute top-[80px] left-[45px] w-[176px] h-[161px] rounded-md'/>
            </div>
            <h1 className='relative text-white text-xl bottom-[24px] left-[16px]'>{cartridgeInfo.name}</h1>
            <div className='flex justify-start items-center w-[240px] gap-x-8 cursor-pointer' onClick={playCartridge}>
                <p className='relative left-[16px] text-[#EEEF6A] text-sm'>Play now</p>
                <BsArrowRight color='#EEEF6A' />
            </div>
        </div>
    )
}

export default Cartridge