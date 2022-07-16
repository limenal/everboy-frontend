import Sale from './Sale'
 
const SalesList = ({SalesArray}) => {
    // const array = [{
    //     name: 'Game name',
    //     price: 10000,
    //     pictureSrc: 'https://sun9-37.userapi.com/impf/yW3ENtmfWHl1t-B1g_2aXUu_u9YaLvpY-PEICw/NdfQL0XKCyM.jpg?size=353x323&quality=96&sign=a7bc1688765ac85f743667dc37a171e4&type=album'
    // }]
   
    console.log(SalesArray)
    return (
        <div className='flex justify-start gap-x-10'>
            {SalesArray.map((value, index) => {
                return <Sale SaleInfo={value} />
            })}
        </div>
    )
}

export default SalesList