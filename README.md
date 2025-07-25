# StudyM8

Your AI-powered study assistant for creating personalized, actionable study plans based on your uploaded materials and individual schedule.

[Live Demo](https://studym8.vercel.app/)

## Overview

Automated Study Planner helps you organize your study routine efficiently. Upload your study material, specify your availability, and let the AI generate a weekly plan tailored to your needs. Track your progress, view upcoming sessions in a calendar, and mark plans as completed.

## Features

- **Smart Study Plan Generation:** Upload documents and get a custom study schedule based on their content and your availability.
- **Calendar View:** Visualize your study plan by days and hours, broken down by topic and session.
- **Progress Tracking:** Mark plans as completed and download them as PDF for offline use.
- **Personalized Notifications:** Receive email notifications when your study plan is ready or updated.
- **Flexible Scheduling:** Avoids busy times and only schedules sessions in your available slots.
- **Profile Management:** Track all your study plans and completion status.

## How It Works

1. **Upload Material:** Select and upload your study file.
2. **Review Summary:** The app provides an automatic summary with details (number of pages, words, file name, size).
3. **Generate Plan:** Click "Create Study Plan" and specify your available study times.
4. **Calendar Visualization:** View your study plan in a calendar, showing session times for each topic.
5. **Complete & Export:** Mark the plan as completed and download it as a PDF.
6. **Notifications:** Check your email for updates and links to your plan.

## Example API Usage

The backend uses AI (Google Gemini) to generate study plans in JSON format:

```json
[
  { "topic": "Topic Name", "dueDate": "2025-06-11T10:00:00Z" }
]
```

Availability and busy times are factored in, ensuring sessions are scheduled at optimal times.

## Technologies

- **TypeScript**
- **Next.js**
- **MongoDB (Mongoose)**
- **Google Gemini AI**
- **Vercel Deployment**

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/Benjamin-chidera/automated-study-planner.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see `.env.example`):
   - `GEMINI_API_KEY`
   - MongoDB credentials
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project currently does not have a license attached.

---

Built by [Benjamin-chidera](https://github.com/Benjamin-chidera)
