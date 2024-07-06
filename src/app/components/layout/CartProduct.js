
import Image from "next/image";
import Delete from '../icons/Delete';
import { cartProductPrice } from "../../AppProvider";

const CartProduct = ({ product, onRemove,index }) => {
    return (
        <div key={product.id} className="flex items-center gap-4 mb-4 border-b pb-4">
            <div className="w-24 h-24 overflow-hidden rounded-lg">
                <Image width={96} height={96} src={product.image} alt={product.name} className="object-cover w-full h-full" />
            </div>
            <div className="flex-grow">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                {product.size && (
                    <div className="text-sm text-gray-700">Size: <span>{product.size.name}</span></div>
                )}
                {product.extras?.length > 0 && (
                    <div className="text-sm text-gray-500">
                        Extras: {product.extras.map(extra => (
                            <div key={extra.name}>{extra.name} ${extra.price}</div>
                        ))}
                    </div>
                )}
            </div>
            <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
            {
                !!onRemove && (
                    <div className="ml-2">
                        <button
                            onClick={() => onRemove(index)}
                            className="p-2 text-red-500 hover:text-red-700" type='button'>
                            <Delete />
                        </button>
                    </div>
                )
            }

        </div>
    )
}

export default CartProduct