import { Search } from "lucide-react";
import { Input } from "@/components/ui/forms/input.tsx";
import { User } from "@/types/models/user.ts";
import {useLocalStorage} from "@uidotdev/usehooks";

export type HeaderProps = {
  query?: string | null;
  setQuery?: (query: string) => void;
};

const Header = ({ query = null, setQuery = () => {} }: HeaderProps) => {
  const [user] = useLocalStorage<User | null>('login')

  return <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
    <div className="flex justify-between items-center w-full">
      <div className="text-2xl font-semibold text-foreground">
        <h1 className="text-2xl font-bold text-pink-500">RubyBox</h1>
      </div>
      {query != null && (
        <div className="relative mr-4 flex items-center w-1/2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
          <Input
            placeholder="Buscar productos..."
            className="w-full pl-10"
            onChange={(e) => setQuery(e.target.value)}
            value={query || ""}
          />
        </div>
      )}
      <button className="flex items-center ml-4 text-sm font-medium text-foreground hover:text-accent">
        <img className="w-8 h-8 rounded-full mr-2" src={user?.avatar} alt="Avatar del usuario"/>
        {user?.name}
      </button>
    </div>
  </header>
};

export default Header;