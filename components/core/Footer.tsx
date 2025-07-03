import { globalContent } from "@/content/global";

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800">
      <div className="container mx-auto px-6 py-8 text-center text-slate-500">
        <p>{globalContent.footer.copyright}</p>
        <p className="text-sm mt-2">{globalContent.footer.location}</p>
      </div>
    </footer>
  );
};
