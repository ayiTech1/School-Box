import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CustomTable } from '@/components/custom-table';
import { Pagination } from '@/components/ui/pagination';
import SearchAddBar from '@/components/search-add-bar';
import FlashAlert from '@/components/flash-alert';
import { UserTableConfig } from '@/config/tables/user-table';
import UserFormModal from './user-form'; 
import ConfirmModal from '@/components/confirm-modal'; 

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Manage Customers',
    href: '/admin/users',
  },
];

export default function Index({ customers, filters }: any) {
  const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;

  const [showAlert, setShowAlert] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (flash?.success || flash?.error) {
      setShowAlert(true);
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [flash]);

  const { data, setData } = useForm({
    search: filters.search || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData('search', value);
    const queryString = value ? { search: value } : {};
    router.get(route('admin.customers.index'), queryString, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleReset = () => {
    setData('search', '');
    router.get(route('admin.customers.index'), {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleAction = (type: string, user: any) => {
    if (type === 'view') {
      setSelectedUser(user);
      setIsView(true);
      setIsEdit(false);
      setIsFormOpen(true);
    } else if (type === 'edit') {
      setSelectedUser(user);
      setIsEdit(true);
      setIsView(false);
      setIsFormOpen(true);
    } else if (type === 'delete') {
      setDeleteId(user.id);
      setIsDeleteModalOpen(true);
    }
  };

  const confirmDelete = () => {
    if (deleteId) {
      router.delete(route('admin.customers.destroy', deleteId), {
        preserveScroll: true,
      });
    }
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Customer Management" />

      <div className="flex flex-col gap-4 p-4">
        <FlashAlert
          show={showAlert}
          successMessage={flash?.success}
          errorMessage={flash?.error}
        />

        <SearchAddBar
          searchValue={data.search}
          onSearchChange={handleChange}
          onReset={handleReset}
          placeholder="Search Customers..."
          addLabel="Add Customers"
          onAddClick={() => {
            setSelectedUser(null);
            setIsEdit(false);
            setIsView(false);
            setIsFormOpen(true);
          }}
        />

        <CustomTable
          columns={UserTableConfig.columns}
          actions={UserTableConfig.actions}
          data={customers.data}
          from={customers.from}
          onAction={handleAction}
          onToggleColumn={(key) => { console.log("Toggled column:", key); }}
        />

        {/* <CustomTable
          columns={UserTableConfig.columns}
          actions={UserTableConfig.actions}
          data={customers.data}
          from={0}
          onAction={(type, row) => { console.log(type, row); }}
          onToggleColumn={(key) => { console.log("Toggled column:", key); }}
        /> */}


        <Pagination products={customers} />
      </div>

      <UserFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        user={selectedUser}
        isEdit={isEdit}
        isView={isView}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this user? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </AppLayout>
  );
}
