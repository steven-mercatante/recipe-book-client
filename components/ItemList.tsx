import Markdown from "markdown-to-jsx";

interface Props {
  items: string[];
}

export default function ItemList({ items }: Props) {
  return (
    <div>
      <ul>
        {items.map((item, i) => {
          return (
            <li key={i}>
              <Markdown>{item}</Markdown>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
