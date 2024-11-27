"use client";

import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
     DropdownMenu,
     DropdownMenuCheckboxItem,
     DropdownMenuContent,
     DropdownMenuLabel,
     DropdownMenuSeparator,
     DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FilterItemType = "active" | "inactive" | "all" | "manager" | "hr" | "developer" | "tester" | "analyst";

const filterLabels: Record<FilterItemType, string> = {
     all: "All Users",
     active: "Active Users",
     inactive: "Inactive Users",
     manager: "Managers",
     hr: "HR",
     developer: "Developers",
     tester: "Testers",
     analyst: "Analysts",
};

type props = {
     filteredValue: FilterItemType;
     setFilteredValue: (value: FilterItemType) => void;
}

const UserFilter: React.FC<props> = ({ filteredValue, setFilteredValue }) => {
     const filterItems: FilterItemType[] = ["all", "active", "inactive", "manager", "hr", "developer", "tester", "analyst"];
     return (
          <DropdownMenu>
               <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-[180px] justify-start">
                         <Filter className="mr-2 h-4 w-4" />
                         {filterLabels[filteredValue]}
                    </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Filter by Status and Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {filterItems.map((item) => (
                         <DropdownMenuCheckboxItem
                              key={item}
                              checked={filteredValue === item}
                              onCheckedChange={() => setFilteredValue(item)}
                              className="capitalize"
                         >
                              {filterLabels[item]}
                         </DropdownMenuCheckboxItem>
                    ))}
               </DropdownMenuContent>
          </DropdownMenu>
     );
};

export default UserFilter;
