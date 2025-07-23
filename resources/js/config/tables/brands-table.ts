import { TableColumn } from "@/types/products";
import { TABLE_HEADER_CLASS, TABLE_CELL_CLASS } from "@/constants/table";

export const BrandListTableFullConfig: TableColumn[] = [
  { label: "ID", key: "id", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Name", key: "name", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Slug", key: "slug", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Description", key: "description", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Logo", key: "logo", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Status", key: "status", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Created At", key: "created_at", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Updated At", key: "updated_at", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
];
