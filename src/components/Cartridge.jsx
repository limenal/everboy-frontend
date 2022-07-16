import CartridgeSvg from '../assets/cartridge.svg'
import { BsArrowRight } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { setGame } from '../redux/actions'
const Cartridge = ({cartridgeInfo}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false);

    const playCartridge = () => {
        dispatch(setGame(cartridgeInfo))
        navigate('/emulator')
    }

    /*
    const sendNft = () => {

    }
    */


    return (
        <>
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
            <div className='flex justify-start items-center w-[240px] gap-x-8 cursor-pointer' onClick={() => setShowModal(true)}>
                <p className='relative left-[16px] text-[#EEEF6A] text-sm'>Send to friend</p>
                <BsArrowRight color='#EEEF6A' />
            </div>
        </div>
        {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Send game to your friend
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Type the address of your friend's wallet and click "Send game"
                  </p>
                </div>
                <div className="mb-3 pt-0" style={{marginLeft:20, marginRight:20, border: '1px solid amethyst', borderRadius:5}}>
                    <input type="text" placeholder="0:2d23..." className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button style={{background: 'orchid'}}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Send game
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
    )
}

export default Cartridge