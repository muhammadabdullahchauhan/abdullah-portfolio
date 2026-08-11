import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { ApiArchitecture } from "@/components/sections/ApiArchitecture";
import {
  AuthSection,
  BuildingInPublic,
  Certificates,
  Contact,
  DatabaseSection,
  Education,
  Footer,
  Process,
  Services,
} from "@/components/sections/Extras";
import { PERSON } from "@/data/portfolio";

const title = `${PERSON.name} — MERN Stack Software Engineer`;
const description =
  "Full-stack MERN engineer building scalable web applications with React, Node.js, Express and MongoDB — architecture, APIs and interfaces in one place.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: PERSON.name,
          jobTitle: PERSON.title,
          email: `mailto:${PERSON.email}`,
          sameAs: [PERSON.github, PERSON.linkedin],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <ApiArchitecture />
        <DatabaseSection />
        <AuthSection />
        <Services />
        <Process />
        <Education />
        <Certificates />
        <BuildingInPublic />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
