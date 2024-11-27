import React from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

type Props = {
     setSearchValue: (value: string) => void;
}

const SearchUser: React.FC<Props> = ({ setSearchValue }) => {
     return (
          <div className="relative w-full">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
               <Input
                    type="text"
                    placeholder="Search user by name or email..."
                    className="pl-10"
                    onChange={(e) => setSearchValue(e.target.value)}
               />
          </div>
     );
};

export default SearchUser;
