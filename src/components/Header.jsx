import { useState, useEffect } from 'react'

import { NavLink } from 'react-router-dom'
import { TiDeviceDesktop } from 'react-icons/ti'
import { TbDeviceGamepad } from 'react-icons/tb'
import { CgShoppingCart } from 'react-icons/cg'
import { BiWallet } from 'react-icons/bi'
import everConn from '../connectors/everConnector'
import { useDispatch, useSelector } from 'react-redux'
import { setAccountAddress,  } from '../redux/actions'
const Header = () => {
    const dispatch = useDispatch()
    const address = useSelector((state) => state.accountAddress)
    const [isConnected, setIsConnected] = useState(false)
    useEffect(() => {
        const accountAddress = localStorage.getItem('everscale_account')
        if (accountAddress) {
            dispatch(setAccountAddress(accountAddress))
            setIsConnected(true)
        }
    }, [])
    const connectWallet = async () => {
        try {
            const [ever, account] = await everConn.connectToEverWallet()
            dispatch(setAccountAddress(account.address._address))
            localStorage.setItem('everscale_account', account.address._address)
            console.log('Everscale account connected')
            setIsConnected(true)
          } catch (ex) {
            setIsConnected(false)
            console.log(ex)
          }
    }

    return (
      <div>
        <div className='flex justify-between mx-[40px]'>
            <ul className='flex space-x-6 mt-[36px] text-white'>
                <li className='flex space-x-4 items-center'>
                    <TbDeviceGamepad/>
                    <NavLink to="/">
                        My Games
                    </NavLink>
                </li>
                <li className='flex space-x-4 items-center'>
                    <TiDeviceDesktop/>
                    <NavLink to="/emulator">
                        Emulator
                    </NavLink>
                </li>
                <li className='flex space-x-4 items-center'>
                    <CgShoppingCart/>
                    <NavLink to="/market">
                        Market
                    </NavLink>
                </li>

            </ul>
            {isConnected ? 
                <button className='flex w-[348px] h-[48px] items-center bg-[#F6F76D] rounded-xl mr-10 p-4 hover:bg-[#ffff0d] cursor-default mt-[36px]'>
                    <BiWallet/>
                    <p className='mx-auto'>{address.slice(0, 20) + '...'}</p>
                </button>
            : 
                <button onClick={connectWallet} className='flex w-[348px] h-[48px] items-center bg-[#F6F76D] rounded-xl mr-10 p-4 hover:bg-[#ffff0d] mt-[36px]'>
                    <BiWallet/>
                    <p className='mx-auto'>Connect Wallet</p>
                </button>
            }
        </div>
      </div>
    )
  }
  
export default Header