import { CustomTable } from '@/components/custom-table';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { ReviewListTableFullConfig } from '@/config/tables/reviews-table';

const breadcrumbs = [
  { title: 'Reviews', href: '/admin/reviews' },
];

export default function Index({ reviews }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Reviews" />
      <CustomTable
        columns={ReviewListTableFullConfig}
        data={reviews.data}
        from={reviews.from}
      />
      <Pagination products={reviews} />
    </AppLayout>
  );
}