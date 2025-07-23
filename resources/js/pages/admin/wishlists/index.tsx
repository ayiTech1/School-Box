import { CustomTable } from '@/components/custom-table';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { WishlistListTableFullConfig } from '@/config/tables/wishlists-table';

const breadcrumbs = [
  { title: 'Wishlists', href: '/admin/wishlists' },
];

export default function Index({ wishlists }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Wishlists" />
      <CustomTable
        columns={WishlistListTableFullConfig}
        data={wishlists.data}
        from={wishlists.from}
      />
      <Pagination products={wishlists} />
    </AppLayout>
  );
}