"use client";

import { LogOutIcon, UserIcon, User as ProfileIcon, LogIn } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import { Button } from "@shared/ui/button";
import { useUserStore } from "@entities/user";
import { Spinner } from "@shared/ui/spinner";
import { useAuth } from "@features/auth";

const Trigger = () => {
  const isLoading = useUserStore((s) => s.isLoading);

  return (
    <DropdownMenuTrigger asChild disabled={isLoading}>
      <Button disabled={isLoading} size="icon" variant="outline">
        {isLoading ? <Spinner /> : <ProfileIcon />}
      </Button>
    </DropdownMenuTrigger>
  );
};

const AuthMenuItems = () => {
  const isLoading = useUserStore((s) => s.isLoading);
  const user = useUserStore((s) => s.user);
  const { signOut } = useAuth();

  if (!user) return null;

  return (
    <>
      <DropdownMenuItem>
        <UserIcon /> {user.displayName}
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={signOut}
        disabled={isLoading}
        variant="destructive"
      >
        <LogOutIcon />
        Log out
      </DropdownMenuItem>
    </>
  );
};

const GuestItems = () => {
  const isLoading = useUserStore((s) => s.isLoading);
  const user = useUserStore((s) => s.user);
  const { signIn } = useAuth();

  if (user) return null;

  return (
    <>
      <DropdownMenuItem variant="success" onClick={signIn} disabled={isLoading}>
        <LogIn />
        Log in
      </DropdownMenuItem>
    </>
  );
};

export function DropdownMenuIcons() {
  return (
    <DropdownMenu>
      <Trigger />
      <DropdownMenuContent>
        <AuthMenuItems />
        <GuestItems />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
