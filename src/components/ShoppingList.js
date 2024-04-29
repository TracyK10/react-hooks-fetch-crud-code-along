import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:4000/items")
    .then(res => res.json())
    .then(items => setItems(items))
  }, [])

  function handleAddItem(newItem){
    setItems([...items, newItem])
  }

  function handleUpdateItem(updatedItem){
    if(Item.id === updatedItem.id){
      return updatedItem
    } else{
      return Item
    }
    setItems(updatedItem)
  }

  function handleDeleteItem(deletedItem){
    const updatedItems = items.filter((item) => item.id !== deletedItem.id)
    setItems(updatedItems)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
