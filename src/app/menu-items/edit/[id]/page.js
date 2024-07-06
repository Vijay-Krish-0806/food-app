'use client'

import { useEffect, useState } from "react"
import Tabs from "../../../components/layout/Tabs"
import MenuItemForm from "../../../components/layout/MenuItemForm"
import { toast } from "react-toastify"
import { useProfile } from '../../../components/UseProfile'
import Link from "next/link"
import Left from "../../../components/icons/Left"
import { redirect, useParams } from "next/navigation"

import DeleteButton from '../../../components/DeleteButton'

const EditMenuItem = () => {
    const { id } = useParams()
    const [menuItem, setMenuItem] = useState(null)
    const [savingPic, setSavingPic] = useState('Edit Image')
    const [redirectTo, setRedirectTo] = useState(false)

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id)
                setMenuItem(item)
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


    const handleSubmit = async (e, data) => {
        e.preventDefault()
        data = { ...data, _id: id }

        const response = await fetch('/api/menu-items', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.ok) {
            toast.success('Succesfully created')

        }
        else {
            toast.error('Something went wrong!!')
        }
        setRedirectTo(true)
    }
    if (redirectTo) {
        redirect('/menu-items')
    }

    async function handleDeleteClick() {
        const response = await fetch('/api/menu-items?_id=' + id, {
            method: "DELETE",
        });
        if (response.ok) {
            toast.success('Deleted Successfully!!');
        }
        else {
            toast.error('Something error occurred!!')
        }
        setRedirectTo(true);

    }

    return (
        <section>
            <Tabs isAdmin={profileData.admin} />
            <div className=" mt-3 max-w-md mx-auto">
                <Link href={'/menu-items'} className="button"><Left /> Show All menu items </Link>
            </div>
            <MenuItemForm menuItem={menuItem} setSavingPic={setSavingPic} onSubmit={handleSubmit} savingPic={savingPic} />
            <div className='max-w-md mx-auto mt-4'>
                <div className="max-w-xs ml-auto pl-4">
                    <DeleteButton label={'Delete this menu item'} onDelete={handleDeleteClick} />
                </div>
            </div>
        </section>
    )
}

export default EditMenuItem