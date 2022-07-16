import Cartridge from './Cartridge'
 
const CartridgesList = ({cartridgesArray}) => {
    const array = [{
        name: 'Game name',
        pictureSrc: 'https://sun9-37.userapi.com/impf/yW3ENtmfWHl1t-B1g_2aXUu_u9YaLvpY-PEICw/NdfQL0XKCyM.jpg?size=353x323&quality=96&sign=a7bc1688765ac85f743667dc37a171e4&type=album'
    }]
    return (
        <div className='flext justify-start gap-x-10'>
            {cartridgesArray.map((value, index) => {
                return <Cartridge cartridgeInfo={value} key={index}/>
            })}
        </div>
    )
}

export default CartridgesList