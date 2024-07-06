'use client'

import { useEffect, useState } from 'react'
import { useProfile } from '../components/UseProfile'
import Tabs from '../components/layout/Tabs'
import Link from 'next/link'

const UsersPage = () => {

    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('/api/users').then(response => {
            response.json().then(users => {
                setUsers(users);
            })
        })

    }, [])
    const { loading: profileLoading, data: profileData } = useProfile()
    if (profileLoading) {
        return "Loading User Info"
    }

    if (!profileData.admin) {
        return "Not an admin"
    }


    return (


        <section className="max-w-2xl mx-auto mt-8">
            <Tabs isAdmin={profileData.admin} />
            <div className='mt-8'>
                {users?.length > 0 && users.map(user => (
                    <div key={user._id} className='bg-gray-300 rounded-lg mb-2 p-1 px-4 items-center gap-4 flex'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-2 grow'>
                            <div className='text-gray-900'>
                                {!!user.name && (<span>{user.name}</span>)}
                                {!user.name && (<span className='italic'> No Name</span>)}
                            </div>
                            <span className='text-gray-500'>{user.email}</span>

                        </div>
                        <div>
                            <Link className='button' href={'/users/' + user._id}>Edit</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default UsersPage