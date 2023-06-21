import { useState } from 'react';

export function Form({ onAddItem }) {
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
