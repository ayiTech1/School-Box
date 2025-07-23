import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface NavMainProps {
  items: NavItem[];
  activeClass: (href: string) => string;
}

export function NavMain({ items, activeClass }: NavMainProps) {
  const { url } = usePage();

  return (
    <SidebarGroup className="px-2 py-0">
      <SidebarMenu>
        {items.map((item) =>
          item.children && item.children.length > 0 ? (
            <DropdownNavItem key={item.title} item={item} currentUrl={url} />
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.href ? url.startsWith(item.href) : false}
                tooltip={{ children: item.title }}
              >
                <Link href={item.href || ''} prefetch>
                  {item.icon && <item.icon size={18} />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function DropdownNavItem({
  item,
  currentUrl,
}: {
  item: NavItem;
  currentUrl: string;
}) {
  // 👉 Detect active child automatically
  const isActive = item.children?.some(
    (child) => child.href && currentUrl.startsWith(child.href)
  );

  // 👉 Start open if a child is active
  const [open, setOpen] = useState(isActive);

  useEffect(() => {
    if (isActive) {
      setOpen(true);
    }
  }, [isActive]);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            {item.icon && <item.icon size={18} />}
            <span>{item.title}</span>
          </div>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </SidebarMenuButton>

      {open && (
        <div className="ml-4 mt-1 space-y-1">
          {item.children?.map((child) => (
            <SidebarMenuItem key={child.title}>
              <SidebarMenuButton
                asChild
                isActive={currentUrl.startsWith(child.href || '')}
                tooltip={{ children: child.title }}
              >
                <Link
                  href={child.href || '#'}
                  prefetch
                  className="flex items-center gap-2"
                >
                  {child.icon && <child.icon size={16} />}
                  <span>{child.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </div>
      )}
    </SidebarMenuItem>
  );
}
