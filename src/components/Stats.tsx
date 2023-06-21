import { Item, Item } from './Item';

export function Stats({ items }: { items: Item[] }) {
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
