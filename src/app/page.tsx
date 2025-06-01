import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Image from "next/image";

export default function Home() {
  
  return (
    <main>
      {/* hero section */}
      <section className="relative h-[500px] w-full">
        <Image
          src="/hero-img.jpg"
          alt="Hero image"
          fill
          className="object-cover object-center rounded-2xl"
          priority
        />

        {/* Overlay text container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 bg-black/40 rounded-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            AI-Powered Study Planner
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90">
            Upload your screenshots, get a smart study plan.
          </p>

          <Button className="bg-blue-600 hover:bg-blue-700 text-white w-40 h-10 mt-5 z-10 shadow-md transition duration-300 cursor-pointer font-bold">
            Start Planning
          </Button>
        </div>
      </section>

      {/* how it works */}
      <section className=" mt-7 px-4">
        <h1 className="font-bold text-2xl mb-6 text-left text-gray-800">
          How It Works
        </h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5">
          <div className="flex flex-col items-center text-center gap-3 border border-gray-300 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            <Upload size={32} className="text-indigo-600" />
            <h3 className="font-bold text-lg text-gray-700">Upload</h3>
            <p className="text-sm text-gray-500">
              Add screenshots or lecture slides
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-3 border border-gray-300 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            <Upload size={32} className="text-indigo-600" />
            <h3 className="font-bold text-lg text-gray-700">Extract</h3>
            <p className="text-sm text-gray-500">
              AI extracts and summarizes your content
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-3 border border-gray-300 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            <Upload size={32} className="text-indigo-600" />
            <h3 className="font-bold text-lg text-gray-700">Plan</h3>
            <p className="text-sm text-gray-500">
              Generate a smart, personalized study plan
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-3 border border-gray-300 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            <Upload size={32} className="text-indigo-600" />
            <h3 className="font-bold text-lg text-gray-700">Track</h3>
            <p className="text-sm text-gray-500">
              Mark tasks done and tweak your schedule
            </p>
          </div>
        </div>
      </section>

      {/* why use this app */}

      <section className=" mt-10 px-4">
        <h1 className="font-bold text-2xl mb-6 text-left text-gray-800 capitalize">
          Why use this app
        </h1>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
          <div className="flex flex-col items-center text-center gap-3 border border-gray-300 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            <Upload size={32} className="text-indigo-600" />
            <h3 className="font-bold text-lg text-gray-700">Track</h3>
            <p className="text-sm text-gray-500">
              Mark tasks done and tweak your schedule
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-3 border border-gray-300 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            <Upload size={32} className="text-indigo-600" />
            <h3 className="font-bold text-lg text-gray-700">Track</h3>
            <p className="text-sm text-gray-500">
              Mark tasks done and tweak your schedule
            </p>
          </div>

          <div className="flex flex-col items-center text-center gap-3 border border-gray-300 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition">
            <Upload size={32} className="text-indigo-600" />
            <h3 className="font-bold text-lg text-gray-700">Track</h3>
            <p className="text-sm text-gray-500">
              Mark tasks done and tweak your schedule
            </p>
          </div>
        </div>
      </section>

      {/* ready */}
      <section className="mt-20 text-center">
        <h1 className="font-black text-4xl text-gray-800 capitalize text-center">
          Ready to take control of your studies?
        </h1>

        <p className=" text-center mt-3">
          Get started today and experience the power of AI-driven study planing
        </p>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-40 h-10 mt-5 z-10 shadow-md transition duration-300 cursor-pointer font-bold">
          Start Planning
        </Button>
      </section>
    </main>
  );
}
