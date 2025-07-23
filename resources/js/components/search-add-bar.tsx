import { Input } from '@/components/ui/input';
import { X, CirclePlusIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface SearchAddBarProps {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  addLabel: string;
  addHref?: string; 
  onAddClick?: () => void; 
  placeholder?: string;
}

export default function SearchAddBar({
  searchValue,
  onSearchChange,
  onReset,
  addLabel,
  addHref,
  onAddClick,
  placeholder = 'Search...',
}: SearchAddBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 mb-4 w-full">
      <Input
        value={searchValue}
        onChange={onSearchChange}
        className="h-10 w-1/2"
        type="text"
        placeholder={placeholder}
        name="search"
      />

      <button
        onClick={onReset}
        className="h-10 px-3 bg-red-600 text-white rounded hover:bg-red-500"
      >
        <X size={20} />
      </button>

      <div className="ml-auto">
        {addHref ? (
          <Link
            href={addHref}
            className="flex items-center bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90"
            as="button"
          >
            <CirclePlusIcon className="me-2" />
            {addLabel}
          </Link>
        ) : (
          <button
            onClick={onAddClick}
            className="flex items-center bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90"
          >
            <CirclePlusIcon className="me-2" />
            {addLabel}
          </button>
        )}
      </div>
    </div>
  );
}
