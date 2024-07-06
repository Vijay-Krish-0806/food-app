'use client'

import { useState } from "react"
import EditableImage from "./EditableImage"
import { useProfile } from "../UseProfile"
import AddressInputs from './AddressInputs'

const UserForm = ({ user, onSave, savingType }) => {
    const [userName, setUserName] = useState(user?.name || '')
    const [savingPic, setSavingPic] = useState('Edit Pic')
    const [streetAdd, setStreetAdd] = useState(user?.streetAddress || '')
    const [city, setCity] = useState(user?.city || '')
    const [country, setCountry] = useState(user?.country || '')
    const [tel, setTel] = useState(user?.phone || '')
    const [postAdd, setPostAdd] = useState(user?.postalCode || '')
    const [pic, setPic] = useState(user?.image || '')
    const [isAdmin, setIsAdmin] = useState(user?.admin || '')
    const { data: currentUser } = useProfile();

    function handleAddressChange(propName, value) {
        if (propName === 'tel') setTel; (value);
        if (propName === 'streetAdd') setStreetAdd(value);
        if (propName === 'postAdd') setPostAdd(value);
        if (propName === 'city') setCity(value);
        if (propName === 'country') setCountry(value);
    }


    return (

        <div className="md:flex  gap-2">
            <div >
                <EditableImage link={pic} setLink={setPic} setSavingPic={setSavingPic} savingPic={savingPic} />
            </div>

            <form className="grow" onSubmit={(e) => onSave(e, { name: userName, streetAddress: streetAdd, postalCode: postAdd, city, country, phone: tel, admin: isAdmin, image: pic })}>
                <input type='text' placeholder="First and Last name" value={userName} onChange={(e) => setUserName(e.target.value)} />
                <input type='email' value={user?.email} disabled={true} />
                <AddressInputs addressProps={{ tel, streetAdd, postAdd, city, country }}
                    setAddressProp={handleAddressChange} />
                {currentUser.admin && (
                    <div>
                        <label className='p-2  inline-flex items-center gap-2' htmlFor="adminCB">
                            <input id='adminCB' type='checkbox' className="" checked={isAdmin}

                                onChange={e => setIsAdmin(e.target.checked)}
                            />
                            <span>Admin</span>
                        </label>
                    </div>
                )}

                <button type='Submit'>
                    {savingType}
                </button>
            </form>
        </div>

    )
}

export default UserForm;
