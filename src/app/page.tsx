import Image from "next/image";

import { text } from "@/copy/homepage";
import { InternalLink } from "@/components/internal-link";
import { LuLibrary, LuHeadphones, LuPen } from "react-icons/lu";

export default function Home() {
  return (
    <div className="w-full h-[88vh] flex flex-col">
      <main className="flex flex-col items-center sm:items-start mx-auto mt-16 md:mt-64">
        <Image className="z-20" src="/images/dog-greeting.png" alt="Next.js logo" width={160} height={160} priority />

        <div className="z-10 p-4 px-12 border-t-4 gap-8 flex flex-col pt-12 border-black -mt-12 bg-container-bg rounded-lg">
          <h1 className="text-center sm:text-left text-3xl sm:text-4xl font-bold">{text.intro.title}</h1>
          <h3 className="text-center sm:text-left text-lg sm:text-xl text-body-text max-w-[60ch]">
            {text.intro.description}
          </h3>
          <div className="flex gap-4 items-center flex-col sm:flex-row mt-6">
            <InternalLink
              icon={<LuHeadphones className="size-5" />}
              href="/music"
              title="Music and Media"
              variant="bold"
            />
            <InternalLink icon={<LuLibrary className="size-5" />} href="/books" title="Books" variant="bold" />
            <InternalLink icon={<LuPen className="size-5" />} href="/work" title="Work & Projects" variant="bold" />
          </div>
        </div>
      </main>
    </div>
  );
}
