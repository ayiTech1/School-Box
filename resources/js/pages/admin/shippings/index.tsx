import { CustomTable } from '@/components/custom-table';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ShippingListTableFullConfig } from '@/config/tables/shippings-table';

const breadcrumbs = [
  { title: 'Shippings', href: '/admin/shippings' },
];

export default function Index({ shippings }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Shippings" />
      <CustomTable
        columns={ShippingListTableFullConfig}
        data={shippings.data}
        from={shippings.from}
      />
      <Pagination products={shippings} />
    </AppLayout>
  );
}