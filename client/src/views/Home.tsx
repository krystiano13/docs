import hero from "../assets/images/hero.png";

export function Home() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-around items-center">
      <section className="w-3/5 h-full flex flex-col gap-8 items-start justify-center p-12">
        <h1 className="text-8xl font-medium">Docs Online</h1>
        <p className="text-3xl font-regular">All your docs in one place</p>
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
