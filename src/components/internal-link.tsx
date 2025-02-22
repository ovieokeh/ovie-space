import Link from "next/link";

interface InternalLinkProps {
  icon?: React.ReactNode;
  href: string;
  title: string;
  variant: "bold" | "normal";
}

export const InternalLink = ({ icon, href, title, variant }: InternalLinkProps) => {
  const variantClasses = {
    bold: "font-bold",
    normal: "",
  };
  return (
    <Link
      href={href}
      className={`border rounded-full border-solid border-transparent transition-colors flex items-center font-semibold justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 ${variantClasses[variant]}`}
    >
      {icon ? icon : null}
      <span>{title}</span>
    </Link>
  );
};
