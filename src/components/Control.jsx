import { useState } from "react";

const Control = ({ setKey, name }) => {
   const [timeOut, setTime] = useState(false);

   const handleClick = (e, key) => {
      e.preventDefault();
      setKey(key);
      if(!timeOut) {
         setTime(true);
         setTimeout(() => { setKey(null); setTime(false); }, 200);
      }
   }

   return (
      <>
         <h1 className='text-2xl p-8 font-monoton break-words text-center m-4'>{name}</h1>
            <div className='mt-6'>
                  <p className='p-8 font-sans text-lg'>Controls</p>
                  <div className='grid grid-cols-4 gap-y-2 px-8 text-3xl text-center font-pixellari'>
                     <div onClick = {(e) => handleClick(e,"Digit1")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>1</div>
                     <div onClick = {(e) => handleClick(e,"Digit2")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>2</div>
                     <div onClick = {(e) => handleClick(e,"Digit3")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>3</div>
                     <div onClick = {(e) => handleClick(e,"Digit4")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>4</div>
                     <div onClick = {(e) => handleClick(e,"KeyQ")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>Q</div>
                     <div onClick = {(e) => handleClick(e,"KeyW")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>W</div>
                     <div onClick = {(e) => handleClick(e,"KeyE")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>E</div>
                     <div onClick = {(e) => handleClick(e,"KeyR")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>R</div>
                     <div onClick = {(e) => handleClick(e,"KeyA")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>A</div>
                     <div onClick = {(e) => handleClick(e,"KeyS")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>S</div>
                     <div onClick = {(e) => handleClick(e,"KeyD")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>D</div>
                     <div onClick = {(e) => handleClick(e,"KeyF")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>F</div>
                     <div onClick = {(e) => handleClick(e,"KeyZ")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>Z</div>
                     <div onClick = {(e) => handleClick(e,"KeyX")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>X</div>
                     <div onClick = {(e) => handleClick(e,"KeyC")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>C</div>
                     <div onClick = {(e) => handleClick(e,"KeyV")} className='bg-[#F6F76D] w-[77px] h-[77px] rounded-2xl flex items-center justify-center cursor-default'>V</div>
                  </div>
            </div>
      </>
   )
}

export default Control