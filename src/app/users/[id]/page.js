'use client'

import { useEffect, useState } from 'react'
import { useProfile } from '../../components/UseProfile'
import Tabs from '../../components/layout/Tabs'
import { useParams } from 'next/navigation'
import UserForm from '../../components/layout/UserForm'
import { toast } from 'react-toastify'

const EditUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null)
  const [savingType, setSavingType] = useState('Update')

  useEffect(() => {
    fetch('/api/users').then(res => {
      res.json().then(users => {
        const userData = users.find(u => u._id === id)
        setUser(userData)
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

  const handleButtonClick = async (e, data) => {
    e.preventDefault();
    setSavingType('Updating...')
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, _id: id })
    })
    if (response.ok) {
      toast.success('Profile updated Succesfully')
      setSavingType('Updated')
      setSavingType('Update')


    }
    else {
      toast.error('Something went wrong')
      setSavingType('Update')

    }
  }
  return (
    <section>
      <Tabs isAdmin={profileData.admin} />
      <div className='mt-8'>
        <UserForm user={user} savingType={savingType} onSave={handleButtonClick} />
      </div>

    </section>
  )
}

export default EditUserPage