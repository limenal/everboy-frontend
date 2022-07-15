import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Game from '../components/Game'
import getAllUserNfts from '../services/ntfIndexHelper'
import getGameCodes from '../services/nftService'
import everConn from '../connectors/everConnector'
import spaceInvaders from '../files/SpaceInvaders.ch8'
import IBMLogo from '../files/IBMLogo.ch8'

function EmulatorPage (props) {

    const walletAddress = useSelector((state) => state.accountAddress)
    const [userNfts, setUserNfts] = useState([])
    const [timeOut, setTime] = useState(false);
    const [file, setFile] = useState([]);
    const [title, setTitle] = useState("Space Invaders");
    const [keyPressed, setKey] = useState();
    const inputRef = useRef(null);

    useEffect(() => {
        console.log(walletAddress)
        if (walletAddress) {
            getUserNfts()
        }
    }, [walletAddress])

    const upload = (f) => {
      if(!f)
         return;
      f.arrayBuffer().then(buffer => {  
         let data = new Uint8Array(buffer);
         setFile(data);
      }).catch(e => console.log(e));    
   }

   const handleInput = () => {
      inputRef.current?.click();
   }

   useEffect(() => {
      (async function() {
         upload(await fetch(IBMLogo).then(r => r.blob()));   
      })();
   }, [])

    const getUserNfts = async () => {
        const [ever, account] = await everConn.connectToEverWallet()
        const userNfts = await getAllUserNfts(walletAddress, ever)
        console.log(userNfts)
        await getGameCodes(userNfts, ever)
        console.log(userNfts)
        setUserNfts(userNfts)
    }

    return (
      <div className='flex justify-center h-full'>
          <div className='p-6 bg-[#F6F76D] w-full h-[700px] rounded-2xl flex items-center gap-x-10 justify-center'>
            <div className='w-1/4 h-[650px] bg-[#AB76EE] rounded-2xl '>
                <h1 className='text-5xl p-8 font-monoton'>CARTRIDGE NAME #1</h1>
                <div className='mt-6'>
                    <p className='p-8 font-sans text-lg'>Control</p>
                    <div className='grid grid-cols-4 gap-y-2 px-8 text-3xl text-center font-pixellari'>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>1</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>2</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>3</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>4</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>Q</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>W</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>E</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>R</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>A</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>S</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>D</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>F</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>Z</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>X</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>C</div>
                        <div className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>V</div>
                    </div>
                </div>
            </div>
            <div className='w-3/4 h-[650px] bg-[#AB76EE] rounded-2xl'>
                <Game style={{ height: '100%' , width: '100%'}} file = {file} keyPressed = {keyPressed} setKey = {setKey} />
            </div>
          </div>
      </div>
    )
}

export default EmulatorPage