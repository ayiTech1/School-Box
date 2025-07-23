/**
 * TableColumn type for table configuration.
 */
export interface TableColumn {
  label: string;
  key: string;
  headerClassName?: string;
  cellClassName?: string;
}

/**
 * Product entity interface matching the product-list-table config and typical migration.
 */
export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_price: number | null;
  cost_per_item: number | null;
  sku: string;
  barcode: string | null;
  quantity: number;
  security_stock: number;
  is_visible: boolean;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  weight: number | null;
  height: number | null;
  width: number | null;
  length: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * Category entity interface matching a typical category table migration.
 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parent_id: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * Generic table row type for flexible table data.
 */
export type TableRow = Record<string, any>;


/**
 * Pagination data structure for paginated resources.
 */
export interface PaginationData<T> {
  data: T[];
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

/**
 * Props for the Product List Page.
 */
export interface ProductListPageProps {
  products: PaginationData<Product>;
  filters: {
    search?: string;
    [key: string]: any;
  };
}

/**
 * Represents a configuration for a table action button.
 */
export interface ActionConfig {
  /** The display label for the action (e.g., 'Edit', 'Delete') */
  label: string;
  /** The icon name from lucide-react to use for the action */
  icon: string;
  /** The action type identifier (e.g., 'edit', 'delete', 'view') */
  type: string;
  /** Additional CSS classes for styling the action button */
  className?: string;
}

/**
 * Props for the Manage Products Page.
 */
export interface ManageProductPageProps {
  products: PaginationData<Product>;
  filters: {
    search?: string;
    [key: string]: any;
  };
}

// resources/js/types/categories.ts

// export interface Category {
//   id: number;
//   name: string;
//   slug: string;
//   description: string;
//   parent_id: number | null;
//   is_active: boolean;
//   image_url: string | null;
//   created_at: string;
// }

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginationData<T> {
  data: T[];
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  links: PaginationLink[];
}

export interface CategoryIndexProps {
  categories: PaginationData<Category>;
  filters: {
    search?: string;
  };
}