import { useState } from 'react';
import { Logo } from './Logo';
import { Stats } from './Stats';
import { PackingList } from './PackingList';
import { Form } from './Form';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Book', quantity: 5, packed: true },
];

export type Item = (typeof initialItems)[0];

function App() {
  const [items, setItems] = useState<Item[]>([]);

  function handleAddItem(newItem: Item) {
    setItems((item) => [...item, newItem]);
  }

  function handleDeleteItem(id: number) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handlePackedItem(id: number, status: boolean) {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, packed: status } : item))
    );
  }

  function handleClearItems() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onPackedItem={handlePackedItem}
        onClear={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
