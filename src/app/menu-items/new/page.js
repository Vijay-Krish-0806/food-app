'use client'

import { useState } from "react"
import EditableImage from '../../components/layout/EditableImage'
import Tabs from "../../components/layout/Tabs"
import { toast } from "react-toastify"
import { useProfile } from '../../components/UseProfile'
import Link from "next/link"
import Left from "../../components/icons/Left"
import { redirect } from "next/navigation"
import MenuItemForm from "../../components/layout/MenuItemForm"
const NewMenuItemPage = () => {

    const [savingPic, setSavingPic] = useState('Edit Avatar')
    const [redirectTo, setRedirectTo] = useState(false)

    const { loading: profileLoading, data: profileData } = useProfile()
    if (profileLoading) {
        return "Loading User Info"
    }

    if (!profileData.admin) {
        return "Not an admin"
    }


    const handleSubmit = async (e,data) => {
        e.preventDefault()
        const response = await fetch('/api/menu-items', {
            method: 'POST',
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

    return (
        <section>
            <Tabs isAdmin={profileData.admin} />
            <div className=" mt-3 max-w-md mx-auto">
                <Link href={'/menu-items'} className="button"><Left /> Show All menu items </Link>
            </div>
            <MenuItemForm menuItem={null} setSavingPic={setSavingPic} savingPic={savingPic} onSubmit={handleSubmit} />

        </section>
    )
}

export default NewMenuItemPage