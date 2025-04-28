
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type MenuSearchProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export function MenuSearch({ searchTerm, setSearchTerm }: MenuSearchProps) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Search menu items..."
        className="pl-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
