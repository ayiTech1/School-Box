import { CustomTable } from '@/components/custom-table';
import ConfirmModal from '@/components/confirm-modal';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { ProductTableConfig } from '@/config/tables/product-table';
import SearchAddBar from '@/components/search-add-bar';
import FlashAlert from '@/components/flash-alert';
import type { ManageProductPageProps, Product } from '@/types/products';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manage Products',
    href: '/admin/products',
  },
];

export default function Index({ products, filters }: ManageProductPageProps) {
  const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;

  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteRoute, setDeleteRoute] = useState<string>('');

  useEffect(() => {
    if (flash?.success || flash?.error) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  const handleDelete = (id: number, route: string) => {
    setDeleteId(id);
    setDeleteRoute(route);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId && deleteRoute) {
      router.delete(deleteRoute, {
        preserveScroll: true,
      });
    }
    setIsModalOpen(false);
    setDeleteId(null);
    setDeleteRoute('');
  };

  const { data, setData } = useForm({
    search: filters.search || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData('search', value);
    const queryString = value ? { search: value } : {};
    router.get(route('admin.products.index'), queryString, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleReset = () => {
    setData('search', '');
    router.get(route('admin.products.index'), {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleAction = (type: 'view' | 'edit' | 'delete', row: Product) => {
    if (type === 'delete') {
      handleDelete(row.id, route('admin.products.destroy', row.id));
    } else if (type === 'edit') {
      router.get(route('admin.products.edit', row.id));
    } else if (type === 'view') {
      router.get(route('admin.products.show', row.id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Product Management" />

    <div className="
      flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto
      bg-white dark:bg-gray-900
      text-gray-800 dark:text-gray-100
      border border-gray-200 dark:border-gray-700
    ">

        <FlashAlert
          show={showAlert}
          successMessage={flash?.success}
          errorMessage={flash?.error}
        />

        <SearchAddBar
          searchValue={data.search}
          onSearchChange={handleChange}
          onReset={handleReset}
          addLabel="Add Product"
          addHref={route('admin.products.create')}
          placeholder="Search Products..."
        />

        <CustomTable
          columns={ProductTableConfig.columns}
          data={products.data}
          from={products.from}
        
        />

        <Pagination products={products} />
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </AppLayout>
  );
}
