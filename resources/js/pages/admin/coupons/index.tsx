import { CustomTable } from '@/components/custom-table';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { CouponListTableFullConfig } from '@/config/tables/coupons-table';

const breadcrumbs = [
  { title: 'Coupons', href: '/admin/coupons' },
];

export default function Index({ coupons }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Coupons" />
      <CustomTable
        columns={CouponListTableFullConfig}
        data={coupons.data}
        from={coupons.from}
      />
      <Pagination products={coupons} />
    </AppLayout>
  );
}