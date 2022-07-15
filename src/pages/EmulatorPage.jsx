import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Game from '../components/Game'
import getAllUserNfts from '../services/ntfIndexHelper'
import everConn from '../connectors/everConnector'
import spaceInvaders from '../files/SpaceInvaders.ch8'

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
         upload(await fetch(spaceInvaders).then(r => r.blob()));   
      })();
   }, [])

    const getUserNfts = async () => {
        const [ever, account] = await everConn.connectToEverWallet()
        const userNfts = await getAllUserNfts(walletAddress, ever)
        console.log(userNfts)
        setUserNfts(userNfts)
    }

    return (
      <div className='flex justify-center'>
          <div className='m-8 p-6 bg-gray-200 w-full h-[700px] rounded-2xl flex items-center gap-x-10 justify-center'>
            <div className='w-1/4 h-[650px] bg-white rounded-2xl'>

            </div>
            <div className='w-3/4 h-[650px] bg-white rounded-2xl'>
                <Game file = {file} keyPressed = {keyPressed} setKey = {setKey} />
            </div>
          </div>
      </div>
    )
}

export default EmulatorPage