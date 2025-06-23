// src/app/actions/jobs.ts
import { connectDB } from "@/lib/connect";
import { Planner } from "@/models/planner";
import sendEmail from "@/utils/sendEmail";

// interface ItemProps {
//   topic: string;
//   dueDate: Date;
//   notified: boolean;
//   _id: string;
// }

// export const notifyDuePlans = async () => {
//   await connectDB();

//   const planners = await Planner.find({
//     "studyPlan.dueDate": { $lte: new Date() },
//     "studyPlan.notified": false,
//   }).populate("userId");

//   for (const planner of planners) {
//     const user = planner.userId;
//     if (!user?.email) continue;

//     const updatedStudyPlan = planner.studyPlan.map((item: ItemProps) => {
//       if (item.dueDate && item.dueDate <= new Date() && !item.notified) {
//         // Send email
//         sendEmail({
//           to: user.email,
//           subject: `Reminder: ${item.topic}`,
//           template: "genericEmail.hbs",
//           context: {
//             subject: "Study Reminder",
//             header: `Hey ${user.fullname}, it's time to study!`,
//             body: `Topic: ${item.topic}`,
//             ctaText: "Uploaded Material",
//             ctaLink: `https://automated-study-planner.vercel.app/uploaded-materials`,
//             logoUrl:
//               "https://res.cloudinary.com/dwsc0velt/image/upload/v1750507488/Automated_study_planner/StudyMate-Photoroom_hyhgtl.png",
//             date: new Date().getFullYear(),
//           },
//         });

//         return { ...item, notified: true };
//       }
//       return item;
//     });

//     await Planner.findByIdAndUpdate(planner._id, {
//       $set: { studyPlan: updatedStudyPlan },
//     });
//   }
// };

export const notifyDuePlans = async () => {
  await connectDB();

  const planners = await Planner.find({
    "studyPlan.dueDate": { $lte: new Date() },
    "studyPlan.notified": false,
  }).populate("userId");

  for (const planner of planners) {
    const user = planner.userId;
    if (!user?.email) continue;

    let modified = false;

    for (const item of planner.studyPlan) {
      if (item.dueDate && item.dueDate <= new Date() && !item.notified) {
        // Send email
        sendEmail({
          to: user.email,
          subject: `Reminder: ${item.topic}`,
          template: "genericEmail",
          context: {
            subject: "Study Reminder",
            header: `Hey ${user.fullname}, it's time to study!`,
            body: `Topic: ${item.topic}`,
            ctaText: "Uploaded Material",
            ctaLink: `https://automated-study-planner.vercel.app/uploaded-materials`,
            logoUrl:
              "https://res.cloudinary.com/dwsc0velt/image/upload/v1750507488/Automated_study_planner/StudyMate-Photoroom_hyhgtl.png",
            date: new Date().getFullYear(),
          },
        });

        item.notified = true; 
        modified = true;
      }
    }

    if (modified) {
      await planner.save();
    }
  }
};
