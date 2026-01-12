import { globalContent } from "@/content/global";

export const Footer = () => {
  return (
    <footer className="border-t border-border mt-20">
      <div className="container mx-auto px-6 py-12 text-center text-muted-foreground">
        <p className="text-sm font-medium">{globalContent.footer.copyright}</p>
        <p className="text-xs mt-2 opacity-60">{globalContent.footer.location}</p>
      </div>
    </footer>
  );
};
