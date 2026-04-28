
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { logout } from "@/service/AuthService";
import { toast } from "sonner";

const ProfileDropdown = () => {
  const { user, setIsLoading } = useUser();

  const handleLogout = async () => {
    await logout();
    setIsLoading(true);
    toast.success("Logout successfully");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10">
          <AvatarImage
            className="rounded-full"
            src={user?.image || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-xl p-1 text-center">
          {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="w-full" href={`/dashboard`}>
              <Button variant="outline" className="w-full text-purple-700">
                Dashboard
              </Button>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            {user?.role && (
              <Link className="w-full" href={`/dashboard/my-profile`}>
                <Button variant="outline" className="w-full text-purple-700">
                  My Profile
                </Button>
              </Link>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full text-purple-700"
            >
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
