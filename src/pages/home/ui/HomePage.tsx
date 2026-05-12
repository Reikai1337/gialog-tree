import { LandingLayout } from "@app/layouts/Landing";
import { UserInfo } from "@entities/user";

export const HomePage = async () => {
  return (
    <LandingLayout>
      <h1>home</h1>
      <UserInfo />
    </LandingLayout>
  );
};
