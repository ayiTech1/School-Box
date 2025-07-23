import { TableColumn } from "@/types/products";
import { TABLE_HEADER_CLASS, TABLE_CELL_CLASS } from "@/constants/table";

export const ShippingListTableFullConfig: TableColumn[] = [
  { label: "ID", key: "id", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Order ID", key: "order_id", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Address ID", key: "address_id", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Method", key: "method", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Carrier", key: "carrier", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Tracking Number", key: "tracking_number", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Cost", key: "cost", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Status", key: "status", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Estimated Delivery", key: "estimated_delivery", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Shipped At", key: "shipped_at", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Delivered At", key: "delivered_at", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Created At", key: "created_at", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
  { label: "Updated At", key: "updated_at", headerClassName: TABLE_HEADER_CLASS, cellClassName: TABLE_CELL_CLASS },
];
