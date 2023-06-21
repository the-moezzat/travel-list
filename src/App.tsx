import { useState } from 'react';

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Book', quantity: 5, packed: true },
];

type Item = (typeof initialItems)[0];

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

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItem }) {
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState('');

  const newItem = { id: Date.now(), description, quantity, packed: false };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    onAddItem(newItem);
    e.preventDefault();
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip</h3>
      <select onChange={(e) => setQuantity(+e.target.value)} value={quantity}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({
  items,
  onDeleteItem,
  onPackedItem,
  onClear,
}: {
  items: Item[];
}) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems: Item[];

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description')
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  if (sortBy === 'status')
    sortedItems = [...items].sort((a, b) => +a.packed - +b.packed);

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onPackedItem={onPackedItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value={'input'}>Sort by input</option>
          <option value={'description'}>Sort by description</option>
          <option value={'status'}>Sort by status</option>
        </select>
        <button
          onClick={() => {
            const confirmed = window.confirm(
              'Are you sure you need to clear the list'
            );
            if (confirmed) onClear();
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onPackedItem }: { item: Item }) {
  return (
    <li>
      <input
        type="checkbox"
        // checked={item.packed}
        onChange={(e) => onPackedItem(item.id, e.target.checked)}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }: { items: Item[] }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Add Some item to pack</em>
      </footer>
    );

  const itemsNum = items.length;
  const itemsPacked = items.reduce(
    (acc, curr) => (curr.packed ? acc + 1 : acc),
    0
  );
  const percentage = (itemsPacked / itemsNum) * 100;

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You're ready to go now, enjoy! ✈"
          : `💼 You have ${itemsNum} items on your list, and you already packed${' '}
        ${itemsPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

export default App;
