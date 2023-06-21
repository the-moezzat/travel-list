import { useState } from 'react';
import { Item } from './Item';

export function PackingList({
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
