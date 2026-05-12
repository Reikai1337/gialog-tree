import { SignInButton } from "./SignInButton";

export const LoginPage = () => {
  return (
    <div className="h-full flex flex-col gap-10 items-center justify-center">
      <h1 className="text-4xl text-center">Sign in with Google</h1>
      <SignInButton />
    </div>
  );
};
