import { CustomTable } from '@/components/custom-table';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BurnerListTableFullConfig } from '@/config/tables/burners-table';

const breadcrumbs = [
  { title: 'Burners', href: '/admin/burners' },
];

export default function Index({ burners }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Burners" />
      <CustomTable
        columns={BurnerListTableFullConfig}
        data={burners.data}
        from={burners.from}
      />
      <Pagination products={burners} />
    </AppLayout>
  );
}