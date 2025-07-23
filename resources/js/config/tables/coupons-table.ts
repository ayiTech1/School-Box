import { TableColumn } from "@/types/products";
import { TABLE_HEADER_CLASS, TABLE_CELL_CLASS } from "@/constants/table";

export const CouponListTableFullConfig: TableColumn[] = [
  { label: "Code", key: "code", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Description", key: "description", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Discount Type", key: "discount_type", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Discount Value", key: "discount_value", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Min Order Amount", key: "min_order_amount", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Max Uses", key: "max_uses", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Max Uses Per User", key: "max_uses_per_user", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Start Date", key: "start_date", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "End Date", key: "end_date", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Active", key: "is_active", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Created At", key: "created_at", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Updated At", key: "updated_at", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
];
