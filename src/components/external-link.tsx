interface ExternalLinkProps {
  icon: React.ReactNode;
  href: string;
  title: string;
  variant: "bold" | "normal";
}
export const ExternalLink = ({ icon, href, title, variant }: ExternalLinkProps) => {
  const variantClasses = {
    bold: "font-bold",
    normal: "",
  };
  return (
    <a
      className={`border rounded-full border-solid border-transparent transition-colors flex items-center font-semibold justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5
      ${variantClasses[variant]}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
      <span className="mt-1">{title}</span>
    </a>
  );
};
