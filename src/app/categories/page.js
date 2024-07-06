'use client'
import React, { useEffect, useState } from 'react'
import Tabs from '../components/layout/Tabs'
import { useProfile } from '../components/UseProfile'
import { toast } from 'react-toastify'
import DeleteButton from '../components/DeleteButton'
const Categories = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categories, setCategories] = useState([])
    const [editedCategory, setEditedCategory] = useState(null)
    useEffect(() => {
        fetchCategories();
    }, [])
    const { loading: profileLoading, data: profileData } = useProfile()
    if (profileLoading) {
        return "Loading User Info"
    }

    if (!profileData.admin) {
        return "Not an admin"
    }



    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }

    const handleDelteClick = async (_id) => {
       const response= await fetch('/api/categories?_id=' + _id, {
            method: 'DELETE',
        })
        if(response.ok){
            toast.success('Deleted');
        }
        else{
            toast.error('Something error')
        }
        fetchCategories();
    }
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        const data = { name: categoryName };
        if (editedCategory) {
            data._id = editedCategory._id
        }
        const response = await fetch('/api/categories', {
            method: editedCategory ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        if (response.ok) {
            editedCategory ? toast.success('Category updated successfully ') : toast.success('Category successfully created')
        }
        else {
            toast.error('Error in creating!!!');
        }
        setCategoryName('')
        fetchCategories();
        setEditedCategory(null)


    }
    return (
        <section className='mt-8  max-w-lg mx-auto'>
            <Tabs isAdmin={profileData.admin} />
            <form className='mt-8' onSubmit={handleCategorySubmit}>
                <div className='flex  gap-2 items-center justify-center'>
                    <div className='grow'>
                        <label>{editedCategory ? 'Update Category' : 'New Category Name'} {editedCategory && (<> :<b>{editedCategory.name}</b></>)}</label>
                        <input type='text' value={categoryName} onChange={e => setCategoryName(e.target.value)} />
                    </div>
                    <div className='flex pb-2 gap-2'>
                        <button className='mt-5 border border-primary' type='submit'>{editedCategory ? 'Update' : 'Create'}
                        </button>
                        <button type="button" onClick={()=>{setEditedCategory(null);setCategoryName('')}}>Cancel</button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className='mt-8 text-sm text-gray-500'>Existing categories</h2>
                {categories?.length > 0 && categories.map(c => (
                    <div

                        className='bg-gray-100 rounded-xl p-2 px-2  mb-1 flex gap-1 items-center' key={c._id}>
                        <div className='grow' >{c.name}</div>
                        <div className='flex gap-1'>
                            <button onClick={() => {
                                setEditedCategory(c);
                                setCategoryName(c.name)
                            }
                            } type='button'>Edit</button>
                            <DeleteButton label={'Delete'} onDelete={()=>handleDelteClick(c._id)}/>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    )
}

export default Categories