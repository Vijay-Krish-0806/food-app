import { useContext, useState } from "react";
import { CartContext } from "../../AppProvider";
import { toast } from "react-toastify";
import MenuItemTile from '../../menu/MenuItemTile';
import Image from "next/image";

const MenuItems = ({ menuItem }) => {
    const { image, name, description, basePrice, sizes, ingredients } = menuItem;
    const { addToCart } = useContext(CartContext);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedSize, setsSelectedSize] = useState(sizes?.[0] || null)
    const [selectedExtras, setSelectedExtras] = useState([])

    const handleAddToCartClick = () => {
        if (showPopup) {
            addToCart(menuItem, selectedSize, selectedExtras);
            toast.success('Added to cart');
            setShowPopup(false);

        }
        if (sizes.length === 0 && ingredients.length === 0) {
            addToCart(menuItem);
            toast.success('Successfully Added to Cart');
        } else {
            setShowPopup(true);
        }
    };
    const handleExtraThing = (e, extraThing) => {
        const checked = e.target.checked
        if (checked) {
            setSelectedExtras(prev => [...prev, extraThing])
        } else {
            setSelectedExtras(prev => { return prev.filter(e => e.name !== extraThing.name) })
        }
    }
    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price
    }
    if (selectedExtras?.length > 0) {
        for (const extra of selectedExtras) {
            selectedPrice += extra.price
        }
    }


    return (
        <>
            {showPopup && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setShowPopup(false)}>
                    <div className="bg-white p-6 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <div className="flex flex-col items-center">
                            <Image src={image} alt={name} width={300} height={200} className="rounded-md mb-4" />
                            <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
                            {sizes?.length > 0 && (
                                <div className="bg-gray-100 rounded-md p-4 mb-4 w-full">
                                    <h3 className="text-center text-gray-700 mb-2">Pick your size</h3>
                                    {sizes.map((size) => (
                                        <label key={size.name} className="flex items-center gap-2 p-2 border-b last:border-b-0">
                                            <input type="radio" onChange={() => setsSelectedSize(size)} checked={selectedSize?.name === size.name} name="size" className="form-radio" />
                                            <span>{size.name}</span>
                                            <span className="ml-auto">${(basePrice + size.price).toFixed(2)}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                            {ingredients?.length > 0 && (
                                <div className="bg-gray-100 rounded-md p-4 mb-4 w-full">
                                    <h3 className="text-center text-gray-700 mb-2">Pick your ingredients</h3>
                                    {ingredients.map((ingredient) => (
                                        <label key={ingredient.name} className="flex items-center gap-2 p-2 border-b last:border-b-0">
                                            <input type="checkbox"
                                                onChange={(e) => handleExtraThing(e, ingredient)}

                                                name={ingredient.name} className="form-checkbox" />
                                            <span>{ingredient.name}</span>
                                            <span className="ml-auto">+${ingredient.price.toFixed(2)}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button
                                onClick={handleAddToCartClick}
                                className="primary mt-4 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 sticky bottom-0" type="button">
                                Add to cart ${selectedPrice}
                            </button>
                            <button onClick={() => setShowPopup(false)} className='mt-2'>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartClick} {...menuItem} />
        </>
    );
};

export default MenuItems;