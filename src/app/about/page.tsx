import Image from "next/image";
import React from "react";
// seo
import { Metadata } from "next";
import summaryImg from "../../../public/summary-img.jpg"
import summaryArrow from "../../../public/summary-arrow.png"

// this is for SEO purposes
export const metadata: Metadata = {
  title: "About - StudyM8",
  description:
    "Learn more about StudyM8 and our mission to simplify study planning.",
  keywords: ["StudyM8", "study planner", "student productivity"],
  openGraph: {
    title: "About - StudyM8",
    description: "We make study planning smarter and easier.",
    url: "https://studym8.vercel.app/about",
    siteName: "StudyM8",
    images: [
      {
        url: "https://studym8.vercel.app/study-materials.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About StudyM8",
    description:
      "StudyM8 helps students plan and track their study goals effectively.",
    images: ["https://studym8.vercel.app/study-materials.png"],
  },
};

const page = () => {
  return (
    <main className=" space-y-14">
      <section>
        <h1 className=" font-bold text-xl md:text-2xl">About This App</h1>

        <p className=" mt-2 text-gray-600 text-lg">
          Helping students plan smarter with AI.
        </p>

        <p className=" mt-2 text-lg">
          The StudyM8 is a web app designed to assist students in transforming
          images, PDF or screenshots of lecture slides, textbooks, or notes into
          structured, weekly study plans, leveraging the power of AI and OCR.
        </p>
      </section>

      <section>
        <h1 className=" font-bold text-xl md:text-2xl">Key Features</h1>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-7">
          <div className="w-full space-y-3">
            <Image
              src="/study-materials.jpg"
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              loading="lazy"
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px] rounded-xl"
            />

            <h1 className="font-medium text-lg md:text-2xl">
              Upload Study Material
            </h1>

            <p className="text-lg text-gray-600 max-w-sm mx-auto">
              Easily upload your study materials via a convenient drag-and-drop
              interface.
            </p>
          </div>

          <div className=" space-y-3">
            <Image
              src={summaryImg}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              loading="lazy"
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px] rounded-xl"
            />

            <h1 className=" font-medium text-lg md:text-2xl">
              AI-Generated Summaries
            </h1>

            <p className=" text-lg text-gray-600 max-w-[300px]">
              Our AI algorithms generate concise summaries and to-do lists from
              your uploaded content.
            </p>
          </div>

          <div className=" space-y-3">
            <Image
              src={"/plan-img.jpg"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              loading="lazy"
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px] rounded-xl"
            />

            <h1 className=" font-medium text-lg md:text-2xl">Weekly Planner</h1>

            <p className=" text-lg text-gray-600 max-w-[300px]">
              Visualize your study schedule with our intuitive weekly planner,
              featuring drag-and-drop task management.
            </p>
          </div>

          <div className=" space-y-3">
            <Image
              src={"/goal-img.jpg"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              loading="lazy"
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px] rounded-xl"
            />

            <h1 className=" font-medium text-lg md:text-2xl">
              Adjustable Study Goals
            </h1>

            <p className=" text-lg text-gray-600 max-w-[300px]">
              Customize your study goals and preferences to align with your
              academic objectives..
            </p>
          </div>
        </section>
      </section>

      <section>
        <h1 className=" font-bold text-xl md:text-3xl">Who Is It For?</h1>

        <p className=" mt-2 text-gray-600 text-lg">
          This app is tailored for university and college students, including
          online learners using platforms like MyDundee, who seek to enhance
          their time management skills and overcome information overload.
        </p>
      </section>

      <section className=" space-y-2">
        <h1 className=" font-bold text-xl md:text-3xl">How It Works</h1>

        <div className="flex items-center">
          <Image
            src={"/upload-arrow.png"}
            alt="Study materials"
            height={50}
            width={50}
            loading="lazy"
          />

          <div>
            <h1 className=" font-bold">Upload</h1>
            <p className=" font-medium text-gray-600">
              Upload your study materials.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src={summaryArrow}
            alt="Study materials"
            height={50}
            width={50}
            loading="lazy"
          />

          <div>
            <h1 className=" font-bold">Summarize</h1>
            <p className=" font-medium text-gray-600">
              AI summarizes key points.
            </p>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src={"/plan-arrow.png"}
            alt="Study materials"
            height={50}
            width={50}
            loading="lazy"
          />

          <div>
            <h1 className=" font-bold">Plan</h1>
            <p className=" font-medium text-gray-600">Get a weekly plan.</p>
          </div>
        </div>

        <div className="flex items-center">
          <Image
            src={"/adjust-arrow.png"}
            alt="Study materials"
            height={50}
            width={50}
            loading="lazy"
          />

          <div>
            <h1 className=" font-bold">Adjust</h1>
            <p className=" font-medium text-gray-600">
              Adjust to fit your needs.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h1 className=" font-bold text-xl md:text-3xl">Visual Journey</h1>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-7">
          <div className=" space-y-3">
            <Image
              src={"/struggle-img.jpg"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              loading="lazy"
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px] rounded-xl"
            />

            <h1 className=" font-medium text-lg md:text-2xl">
              Struggling to study
            </h1>
          </div>

          <div className=" space-y-3">
            <Image
              src={"/book-img.jpg"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              loading="lazy"
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px] rounded-xl"
            />

            <h1 className=" font-medium text-lg md:text-2xl">
              Meeting the StudyM8
            </h1>
          </div>

          <div className=" space-y-3">
            <Image
              src={"/peace-img.jpg"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              loading="lazy"
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px] rounded-xl"
            />

            <h1 className=" font-medium text-lg md:text-2xl">
              Peace of mind using it
            </h1>
          </div>

          <div className=" space-y-3">
            <Image
              src={"/happy-img.jpg"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              loading="lazy"
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px] rounded-xl"
            />

            <h1 className=" font-medium text-lg md:text-2xl">
              Happy and in control
            </h1>
          </div>
        </section>
      </section>

      <section>
        <h1 className=" font-bold text-xl md:text-3xl">Meet the Developer</h1>

        <p className=" mt-4 text-lg">
          StudyM8 was created by <strong>Benjamin Chidera</strong>, a student in
          the MSc Computer Science program at the University of Dundee. Driven
          by a passion for improving the student experience,
          <strong> Benjamin</strong> developed this app to help students manage
          their studies more effectively.
        </p>
      </section>
    </main>
  );
};

export default page;
