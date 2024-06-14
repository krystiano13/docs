export function Login() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-5 items-center justify-center">
      <h2 className="font-semibold text-3xl">Log In</h2>
      <form className="p-8 w-[90vw] md:w-96 pt-12 pb-12 rounded-lg violet-shadow bg-violet-50 flex flex-col justify-start gap-6">
        <div className="flex flex-col gap-3">
          <label className="text-lg font-medium" htmlFor="email">
            Email Address
          </label>
          <input
            className="text-lg transition p-2 focus:border-b-violet-300 border-b-violet-400 border-b-2 border-b-solid outline-none"
            type="text"
            placeholder="example@ex.com"
            required
            name="email"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label className="text-lg font-medium" htmlFor="password">
            Password
          </label>
          <input
            className="text-lg transition p-2 focus:border-b-violet-300 border-b-violet-400 border-b-2 border-b-solid outline-none"
            type="password"
            placeholder="password"
            required
            name="password"
          />
        </div>
        <button
          className="text-white font-medium hover:bg-violet-400 transition-colors bg-violet-500 p-2 pl-6 pr-6 rounded-sm"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
