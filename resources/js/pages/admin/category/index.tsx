import { CustomTable } from '@/components/custom-table';
import ConfirmModal from '@/components/confirm-modal';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CategoryTableConfig } from '@/config/tables/category-table';
import { CategoryIndexProps } from '@/types/products';
import CategoryFormModal from './category-form';
import SearchAddBar from '@/components/search-add-bar';
import FlashAlert from '@/components/flash-alert';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Category List',
    href: '/admin/category',
  },
];

export default function Index({ categories, filters }:CategoryIndexProps ) {
  const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;

  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteRoute, setDeleteRoute] = useState<string>('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);


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
      router.delete(deleteRoute, { preserveScroll: true });
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
    router.get(route('admin.category.index'), queryString, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleReset = () => {
    setData('search', '');
    router.get(route('admin.category.index'), {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleAction = (type: string, category: any) => {
    if (type === 'view') {
      setSelectedCategory(category);
      setIsEdit(false);
      setIsFormOpen(true);
    } else if (type === 'edit') {
      setSelectedCategory(category);
      setIsEdit(true);
      setIsFormOpen(true);
    } else if (type === 'delete') {
      handleDelete(category.id, route('admin.category.destroy', category.id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Category Management" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <FlashAlert
          show={showAlert}
          successMessage={flash?.success}
          errorMessage={flash?.error}
        />

        <SearchAddBar
          searchValue={data.search}
          onSearchChange={handleChange}
          onReset={handleReset}
          addLabel="Add Category"
          onAddClick={() => {
            setSelectedCategory(null);
            setIsEdit(false);
            setIsFormOpen(true);
          }}
          placeholder="Search Categories..."
        />

        <CustomTable
          columns={CategoryTableConfig.columns}
          actions={CategoryTableConfig.actions}
          data={categories.data}
          from={categories.from}
          onAction={handleAction}
        />

        <Pagination products={categories} />
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this category? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />

      <CategoryFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        category={selectedCategory}
        isEdit={isEdit}
      />
    </AppLayout>
  );
}
