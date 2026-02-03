import { Components } from "react-markdown";

export const markdownComponents = {
  p: ({ ...props }) => <p {...props} className="text-foreground leading-relaxed text-sm my-2" />,
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      {...props}
      className="text-foreground/80 hover:text-foreground underline transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
} satisfies Components;
