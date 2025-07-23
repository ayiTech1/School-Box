import React from "react";
import { Filter, Search, Eye } from "lucide-react";

interface ProductTableToolbarProps {
  title?: string;
  onFilterClick?: () => void;
  onSearchClick?: () => void;
  onSeeAllClick?: () => void;
}

const ProductTableToolbar: React.FC<ProductTableToolbarProps> = ({
  title = "Products",
  onFilterClick,
  onSearchClick,
  onSeeAllClick,
}) => {
  return (
    <div className="flex items-center justify-between w-full mb-4">
      {/* Left: Page Title */}
      <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
        <span>{title}</span>
      </div>
      {/* Right: Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onFilterClick}
          className="flex items-center gap-1 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
        >
          <Filter size={18} className="mr-1" />
          Filter
        </button>
        <button
          type="button"
          onClick={onSearchClick}
          className="flex items-center gap-1 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium"
        >
          <Search size={18} className="mr-1" />
          Search
        </button>
        <button
          type="button"
          onClick={onSeeAllClick}
          className="flex items-center gap-1 px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-medium"
        >
          <Eye size={18} className="mr-1" />
          See All
        </button>
      </div>
    </div>
  );
};

export default ProductTableToolbar;