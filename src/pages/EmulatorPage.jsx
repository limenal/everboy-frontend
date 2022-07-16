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

const maze = 'YABhAKIiwgEyAaIe0BRwBDBAEgRgAHEEMSASBBIcgEAgECBAgBA='

function EmulatorPage (props) {

    const [timeOut, setTime] = useState(false);
    const [file, setFile] = useState([]);
    const [title, setTitle] = useState("Space Invaders");
    const [keyPressed, setKey] = useState();
    const [name, setName] = useState('')

    const currentGame = useSelector((state) => state.game)

    const inputRef = useRef(null);

    const dispatch = useDispatch()

    /*const upload = (f) => {
      if(!f)
         return;
      f.arrayBuffer().then(buffer => {  
        
        setFile(data);
      }).catch(e => console.log(e));    
   }*/

   const handleInput = () => {
      inputRef.current?.click();
   }
/*
   useEffect(() => {
      (async function() {
         upload(await fetch(ibmLogo).then(r => r.blob()));   
      })();
   }, [])*/
    
    useEffect(() => {
        console.log(currentGame)
        if (currentGame !== null){
            setName(currentGame.name)
            let data = Uint8Array.from(atob(currentGame.gameCode), c => c.charCodeAt(0));
            setFile(data)
        }
        else{
            setName('No one game')
            let data = Uint8Array.from(atob(maze), c => c.charCodeAt(0));
            setFile(data)
        }
    }, [currentGame])

    return (
      <div className='flex justify-center h-full'>
          <div className='p-6 bg-[#F6F76D] w-full h-[700px] rounded-2xl flex items-center gap-x-10 justify-center'>
            <div className='w-1/4 h-[650px] bg-[#AB76EE] rounded-2xl '>
                <Control name={name} />
            </div>
            <div className='w-3/4 h-[650px] bg-[#AB76EE] rounded-2xl'>
                <Game style={{ height: '100%' , width: '100%'}} file = {file} keyPressed = {keyPressed} setKey = {setKey} />
            </div>
          </div>
      </div>
    )
}

export default EmulatorPage