import { FaHeart } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="w-full py-4 px-2 flex items-center justify-center">
      <p className="text-body-text  text-sm flex items-center gap-1">
        With <FaHeart className="size-4 text-red-500" /> from <span className="font-bold">Ovie Okeh</span>
      </p>
    </footer>
  );
};
