import { useEffect, useState, useRef } from 'react'
import Game from '../components/Game'
import Control from '../components/Control'
import { useSelector, useDispatch } from 'react-redux'
import { setNfts } from '../redux/actions'
import getAllUserNfts from '../services/ntfIndexHelper'
import getNftInfo from '../services/nftService'
import everConn from '../connectors/everConnector'
import ibmLogo from '../files/IBMLogo.ch8'
import spaceInvaders from '../files/SpaceInvaders.ch8'
import IBMLogo from '../files/IBMLogo.ch8'

function EmulatorPage (props) {

    const [timeOut, setTime] = useState(false);
    const [file, setFile] = useState([]);
    const [title, setTitle] = useState("Space Invaders");
    const [keyPressed, setKey] = useState();

    const currentGame = useSelector((state) => state.game)

    const inputRef = useRef(null);

    const dispatch = useDispatch()

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
         upload(await fetch(ibmLogo).then(r => r.blob()));   
      })();
   }, [])

    const getUserNfts = async () => {
        const [ever, account] = await everConn.connectToEverWallet()
        const userNfts = await getAllUserNfts(walletAddress, ever)
        console.log(userNfts)
        var gc = await getGameCodes(userNfts, ever)
        //Сохранить до появления полки
        //console.log(gc[2].gameCode)
        // let ff = Uint8Array.from(atob(gc[4].gameCode), c => c.charCodeAt(0));
        //console.log(ff)
        //setFile(ff)
        console.log(userNfts)
        setUserNfts(userNfts)
    }
    
    useEffect(() => {
        console.log(currentGame) 
    }, [currentGame])

    return (
      <div className='flex justify-center h-full'>
          <div className='p-6 bg-[#F6F76D] w-full h-[700px] rounded-2xl flex items-center gap-x-10 justify-center'>
            <div className='w-1/4 h-[650px] bg-[#AB76EE] rounded-2xl '>
                <Control name={'CARTRIDGE NAME #1'} />
=======
    return (
      <div className='flex justify-center h-full'>
          <div className='p-6 bg-[#F6F76D] w-full h-[700px] rounded-2xl flex items-center gap-x-10 justify-center'>
            <div className='w-1/4 h-[650px] bg-[#AB76EE] rounded-2xl flex justify-start'>
            </div>
            <div className='w-3/4 h-[650px] bg-[#AB76EE] rounded-2xl'>
                <Game style={{ height: '100%' , width: '100%'}} file = {file} keyPressed = {keyPressed} setKey = {setKey} />
            </div>
          </div>
      </div>
    )
}

export default EmulatorPage