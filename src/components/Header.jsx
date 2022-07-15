import { useState, useEffect } from 'react'

import { NavLink } from 'react-router-dom'
import { TiDeviceDesktop } from 'react-icons/ti'
import { TbDeviceGamepad } from 'react-icons/tb'
import { CgShoppingCart } from 'react-icons/cg'
import { BiWallet } from 'react-icons/bi'
import everConn from '../connectors/everConnector'
import { useDispatch, useSelector } from 'react-redux'
import { setAccountAddress, setAccount, setEverRpc } from '../redux/actions'
function Header () {
    const dispatch = useDispatch()
    const address = useSelector((state) => state.accountAddress)
    const [isConnected, setIsConnected] = useState(false)
    useEffect(() => {
        const accountAddress = localStorage.getItem('everscale_account')
        if (accountAddress) {
            dispatch(setAccountAddress(accountAddress))
            setIsConnected(true)
        }
    })
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
        <div className='flex justify-between my-8 mx-10'>
            <ul className='flex space-x-6'>
                <li className='flex space-x-4 items-center'>
                    <TiDeviceDesktop/>
                    <NavLink to="/">
                        Emulator
                    </NavLink>
                </li>
                <li className='flex space-x-4 items-center'>
                    <TbDeviceGamepad/>
                    <NavLink to="/my-games">
                        My Games
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
                <button className='flex w-[350px] h-[50px] items-center bg-gray-200 rounded-xl mr-10 p-4 hover:bg-gray-300 cursor-default'>
                    <BiWallet/>
                    <p className='mx-auto'>{address.slice(0, 14) + '...'}</p>
                </button>
            : 
                <button onClick={connectWallet} className='flex w-[350px] h-[50px] items-center bg-gray-200 rounded-xl mr-10 p-4 hover:bg-gray-300'>
                    <BiWallet/>
                    <p className='mx-auto'>Connect Wallet</p>
                </button>
            }
        </div>
      </div>
    )
  }
  
export default Header