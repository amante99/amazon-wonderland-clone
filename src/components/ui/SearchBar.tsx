
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative transition-all duration-300 ${
        isFocused ? "scale-[1.01] shadow-soft" : ""
      }`}
    >
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pl-4 pr-10 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
      <button 
        type="submit" 
        className="absolute right-0 top-0 h-full aspect-square flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
        aria-label="Search"
      >
        <Search size={18} />
      </button>
    </form>
  );
};
