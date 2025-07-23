import { ActionConfig, TableColumn } from "@/types/products";
import { DefaultTableActions } from "./shared-actions";
import { TABLE_HEADER_CLASS, TABLE_CELL_CLASS } from "@/constants/table";


export const CategoryTableConfig: {
  columns: TableColumn[];
  actions: ActionConfig[];
} = {
  columns: [    
    { label: "ID",          
      key: "id",           
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "name",        
      key: "name",         
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "slug",        
      key: "slug",         
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "description", 
      key: "description",  
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "image",       
      key: "image",        
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "parent id",   
      key: "parent_id",    
      headerClassName: TABLE_HEADER_CLASS, 
      cellClassName: TABLE_CELL_CLASS 
    },

    { label: "is active",   
      key: "is_active",    
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

    { label: "deleted",  
      key: "deleted_at",   
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