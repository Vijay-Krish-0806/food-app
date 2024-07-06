'use client'
import { SessionProvider } from "next-auth/react"
import { createContext, useEffect, useState } from 'react'
import { toast } from "react-toastify";

export const CartContext = createContext();

export function cartProductPrice(cartProduct) {
    let price = cartProduct.basePrice;
    if (cartProduct.size) {
        price += cartProduct.size.price;
    }
    if (cartProduct.extras?.length > 0) {
        for (const extra of cartProduct.extras) {
            price += extra.price;
        }
    }
    return price;
}

const AppProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])
    const ls = typeof window !== 'undefined' ? window.localStorage : null


    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts(JSON.parse(ls.getItem('cart')))
        }
    }, [])
    const removeCartProduct = (indexToRemove) => {
        setCartProducts(prevCArtProducts => {
            const newCartProducts = prevCArtProducts.filter((v, index) => index !== indexToRemove)
            saveCartProductsToLs(newCartProducts)
            return newCartProducts;
        })
        toast.success('Deleted Successfully')
    }
    const clearCart = () => {
        setCartProducts([])
        saveCartProductsToLs([])
    }

    const saveCartProductsToLs = (cartProducts) => {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }

    const addToCart = (product, size = null, extras = []) => {
        setCartProducts(prevProducts => {
            const cartProduct = { ...product, size, extras }
            const newProducts = [...prevProducts, cartProduct];
            saveCartProductsToLs(newProducts)
            return newProducts;
        })
    }



    return (
        <>
            <SessionProvider>
                <CartContext.Provider value={{ cartProducts, setCartProducts, addToCart, removeCartProduct, clearCart }}>
                    {children}
                </CartContext.Provider>
            </SessionProvider>

        </>



    )
}

export default AppProvider