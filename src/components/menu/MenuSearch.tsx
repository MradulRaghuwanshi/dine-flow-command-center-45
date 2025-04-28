
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

type MenuSearchProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

export function MenuSearch({ searchTerm, setSearchTerm }: MenuSearchProps) {
  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Search menu items..."
        className="pl-10 pr-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400"
          onClick={handleClearSearch}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
