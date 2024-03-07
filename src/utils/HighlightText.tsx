interface HighlightTextProps {
  text: string;
  highlight: string;
  color: string;
}
export const HighlightText = ({
  text,
  highlight,
  color,
}: HighlightTextProps) => {
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} style={{ backgroundColor: color }}>
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};
