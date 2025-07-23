import { TableColumn } from "@/types/products";
import { TABLE_HEADER_CLASS, TABLE_CELL_CLASS } from "@/constants/table";

export const WishlistListTableFullConfig: TableColumn[] = [
  { label: "ID", key: "id", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "User ID", key: "user_id", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Product ID", key: "product_id", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Created At", key: "created_at", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Updated At", key: "updated_at", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
];
