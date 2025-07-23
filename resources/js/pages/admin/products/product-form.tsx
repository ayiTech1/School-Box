import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

export default function ProductForm({ ...props }) {
  const { product, isView, isEdit, categories } = props;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: `${isView ? 'View' : isEdit ? 'Edit' : 'Create'} Product`,
      href: route('admin.products.index'),
    },
  ];

  const { data, setData, post, put, processing, errors } = useForm({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    category_id: product?.category_id || '',
    stock: product?.stock || 0,
    status: product?.status || 'active',
    featured_image: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEdit) {
      put(route('admin.products.update', product.id));
    } else {
      post(route('admin.products.store'));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setData('featured_image', file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Product Management" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        {/* Back link */}
        <div className="ml-auto">
          <Link
            as="button"
            className="flex items-center bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90"
            href={route('admin.products.index')}
          >
            <ArrowLeftIcon className="me-2" />
            Back to Products
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {isView ? 'View' : isEdit ? 'Edit' : 'Create'} Product
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={submit} className="flex flex-col gap-4" autoComplete="off">
              <div className="grid gap-6">
                {/* Name */}
                <div className="grid gap-2">
                  <label htmlFor="name">Product Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    type="text"
                    placeholder="Product name"
                    disabled={isView || processing}
                    autoFocus
                    tabIndex={1}
                  />
                  <InputError message={errors.name} />
                </div>

                {/* Description */}
                <div className="grid gap-2">
                  <label htmlFor="description">Description</label>
                  <CustomTextarea
                    id="description"
                    name="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Product description"
                    rows={5}
                    disabled={isView || processing}
                    tabIndex={2}
                  />
                  <InputError message={errors.description} />
                </div>

                {/* Price */}
                <div className="grid gap-2">
                  <label htmlFor="price">Price (GHC)</label>
                  <Input
                    id="price"
                    name="price"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                    type="number"
                    placeholder="Product price"
                    disabled={isView || processing}
                    tabIndex={3}
                  />
                  <InputError message={errors.price} />
                </div>

                {/* Stock */}
                <div className="grid gap-2">
                  <label htmlFor="stock">Stock</label>
                  <Input
                    id="stock"
                    name="stock"
                    value={data.stock}
                    onChange={(e) => setData('stock', Number(e.target.value))}
                    type="number"
                    placeholder="Product stock"
                    disabled={isView || processing}
                    tabIndex={4}
                  />
                  <InputError message={errors.stock} />
                </div>

                {/* Status */}
                <div className="grid gap-2">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={data.status}
                    onChange={(e) => setData('status', e.target.value)}
                    disabled={isView || processing}
                    className="border p-2 rounded-md"
                    tabIndex={5}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <InputError message={errors.status} />
                </div>

                {/* Category Select */}
                <div className="grid gap-2">
                  <label htmlFor="category_id">Category</label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={data.category_id}
                    onChange={(e) => setData('category_id', e.target.value)}
                    disabled={isView || processing}
                    className="border p-2 rounded-md"
                    tabIndex={6}
                  >
                    <option value="">-- Select a category --</option>
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <InputError message={errors.category_id} />
                </div>

                {/* File input */}
                {!isView && (
                  <div className="grid gap-2">
                    <label htmlFor="featured_image">Featured Image</label>
                    <Input
                      id="featured_image"
                      name="featured_image"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      tabIndex={7}
                    />
                    <InputError message={errors.featured_image} />
                  </div>
                )}

                {/* Preview */}
                {(previewUrl || product?.featured_image) && (
                  <div className="grid gap-2">
                    <label>Image Preview</label>
                    <img
                      src={previewUrl || product?.featured_image}
                      alt="Featured Preview"
                      className="w-50 h-40 rounded-lg border object-contain"
                    />
                  </div>
                )}

                {/* Submit */}
                {!isView && (
                  <Button
                    type="submit"
                    className="mt-4 w-fit"
                    disabled={processing}
                    tabIndex={8}
                  >
                    {processing && (
                      <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                    )}
                    {isEdit ? 'Update Product' : 'Create Product'}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
