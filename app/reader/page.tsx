import ContentPage from "@/components/ContentPage";
import React from "react";

const latestArticles = [
  {
    title: "AI Helps Farmers Predict Monsoon-Driven Crop Risks",
    category: "Agriculture",
    date: "March 2, 2026",
    readTime: "4 min read",
    excerpt:
      "New forecasting tools combine weather models and local field data to improve planting decisions.",
  },
  {
    title: "Philippine Marine Labs Report New Coral Recovery Signs",
    category: "Environment",
    date: "March 1, 2026",
    readTime: "5 min read",
    excerpt:
      "Researchers observed improving reef health in pilot restoration zones across selected coastal sites.",
  },
  {
    title: "Student Robotics Teams Build Low-Cost Rescue Drones",
    category: "Innovation",
    date: "February 28, 2026",
    readTime: "6 min read",
    excerpt:
      "Campus engineering groups designed modular drones for emergency mapping and rapid response.",
  },
  {
    title: "Hospitals Expand Use of Remote Diagnostics in Rural Areas",
    category: "Health",
    date: "February 27, 2026",
    readTime: "4 min read",
    excerpt:
      "Telehealth programs now include AI-assisted triage and specialist referrals in underserved communities.",
  },
  {
    title: "Local Startup Turns Rice Waste Into Biodegradable Packaging",
    category: "Technology",
    date: "February 26, 2026",
    readTime: "3 min read",
    excerpt:
      "A new material process converts agricultural byproducts into packaging alternatives for SMEs.",
  },
  {
    title: "DOST Grants Back Young Researchers in Climate Adaptation",
    category: "Scholarships",
    date: "February 25, 2026",
    readTime: "5 min read",
    excerpt:
      "Six project teams received support for flood modeling, risk tools, and local resilience planning.",
  },
];

const page = () => {
  return (
    <main className="min-h-screen bg-[#f1f5f9] px-4 py-10">
      <section className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0f4e8b]">Reader</p>
            <h1 className="mt-1 text-3xl font-bold text-[#1f2937]">Latest Articles</h1>
          </div>
          <button className="rounded-md border border-[#bfdbfe] bg-white px-3 py-2 text-sm font-semibold text-[#0f4e8b] hover:bg-[#eff6ff]">
            View all
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <ContentPage
              key={article.title}
              title={article.title}
              category={article.category}
              date={article.date}
              readTime={article.readTime}
              excerpt={article.excerpt}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default page;
