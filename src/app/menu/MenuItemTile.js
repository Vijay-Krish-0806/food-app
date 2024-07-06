
const MenuItemTile = ({onAddToCart,...item}) => {
    const {name,image,description,basePrice}=item;
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-md hover:shadow-black/25 ">
            <div className="text-center">
                <img src={image} alt="pizza" className="max-h-auto max-h-24 block mx-auto" />
            </div>
            <h4 className="font-semibold text-xl my-2 capitalize">{name}</h4>
            <p className="text-gray-500 text-sm">
                {description}
            </p>
            <button
                onClick={onAddToCart}
                className="mt-4 text-sm bg-primary text-white rounded-md  px-4 py-2">Add to cart ${basePrice}
            </button>
        </div>)
}

export default MenuItemTile