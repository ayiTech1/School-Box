import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Uploaded Files',
        href: 'admin/media',
    },
];

export default function FileManagerIndex() {
  return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Manage Uploaded Files" />
       <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
  
          <iframe
            src="/admin/laravel-filemanager?type=image"
            style={{ width: '100%', height: '600px', border: 'none' }}
          />
        </div>
     </AppLayout>
  );

}
