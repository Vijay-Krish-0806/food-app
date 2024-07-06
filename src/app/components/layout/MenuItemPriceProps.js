'use client'
import Delete from "../icons/Delete"
import Add from "../icons/Add"
import ChevronUp from "../icons/ChevronUp"
import ChevronDown from "../icons/ChevronDown"
import { useState } from "react"

const MenuItemPriceProps = ({ name, props, setProps, addLabel }) => {
const [isOpen,setIsOpen]=useState(false)

    function addProp() {
        setProps(oldProps => {
            return [...oldProps, { name: '', price: '' }]
        })
    }

    const editProp = (e, index, prop) => {
        const newValue = e.target.value;
        setProps(prevProps => {
            const newProps = [...prevProps];
            newProps[index][prop] = newValue;
            return newProps
        })
    }
    const removeProp = (index) => {
        setProps(prev => prev.filter((v, i) => i !== index))
    }
    return (
        <div className="bg-gray-200 p-2 rounded-md mb-2">

            <button onClick={()=>setIsOpen(prev=>!prev)} className="inline-flex items-center p-1 justify-start border-0" type='button'> {isOpen?<ChevronUp/>:<ChevronDown/>}<span>{name}</span><span>({props?.length})</span></button>
            <div className={isOpen?'block':'hidden'}>
            {props?.length > 0 && props.map((size, index) => (
                <div key={index} className="flex items-end gap-2">
                    <div>
                        <label>Name</label>
                        <input type='text' placeholder="Size name" value={size.name} onChange={e => editProp(e, index, 'name')} />
                    </div>
                    <div>
                        <label>Extra Price</label>
                        <input type='text' placeholder='Extra Price' value={size.price} onChange={e => editProp(e, index, 'price')} />
                    </div>

                    <div>
                        <button type="button" onClick={() => removeProp(index)} className="bg-white mb-4"><Delete /></button>
                    </div>
                </div>
            ))}
            <button type='button' onClick={addProp} className="bg-white"><Add />{addLabel}  </button>
            </div>
        </div>
    )
}

export default MenuItemPriceProps