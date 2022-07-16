import CartridgeSvg from '../assets/cartridge.svg'
import { BsArrowRight } from 'react-icons/bs'
import { useEffect } from 'react'
const Sale = ({SaleInfo}) => {
    console.log(SaleInfo)
    useEffect(() => {

    }, [])
    return (
        <div className='flex flex-col'>
            <div className='relative top-0 left-0'>
                <img src={CartridgeSvg} className='top-0 left-0'/>
                <img src={SaleInfo.pictureSrc} className='absolute top-[80px] left-[45px] w-[176px] h-[161px] rounded-md'/>
            </div>
            <h1 className='relative text-white text-xl bottom-[24px] left-[16px]'>{SaleInfo.name}
            <p className='relative  text-[#EEEF6A] text-sm'>Price: {SaleInfo.price} ever</p>
            </h1>
            {/* <h2 className='relative text-white text-xl bottom-[24px] left-[16px]'>Price: 1 ton</h2>
            <div className='flex justify-start items-center w-[240px] gap-x-8'>
                <p className='relative left-[16px] text-[#EEEF6A] text-sm'>Price: 1 ton</p>
            </div> */}
            <div className='flex justify-start items-center w-[240px] gap-x-8'>
                <p className='relative left-[16px] text-[#EEEF6A] text-sm'>Buy</p>
                <BsArrowRight color='#EEEF6A' />
            </div>
        </div>
    )
}

export default Sale