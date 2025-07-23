import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import AppLogo from './app-logo';

// ✅ Lucide icons
import {
  LayoutDashboard,
  Image,
  Flag,
  Package,
  Layers,
  BadgeCheck,
  Truck,
  Receipt,
  Star,
  BarChart,
  FileText,
  Tag,
  MessageCircle,
  Ticket,
  User,
} from 'lucide-react';

// ✅ Grouped nav config
export const groupedNavItems = [
  {
    label: 'General',
    items: [
      {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
      },
      {
        title: 'Media Manager',
        href: '/admin/media',
        icon: Image,
      },
    ],
  },
  {
    label: 'Banners',
    items: [
      {
        title: 'Banners',
        icon: Flag,
        children: [
          { title: 'Banner List', href: '/admin/banner', icon: Flag },
          { title: 'Add Banner', href: '/admin/banner-form', icon: Flag },
        ],
      },
    ],
  },
  {
    label: 'Shop',
    items: [
      {
        title: 'Products',
        icon: Package,
        children: [
          { title: 'Product List', href: '/admin/products', icon: Package },
          { title: 'Add Product', href: '/admin/products-form', icon: Package },
        ],
      },
      {
        title: 'Category',
        icon: Layers,
        children: [
          { title: 'Category List', href: '/admin/category', icon: Layers },
          { title: 'Add Category', href: '/admin/category-form', icon: Layers },
        ],
      },
      {
        title: 'Brands',
        icon: BadgeCheck,
        children: [
          { title: 'Brand List', href: '/admin/brand', icon: BadgeCheck },
          { title: 'Add Brand', href: '/admin/brand-form', icon: BadgeCheck },
        ],
      },
      {
        title: 'Shipping',
        icon: Truck,
        children: [
          { title: 'Shipping List', href: '/admin/shipping', icon: Truck },
          { title: 'Add Shipping', href: '/admin/shipping-form', icon: Truck },
        ],
      },
      { title: 'Orders', href: '/admin/orders', icon: Receipt },
      { title: 'Reviews', href: '/admin/reviews', icon: Star },
      { title: 'Analytics', href: '/admin/analytics', icon: BarChart },
    ],
  },
  {
    label: 'Posts',
    items: [
      {
        title: 'Posts',
        icon: FileText,
        children: [
          { title: 'Post List', href: '/admin/post', icon: FileText },
          { title: 'Add Post', href: '/admin/post-form', icon: FileText },
        ],
      },
      {
        title: 'Tags',
        icon: Tag,
        children: [
          { title: 'Tag List', href: '/admin/tag', icon: Tag },
          { title: 'Add Tag', href: '/admin/tag-form', icon: Tag },
        ],
      },
      { title: 'Comments', href: '/admin/comments', icon: MessageCircle },
    ],
  },
  {
    label: 'General Settings',
    items: [
      { title: 'Coupons', href: '/admin/coupons', icon: Ticket },
      { title: 'Users', href: '/admin/users', icon: User },
    ],
  },
];

export function AppSidebar() {
  const { url } = usePage();

  const isActive = (href: string) =>
    url.startsWith(href) ? 'bg-blue-500 text-white' : '';

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-neutral-800"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard" prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {groupedNavItems.map((group) => (
          <div key={group.label} className="mb-4">
            <h4 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-300 mb-2 border-b border-gray-200 dark:border-neutral-700 pb-1">
              {group.label}
            </h4>
            <NavMain items={group.items} activeClass={isActive} />
          </div>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
