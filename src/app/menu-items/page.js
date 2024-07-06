'use client'
import { useProfile } from '../components/UseProfile'
import Tabs from '../components/layout/Tabs'
import Link from 'next/link'

import Right from '../components/icons/Right'
import { useEffect, useState } from 'react'
import Image from 'next/image'


const MenuItemsPage = () => {

    const [menuItems, setMenuItems] = useState([])
    const { loading: profileLoading, data: profileData } = useProfile()
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })
    }, [])
    if (profileLoading) {
        return "Loading User Info"
    }

    if (!profileData.admin) {
        return "Not an admin"
    }

    return (
        <section className='mt-8 max-w-md mx-auto'>
            <Tabs isAdmin={profileData.admin} />
            <div className='mt-8'>
                <Link className='button ' href={'/menu-items/new'}>Create New Menu Item <Right /></Link>
            </div>

            <div>
                <h2 className='text-sm text-gray-500 mt-8'>Edit Menu Item:</h2>
                <div className='grid grid-cols-3 gap-2'>
                    {menuItems?.length > 0 && (
                        menuItems.map(item => (
                            <Link key={item._id} href={'/menu-items/edit/' + item._id}
                             className='bg-gray-200 rounded-lg p-4'
                             
                             >
                                <div className='relative'>{item.image && (<Image src={item.image} alt='' width={200} height={200} className='rounded-md' />)}</div>
                                <div className='text-center'>{item.name}</div>
                            </Link>
                        ))
                    )}
                </div>

            </div>

        </section>
    )
}

export default MenuItemsPage