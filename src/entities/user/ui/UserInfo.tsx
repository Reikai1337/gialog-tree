"use client";

import { signInWithGoogle, signOut } from "@shared/api/firebase/auth";
import { useUserStore, useUserStoreApi } from "../providers";
import Image from "next/image";
import { Button } from "@shared/ui/button";

export const UserInfo = () => {
  const user = useUserStore((s) => s.user);
  const isLoading = useUserStore((s) => s.isLoading);

  console.log("user STORE", user);

  const handleSignOut = () => {
    signOut();
  };

  const handleSignIn = () => {
    signInWithGoogle();
  };

  return (
    <div>
      {/* {isLoading ? <p>...................</p> : <p>Done</p>} */}
      {user ? (
        <>
          <div className="profile">
            <p>
              <Image
                height={40}
                width={40}
                src={user.photoURL || "/file.svg"}
                alt={user.email || ""}
              />
              {user.displayName}
            </p>

            <div className="menu">
              <li>
                <Button onClick={handleSignOut}>Sign Out</Button>
              </li>
            </div>
          </div>
        </>
      ) : (
        <div className="profile">
          <Button onClick={handleSignIn}>
            {/* <img src="/profile.svg" alt="A placeholder user image" /> */}
            Sign In with Google
          </Button>
        </div>
      )}
    </div>
  );
};

// ("use client");

// import {
//   onIdTokenChanged,
//   signInWithGoogle,
//   signOut,
// } from "@shared/api/firebase/auth";
// import { Button } from "@shared/ui/button";
// import { setCookie, deleteCookie } from "cookies-next";
// import { User } from "firebase/auth";
// import Image from "next/image";
// import { useEffect } from "react";

// export const AuthUser = () => {
//   const user = useUserSession();

//   return <div></div>;
// };
