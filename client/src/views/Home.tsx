import hero from "../assets/images/hero.png";

export function Home() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col-reverse md:flex-row justify-around items-center">
      <section className="w-3/5 h-full flex flex-col gap-8 items-center md:items-start justify-center p-8 md:p-12">
        <h1 className="text-6xl md:text-8xl text-center md:text-left font-medium">
          Docs Online
        </h1>
        <p className="text-2xl md:text-3xl text-center md:text-left font-regular">
          All your docs in one place
        </p>
        <button className="cursor-pointer p-2 pl-6 pr-6 text-xl text-white bg-violet-600 hover:bg-violet-500">
          Get Started
        </button>
      </section>
      <section className="w-2/5 h-full flex items-center justify-center">
        <img
          className="brightness-90"
          src={hero}
          alt="hero image with documents"
        />
      </section>
    </div>
  );
}
