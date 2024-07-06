'use client'
import { useState } from "react"
import EditableImage from './EditableImage'
import MenuItemPriceProps from './MenuItemPriceProps'
import { useEffect } from "react"


const MenuItemForm = ({ onSubmit, menuItem, setSavingPic, savingPic }) => {
    const [pic, setPic] = useState(menuItem?.image || '')
    const [name, setName] = useState(menuItem?.name || '')
    const [description, setDescription] = useState(menuItem?.description || '')
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '')
    const [sizes, setSizes] = useState(menuItem?.sizes || [])
    const [ingredients, setIngredients] = useState(menuItem?.ingredients || [])
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }, [])
    return (
        <form className='mt-8 max-w-2xl mx-auto'
            onSubmit={e => onSubmit(e, { image: pic, name, description, basePrice, sizes, ingredients, category, })}
        >
            <div className='md:grid gap-4 items-start ' style={{ gridTemplateColumns: '.3fr .7fr' }}>
                <div>
                    <EditableImage link={pic} setLink={setPic} setSavingPic={setSavingPic} savingPic={savingPic} />
                </div>
                <div className='grow'>
                    <label>Menu Item Name</label>
                    <input type='text' onChange={e => setName(e.target.value)} value={name} />
                    <label>Description</label>
                    <input type='text' onChange={e => setDescription(e.target.value)} value={description} />
                    <label>Categeory</label>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        {categories.length > 0 && (
                            categories.map(c => (
                                <option key={c._id} value={c._id}>{c.name}</option>
                            ))
                        )}
                    </select>
                    <label>Base Price</label>
                    <input type='text' onChange={e => setBasePrice(e.target.value)} value={basePrice} />
                    <MenuItemPriceProps name={'Sizes'} addLabel={'Add item size'} props={sizes} setProps={setSizes} />
                    <MenuItemPriceProps name={'Extra Ingredients'} addLabel={'Add Extra Ingredients Prices'} props={ingredients} setProps={setIngredients} />

                    <button type='submit'>Update</button>
                </div>
            </div>
        </form>
    )
}

export default MenuItemForm