export type HighlightTextProps = {
  text: string;
  highlight: string;
};

export const HighlightText = ({ text, highlight }: HighlightTextProps) => {
  if (!highlight) return <span>{text}</span>;

  const parts = text.split(new RegExp(`(${highlight})`, "gi"));

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight?.toLowerCase() ? (
          <span key={index} className="text-primary-700">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};
