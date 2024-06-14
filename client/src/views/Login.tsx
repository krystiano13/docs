export function Login() {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col gap-3 items-center justify-center">
      <h2>Log In</h2>
      <form>
        <label htmlFor="email">Email Address</label>
        <input type="text" placeholder="example@ex.com" required name="email" />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="password"
          required
          name="password"
        />
      </form>
    </div>
  );
}
