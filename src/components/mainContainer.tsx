import Header from "../pages/headerPage";
import About from "../pages/aboutPage";
import Skills from "../pages/skillsPage";
import Contact from "../pages/contact";
import MainNav from "./mainNav";

const pagesId = ["about-page", "contact-page", "header-page", "skills-page"]

export default function MainContainer() {

  return (
    <div className="main-container custom-scrollbar">
      <MainNav />
      <Header />
      <Skills />
      <About />
      <Contact />
    </div>
  );
}
