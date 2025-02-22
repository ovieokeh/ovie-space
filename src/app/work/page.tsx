import { LuHouse, LuLinkedin } from "react-icons/lu";

import { ExternalLink } from "@/components/external-link";
import { InternalLink } from "@/components/internal-link";
import { text } from "@/copy/work";
import Image from "next/image";

export default function Books() {
  return (
    <div className="w-full h-[87vh] flex flex-col">
      <main className="flex flex-col items-center sm:items-start mx-auto mt-16 md:mt-64">
        <Image className="z-20" src="/images/dog-greeting.png" alt="Next.js logo" width={160} height={160} priority />

        <div className="z-10 p-4 px-12 border-t-4 gap-8 flex flex-col pt-12 border-black -mt-12 bg-container-bg rounded-lg">
          <h1 className="text-center sm:text-left text-3xl sm:text-4xl font-bold">{text.intro.title}</h1>
          <h3 className="text-center sm:text-left text-lg sm:text-xl text-body-text  max-w-[60ch]">
            {text.intro.description}
          </h3>
          <InternalLink icon={<LuHouse className="size-5" />} href="/" title="Home" variant="bold" />
          <ExternalLink
            icon={<LuLinkedin className="size-5" />}
            href="https://linkedin.com/in/ovieokeh"
            title="LinkedIn"
            variant="bold"
          />
        </div>
      </main>
    </div>
  );
}
