import { useState, useRef } from 'react';
import { Bell } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useClickOutside } from '@/hooks/use-click-outside';

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative hover:text-blue-600"
      >
        <Bell size={20} />
        <span className="absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-md border border-gray-200 bg-white shadow-lg z-50 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="p-4 font-semibold border-b border-gray-200 dark:border-neutral-700 dark:text-white">
            Notifications
          </div>
          <ul className="max-h-60 overflow-y-auto">
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-100">
              🔔 New order received
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-100">
              🔔 Stock running low
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:text-neutral-100">
              🔔 New user registered
            </li>
          </ul>
          <div className="border-t border-gray-200 dark:border-neutral-700 px-4 py-2 text-sm text-blue-600 hover:underline">
            <Link href="/admin/notifications">View all</Link>
          </div>
        </div>
      )}
    </div>
  );
}
