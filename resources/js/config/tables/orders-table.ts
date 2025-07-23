import { TableColumn } from "@/types/products";
import { TABLE_HEADER_CLASS, TABLE_CELL_CLASS } from "@/constants/table";

export const OrderListTableFullConfig: TableColumn[] = [
  { label: "order id", 
    key: "id", 
    headerClassName: TABLE_HEADER_CLASS, 
    cellClassName: TABLE_CELL_CLASS 
  },

  { label: "customer Name", 
    key: "customer_name", 
    headerClassName: TABLE_HEADER_CLASS, 
    cellClassName: TABLE_CELL_CLASS 
  },

  { label: "status", 
    key: "status", 
    headerClassName: TABLE_HEADER_CLASS, 
    cellClassName: TABLE_CELL_CLASS 
  },

  { label: "total", 
    key: "total", 
    headerClassName: TABLE_HEADER_CLASS, 
    cellClassName: TABLE_CELL_CLASS 
  },

  { label: "payment method", 
    key: "payment_method", 
    headerClassName: TABLE_HEADER_CLASS, 
    cellClassName: TABLE_CELL_CLASS 
  },

  { label: "shipping address", 
    key: "shipping_address", 
    headerClassName: TABLE_HEADER_CLASS, 
    cellClassName: TABLE_CELL_CLASS 
  },

  { label: "order date", 
    key: "created_at", 
    headerClassName: TABLE_HEADER_CLASS, 
    cellClassName: TABLE_CELL_CLASS 
  },

  { label: "order updated", 
    key: "updated_at", 
    headerClassName: TABLE_HEADER_CLASS, 
    cellClassName: TABLE_CELL_CLASS  
  },
];