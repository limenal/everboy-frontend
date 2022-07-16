import Cartridge from './Cartridge'
 
const CartridgesList = ({cartridgesArray}) => {

    return (
        <div className='flex justify-start gap-x-10'>
            {cartridgesArray.map((value, index) => {
                return <Cartridge cartridgeInfo={value} key={index}/>
            })}
        </div>
    )
}

export default CartridgesList