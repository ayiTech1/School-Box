import { CustomTable } from '@/components/custom-table';
import ConfirmModal from '@/components/confirm-modal';
import { Pagination } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { OrderListTableFullConfig} from '@/config/tables/orders-table';
// import { OrderIndexProps } from '@/types/orders';
import OrderFormModal from './order-form';
import SearchAddBar from '@/components/search-add-bar';
import FlashAlert from '@/components/flash-alert';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Order List',
    href: '/admin/orders',
  },
];

interface IndexProps {
  orders: any;
  filters: { search?: string };
}

export default function Index({ orders, filters }: IndexProps) {
  const { flash } = usePage<{ flash?: { success?: string; error?: string } }>().props;

  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteRoute, setDeleteRoute] = useState<string>('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
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
    router.get(route('admin.order.index'), queryString, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleReset = () => {
    setData('search', '');
    router.get(route('admin.order.index'), {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleAction = (type: string, order: any) => {
    if (type === 'view') {
      setSelectedOrder(order);
      setIsEdit(false);
      setIsFormOpen(true);
    } else if (type === 'edit') {
      setSelectedOrder(order);
      setIsEdit(true);
      setIsFormOpen(true);
    } else if (type === 'delete') {
      handleDelete(order.id, route('admin.order.destroy', order.id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Order Management" />

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
          addLabel="Add Order"
          onAddClick={() => {
            setSelectedOrder(null);
            setIsEdit(false);
            setIsFormOpen(true);
          }}
          placeholder="Search Orders..."
        />

        <CustomTable
          columns={OrderListTableFullConfig}
          
          data={orders.data}
          from={orders.from}
          onAction={handleAction}
        />

        <Pagination products={orders} />
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this category? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setIsModalOpen(false)}
      />

      {/* <OrderFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        order={selectedOrder}
        isEdit={isEdit}
      /> */}
    </AppLayout>
  );
}
