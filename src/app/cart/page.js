'use client'

import { useContext, useEffect, useState } from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "../AppProvider";

import { toast } from "react-toastify";
import AddressInputs from "../components/layout/AddressInputs";
import { useProfile } from "../components/UseProfile";
import CartProduct from "../components/layout/CartProduct";

const CartPage = () => {
    const { cartProducts, removeCartProduct } = useContext(CartContext);
    const { data: profileData } = useProfile();
    const [address, setAddress] = useState({})
    let subtotal = 0;
    for (const p of cartProducts) {
        subtotal += cartProductPrice(p);
    }
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('cancled=1')) {
                toast.error('Payment Failed 😔')
            }
        }
    }, [])


    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress, city, postalCode, country } = profileData;
            const addressFromProfile = {
                phone,
                streetAddress,
                city,
                postalCode,
                country
            };
            setAddress(addressFromProfile);
        }
    }, [profileData]);


    function handleAddressChange(propName, value) {
        setAddress(prevAddress => ({ ...prevAddress, [propName]: value }));
    }

    async function proceedToCheckout(ev) {
        ev.preventDefault();
        const promise = new Promise((resolve, reject) => {
            fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address,
                    cartProducts,
                }),
            }).then(async (response) => {
                if (response.ok) {
                    resolve();
                    window.location = await response.json();
                } else {
                    reject();
                }
            });
        });

        await toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: 'Something went wrong... Please try again later',
        })
    }

    if (cartProducts?.length === 0) {
        return (
            <section className="mt-8 text-center">
                <SectionHeaders mainHeader="Cart" />
                <p className="mt-4">Your shopping cart is empty 😔</p>
            </section>
        );
    }

    return (
        <section className="mt-8 px-4">
            <div className="text-center mb-8">
                <SectionHeaders mainHeader='Cart' />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    {cartProducts?.length === 0 && (
                        <div className="text-center text-gray-500">Cart is Empty!!!</div>
                    )}
                    {cartProducts?.length > 0 && (
                        cartProducts.map((product, index) => (
                            <CartProduct product={product} onRemove={() => removeCartProduct(index)} key={index} index={index} />
                        ))
                    )}
                    <div className="py-4 text-right pr-16 flex justify-end items-center">
                        <div className="text-gray-500">
                            Subtotal:<br />
                            Delivery:<br />
                            Total:<br />
                        </div>
                        <div className="text-lg font-semibold">${subtotal}<br />
                            $5<br />
                            ${subtotal + 5}
                        </div>
                    </div>


                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h1 className="font-semibold">Checkout:</h1>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                        />
                        <button type="submit">Pay ${subtotal + 5}</button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default CartPage;
