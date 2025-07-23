import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomTextarea } from '@/components/ui/custom-textarea';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { ArrowLeftIcon, LoaderCircle } from 'lucide-react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image?: string;
  image_url?: string | null;
  parent_id?: number | null;
  is_active?: boolean;
}

interface ParentCategory {
  id: number;
  name: string;
}

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
  isEdit?: boolean;
  parentCategories?: ParentCategory[];
  isCreate?: boolean;
  fetchParentCategories?: boolean;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/--+/g, '-');
}

export default function CategoryFormModal({
  isOpen,
  onClose,
  category,
  isEdit = false,
  parentCategories: initialParentCategories = [],
  isCreate = false,
  fetchParentCategories = false,
}: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState<ParentCategory[]>(initialParentCategories);
  const [isFetchingParents, setIsFetchingParents] = useState(false);

  const { data, setData, post, put, processing, errors, reset } = useForm({
    name: '',
    slug: '',
    description: '',
    image: null as File | null,
    parent_id: null as number | null,
    is_active: true,
  });

  // Load form data when editing
  useEffect(() => {
    if (isOpen && isEdit && category) {
      setData({
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: null,
        parent_id: category.parent_id ?? null,
        is_active: category.is_active ?? true,
      });
    }
  }, [isOpen, isEdit, category]);

  // Auto-generate slug when creating only
  useEffect(() => {
    if (isCreate && data.name) {
      setData('slug', slugify(data.name));
    }
  }, [data.name, isCreate]);

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
      setParentCategories(initialParentCategories);
    }
  }, [isOpen, reset, initialParentCategories]);

  // Fetch parents if needed
  useEffect(() => {
    if (isOpen && fetchParentCategories && parentCategories.length === 0) {
      fetchParentCategoriesList();
    }
  }, [isOpen, fetchParentCategories]);

  const fetchParentCategoriesList = async () => {
    setIsFetchingParents(true);
    try {
      const response = await axios.get(route('admin.categories.parents'));
      setParentCategories(response.data);
    } catch (error) {
      console.error('Error fetching parent categories:', error);
    } finally {
      setIsFetchingParents(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = isEdit && category?.id
      ? route('admin.categories.update', category.id)
      : route('admin.categories.store');

    const method = isEdit ? put : post;

    method(url, {
      preserveScroll: true,
      onFinish: () => {
        setLoading(false);
        onClose();
      },
    });
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="scale-95 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="ease-in duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-95 opacity-0"
          >
            <Dialog.Panel className="w-full max-w-lg rounded-lg bg-white p-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>
                    {isEdit ? 'Edit Category' : 'Add Category'}
                  </CardTitle>
                  <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800"
                    aria-label="Close modal"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                  </button>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                      />
                      <InputError message={errors.name} />
                    </div>

                    <div>
                      <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                        Slug
                      </label>
                      <Input
                        id="slug"
                        value={data.slug}
                        onChange={(e) => setData('slug', e.target.value)}
                        disabled={isEdit}
                      />
                      <InputError message={errors.slug} />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <CustomTextarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                      />
                      <InputError message={errors.description} />
                    </div>

                    <div>
                      <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                        Image
                      </label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setData('image', e.target.files?.[0] || null)
                        }
                      />
                      <InputError message={errors.image} />
                    </div>

                    {category?.image_url && (
                      <div className="mt-2">
                        <img
                          src={category.image_url}
                          alt="Category preview"
                          className="rounded-md w-40 h-40 object-cover"
                        />
                      </div>
                    )}

                    <div>
                      <label htmlFor="parent_id" className="block text-sm font-medium text-gray-700">
                        Parent Category
                      </label>
                      {isFetchingParents ? (
                        <div className="flex items-center justify-center p-4">
                          <LoaderCircle className="animate-spin" />
                        </div>
                      ) : (
                        <select
                          id="parent_id"
                          className="w-full border rounded px-3 py-2"
                          value={data.parent_id ?? ''}
                          onChange={(e) =>
                            setData(
                              'parent_id',
                              e.target.value ? Number(e.target.value) : null
                            )
                          }
                        >
                          <option value="">None</option>
                          {parentCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      )}
                      <InputError message={errors.parent_id} />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="is_active"
                        checked={data.is_active}
                        onChange={(e) => setData('is_active', e.target.checked)}
                        className="h-4 w-4"
                      />
                      <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                        Active
                      </label>
                      <InputError message={errors.is_active} />
                    </div>

                    <Button
                      type="submit"
                      disabled={processing || loading}
                      className="w-full bg-indigo-800 hover:bg-indigo-700"
                    >
                      {loading ? (
                        <>
                          <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                          {isEdit ? 'Updating...' : 'Creating...'}
                        </>
                      ) : (
                        <span>{isEdit ? 'Update' : 'Create'}</span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
