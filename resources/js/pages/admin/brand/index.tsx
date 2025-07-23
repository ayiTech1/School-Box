import { CustomTable } from '@/components/custom-table';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BrandListTableFullConfig } from '@/config/tables/brands-table';

const breadcrumbs = [
  { title: 'Brands', href: '/admin/brands' },
];

export default function Index({ brands }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Brands" />
      <CustomTable
        columns={BrandListTableFullConfig}
        data={brands.data}
        from={brands.from}
      />
      <Pagination products={brands} />
    </AppLayout>
  );
}