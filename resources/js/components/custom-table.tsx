import React from "react";
import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { TableColumn, TableRow, ActionConfig } from "@/types/products";


function getLucideIcon(iconName: string): LucideIcon | null {
  const icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return icon || null;
}
interface CustomTableProps<RowType = TableRow> {
  columns: TableColumn[];
  data: RowType[];
  actions?: ActionConfig[];
  from?: number;
  onAction?: (type: string, row: RowType) => void;
  onToggleColumn?: (columnKey: string) => void;
}

export const CustomTable = <RowType extends TableRow>({
  columns,
  data,
  actions = [],
  from = 0,
  onAction,
  onToggleColumn,
}: CustomTableProps<RowType>) => {
  const hasActionsColumn = columns.some((col) => col.key === "actions") && actions.length > 0;

  const renderActionButtons = (row: RowType) => (
    <div className="flex gap-2">
      {actions.map((action, index) => {
        const IconComponent = getLucideIcon(action.icon);
        return (
          <button
            key={index}
            type="button"
            onClick={() => onAction && onAction(action.type, row)}
            className={action.className}
            title={action.label}
          >
            {IconComponent ? <IconComponent size={16} /> : null}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-gray-800 border-b">
            {columns.map((column) => (
              <th key={column.key} className={column.headerClassName || "px-4 py-2"}>
                <div className="flex items-center gap-1">
                  {column.label}
                  {onToggleColumn && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleColumn(column.key);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {getLucideIcon("ChevronDown") && React.createElement(getLucideIcon("ChevronDown")!, { size: 14 })}
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={(row as any).id ?? index} className="border-b">
                {columns.map((col) =>
                  col.key === "actions" && hasActionsColumn ? (
                    <td key={col.key} className={col.cellClassName || "px-4 py-2"}>
                      {renderActionButtons(row)}
                    </td>
                  ) : (
                    <td key={col.key} className={col.cellClassName || "px-4 py-2"}>
                      {col.key === "image" && row[col.key] ? (
                        <img
                          src={row[col.key]}
                          alt={`${col.key} image`}
                          className="w-16 h-16 object-cover"
                        />
                      ) : col.key === "is_active" || col.key === "is_visible" ? (
                        row[col.key] ? (
                          <span className="text-green-600 font-bold">Yes</span>
                        ) : (
                          <span className="text-red-600 font-bold">No</span>
                        )
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  )
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-md font-bold text-red-700"
              >
                No records found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};