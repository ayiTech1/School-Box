import { ActionConfig } from "@/types/products";
import { EDIT_BUTTON_CLASS, DELETE_BUTTON_CLASS } from "@/constants/table";

export const DefaultTableActions: ActionConfig[] = [
  {
    label: "Edit",
    icon: "Edit",
    type: "edit",
    className: EDIT_BUTTON_CLASS,
  },
  {
    label: "Delete",
    icon: "Trash2",
    type: "delete",
    className: DELETE_BUTTON_CLASS,
  },
];
