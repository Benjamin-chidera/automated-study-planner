import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main className=" space-y-14">
      <section>
        <h1 className=" font-bold text-xl md:text-3xl">About This App</h1>

        <p className=" mt-2 text-gray-600 text-lg">
          Helping students plan smarter with AI.
        </p>

        <p className=" mt-2 text-lg">
          The StudyMate is a web app designed to assist students in transforming
          images, PDF or screenshots of lecture slides, textbooks, or notes into
          structured, weekly study plans, leveraging the power of AI and OCR.
        </p>
      </section>

      <section>
        <h1 className=" font-bold text-xl md:text-3xl">Key Features</h1>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-7">
          <div className="w-full space-y-3">
            <Image
              src="/study-materials.png"
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px]"
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
              src={"/summary-img.png"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px]"
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
              src={"/plan-img.png"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px]"
            />

            <h1 className=" font-medium text-lg md:text-2xl">Weekly Planner</h1>

            <p className=" text-lg text-gray-600 max-w-[300px]">
              Visualize your study schedule with our intuitive weekly planner,
              featuring drag-and-drop task management.
            </p>
          </div>

          <div className=" space-y-3">
            <Image
              src={"/goal-img.png"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px]"
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
            src={"/summary-arrow.png"}
            alt="Study materials"
            height={50}
            width={50}
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
              src={"/struggle-img.png"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px]"
            />

            <h1 className=" font-medium text-lg md:text-2xl">
              Struggling to study
            </h1>
          </div>

          <div className=" space-y-3">
            <Image
              src={"/book-img.png"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px]"
            />

            <h1 className=" font-medium text-lg md:text-2xl">
              Meeting the StudyMate
            </h1>
          </div>

          <div className=" space-y-3">
            <Image
              src={"/peace-img.png"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px]"
            />

            <h1 className=" font-medium text-lg md:text-2xl">
              Peace of mind using it
            </h1>
          </div>

          <div className=" space-y-3">
            <Image
              src={"/happy-img.png"}
              alt="Study materials"
              height={500}
              width={500}
              quality={100}
              className="w-full h-auto max-w-full object-contain sm:w-[300px] lg:w-[340px] rounded-2xl"
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
          StudyMate was created by <strong>Benjamin Chidera</strong>, a student
          in the MSc Computer Science program at the University of Dundee.
          Driven by a passion for improving the student experience,
          <strong> Benjamin</strong> developed this app to help students manage
          their studies more effectively.
        </p>
      </section>
    </main>
  );
};

export default page;
