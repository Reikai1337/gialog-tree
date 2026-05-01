import { LandingLayout } from "@app/layouts/Landing";
import { AuthProvider } from "@app/providers/auth";
import { UserInfo } from "@entities/user";

export const HomePage = async () => {
  return (
    <AuthProvider>
      <LandingLayout>
        <h1>home</h1>
        <UserInfo />
      </LandingLayout>
    </AuthProvider>
  );
};
