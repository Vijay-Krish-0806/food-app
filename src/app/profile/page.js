"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Tabs from "../components/layout/Tabs"
import UserForm from '../components/layout/UserForm'

const Profile = () => {
    const session = useSession()
    const { status } = session;
    const [savingType, setSavingType] = useState('Save')
    const [userData, setUserData] = useState(null)
    const [profileFetched, setProfileFetched] = useState(false)

    async function fetchUser() {
        try {
            const response = await fetch('/api/profile');
            const data = await response.json();
            setUserData(data);
            setProfileFetched(true);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    useEffect(() => {
        if (status === 'authenticated') {
            fetchUser();
        }
    }, [status]);

    if (status === 'loading' || !profileFetched) {
        return 'Loading.....'
    }
    if (status === 'unauthenticated') {
        return redirect('/login')
    }

    const handleProfileSubmit = async (e, data) => {
        e.preventDefault();
        setSavingType('Saving...');
        try {
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                toast.success('Profile updated');
                setSavingType('Saved');
                fetchUser();
            } else {
                toast.error('Something went wrong');
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error('Something went wrong');
        } finally {
            setSavingType('Save');
        }
    }

    return (
        <section className="mt-4">
            <Tabs isAdmin={userData?.admin} />
            <div className="max-w-xl mt-6 mx-auto">
                <UserForm user={userData} onSave={handleProfileSubmit} savingType={savingType} />
            </div>
        </section>
    )
}

export default Profile;
