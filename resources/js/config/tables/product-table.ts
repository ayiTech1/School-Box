import { ActionConfig, TableColumn } from "@/types/products";
import { DefaultTableActions } from "./shared-actions";
import { TABLE_HEADER_CLASS, TABLE_CELL_CLASS } from "@/constants/table";


export const ProductTableConfig: {
  columns: TableColumn[];
  actions: ActionConfig[];
} = {
  columns: [
    { label: "name", 
      key: "name", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },
      
    { label: "description", 
      key: "description", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "category", 
      key: "category", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "stock", 
      key: "stock", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "status", 
      key: "status", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "price", 
      key: "price", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "compare price", 
      key: "compare_price", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "cost per item", 
      key: "cost_per_item", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS
    },

    { label: "image", 
      key: "image", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "visible", 
      key: "is_visible", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "created", 
      key: "created_at", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "updated", 
      key: "updated_at", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "actions", 
      key: "actions", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },
  ],
  actions: DefaultTableActions,
};