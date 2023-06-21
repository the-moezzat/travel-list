export function Item({ item, onDeleteItem, onPackedItem }: { item: Item }) {
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
