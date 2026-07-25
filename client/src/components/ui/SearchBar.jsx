import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-80">
      <Search className="absolute left-4 top-3 text-slate-400" size={18} />

      <input
        placeholder="Search..."
        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-blue-500"
      />
    </div>
  );
}
