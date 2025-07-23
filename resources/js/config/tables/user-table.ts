import { DefaultTableActions } from '@/config/tables/shared-actions';
import { ActionConfig, TableColumn } from "@/types/products";
import { TABLE_HEADER_CLASS, TABLE_CELL_CLASS } from "@/constants/table";

export const UserTableConfig: {
  columns: TableColumn[];
  actions: ActionConfig[];
} = {
  columns: [
    { label: "Name", 
      key: "name", 
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "Email", 
      key: "email",
      headerClassName: TABLE_HEADER_CLASS,
      cellClassName: TABLE_CELL_CLASS
    },

    { label: "Date", 
      key: "created_at",
      headerClassName: TABLE_HEADER_CLASS,
      cellClassName: TABLE_CELL_CLASS
    },
  ],
  actions: DefaultTableActions,
};
