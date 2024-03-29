import React from 'react'
import './NewCollections.css'
import Items from '../items/Items'
import { useState } from 'react'
import { useEffect } from 'react'

const NewCollections = () => {
  const [new_collections, setNewCollections] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/newcollections').then((res) => res.json()).then((data) => setNewCollections(data))
  },[])
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item,i) => <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price = {item.old_price}/>)}
      </div>
    </div>
  )
}

export default NewCollections
