import { Gem } from "lucide-react";
import { ModeToggle } from "../mode-toggle/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = () => {
  return (
      <nav className="w-full flex justify-between bg-background p-4 border-b-2">
      <div>
        <Gem size={36} className="text-foreground"/>
          </div>
          
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Header;
 