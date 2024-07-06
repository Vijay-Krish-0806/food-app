'use client'

import { useEffect, useState } from "react"
import MenuItems from "../components/layout/MenuItems"
import SectionHeaders from '../components/layout/SectionHeaders'

const MenuItem = () => {
    const [items, setItems] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('/api/menu-items').then(response => {
            response.json().then(item => {
                setItems(item);
            })
        })
        fetch('/api/categories').then(response => {
            response.json().then(item => {
                setCategories(item);
            })
        })
    }, [])
    return (
        <section className="mt-8">
            {categories?.length > 0 && categories.map((c, i) => (
                <div key={i}>
                    <div className="text-center">
                        <SectionHeaders mainHeader={c.name} />

                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-6 mb-12">
                        {items.filter(item => item.category === c._id).map(item => (
                            <MenuItems key={item._id} menuItem={item} />
                        ))}
                    </div>
                </div>
            ))}
        </section>

    )
}

export default MenuItem