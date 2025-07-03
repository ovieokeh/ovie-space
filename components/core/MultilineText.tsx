export const MultilineText = ({ text }: { text: string }) => {
  return (
    <span>
      {text.split(`\n`).map((line, index) => (
        <span key={index}>
          {line}
          {index < text.split(`\n`).length - 1 && <br />}
        </span>
      ))}
    </span>
  );
};
