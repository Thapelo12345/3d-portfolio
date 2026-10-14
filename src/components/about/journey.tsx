import JourneySection from "./journeySections";

export default function Journey() {
  return (
    <div className="custom-scrollbar lg:ml-40 w-screen lg:w-[70%] h-[90%] rounded-2xl">
      <h2 className="text-white text-center text-2xl ">
        My <span className="text-blue-400"> Journey</span>
      </h2>

      <div className="w-full lg:w-[97%] h-[87%] lg:m-4 [scroll-snap-type:y_mandatory] overflow-x-hidden overflow-y-auto">
        <JourneySection
          alignment="right"
          title1="Sta"
          title2="rted"
          sectionNumber={1}
          sectionDescription="My journey into web development began in 2019, when I first discovered freeCodeCamp and decided to take my first steps into the world of coding. I started with the fundamentals, learning HTML and CSS, and before long I was building a few simple web pages of my own. That early success sparked a deeper curiosity, leading me to learn the React framework and expand my skills on the front end. From there, I felt ready to explore what happens behind the scenes, so I moved into back-end development, where I was introduced to Node.js and Express. What started as a simple curiosity on freeCodeCamp has since grown into a full-stack journey, and I'm excited to keep building on everything I've learned so far."
        />

        <JourneySection
          alignment="left"
          title1="Curre"
          title2="ntly"
          sectionNumber={2}
          sectionDescription="Currently, I'm focused on expanding my skill set in several exciting directions. I'm diving into the world of AI and large language models, exploring how they work and how they can be integrated into modern applications. At the same time, I'm actively improving my React Native mobile app, refining its features and user experience. Alongside these projects, I'm sharpening my software testing skills using Jest and Playwright, since I believe writing reliable, well-tested code is essential for any developer. And through all of this, I'm eagerly searching for my first permanent entry-level position as a junior web developer, ready to bring my passion, dedication, and growing expertise to a team where I can contribute and continue to learn."
        />

        <JourneySection
          alignment="right"
          title1="Future-"
          title2="Plans"
          sectionNumber={3}
          sectionDescription="Looking ahead, I have a clear vision for where I want my journey to take me. My goal is to pursue a Master's degree in Software Engineering and AI, deepening my knowledge and positioning myself at the forefront of these rapidly evolving fields. Beyond the degree itself, I'm driven by a bigger ambition: finding innovative ways to integrate AI into modern technologies, particularly in areas like cars and planes, where intelligent systems can make transportation safer, smarter, and more efficient. I want to be part of the generation of developers who don't just use AI, but who reshape how it works alongside the technology we rely on every day. With the foundation I'm building now and the direction I'm headed, I'm confident that this future is not just a dream, but a destination I'm steadily working toward."
        />
      </div>
    </div>
  );
}