import { createFileRoute } from "@tanstack/react-router";
import App from "@/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlaceMate — AI Placement Preparation Assistant" },
      {
        name: "description",
        content:
          "PlaceMate is an AI placement prep workspace: resume analysis, mock interviews, aptitude drills and role-specific career roadmaps.",
      },
      { property: "og:title", content: "PlaceMate — AI Placement Preparation Assistant" },
      {
        property: "og:description",
        content:
          "Get resume reviews, mock interview questions, aptitude plans and role roadmaps from Placy, your AI placement mentor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});
