import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { About, Skills, Experience, Achievements, Contact } from "@/components/Sections";
import Projects from "@/components/projects/Showcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
