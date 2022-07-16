import { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import Game from '../components/Game'
import Control from '../components/Control'
import getAllUserNfts from '../services/ntfIndexHelper'
import getGameCodes from '../services/nftService'
import everConn from '../connectors/everConnector'
import spaceInvaders from '../files/SpaceInvaders.ch8'
import IBMLogo from '../files/IBMLogo.ch8'

function asciiToUint8Array(str){
  var chars = [];
  for (var i = 0; i < str.length; ++i){
    chars.push(str.charCodeAt(i));/*from  w  ww. j  a  v  a  2s.c o  m*/
  }
  return new Uint8Array(chars);
}

function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

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
        var gc = await getGameCodes(userNfts, ever)
        //Сохранить до появления полки
        //console.log(gc[2].gameCode)
        // let ff = Uint8Array.from(atob(gc[4].gameCode), c => c.charCodeAt(0));
        //console.log(ff)
        //setFile(ff)
        console.log(userNfts)
        setUserNfts(userNfts)
    }

    return (
      <div className='flex justify-center h-full'>
          <div className='p-6 bg-[#F6F76D] w-full h-[700px] rounded-2xl flex items-center gap-x-10 justify-center'>
            <div className='w-1/4 h-[650px] bg-[#AB76EE] rounded-2xl '>
                <Control name={'CARTRIDGE NAME #1'} />
            </div>
            <div className='w-3/4 h-[650px] bg-[#AB76EE] rounded-2xl'>
                <Game style={{ height: '100%' , width: '100%'}} file = {file} keyPressed = {keyPressed} setKey = {setKey} />
            </div>
          </div>
      </div>
    )
}

export default EmulatorPage