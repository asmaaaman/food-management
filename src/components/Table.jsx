import dayjs from "dayjs";
import React, { useState } from "react";
import ActionsMenu from "./ActionsMenu";

const Table = ({ tableHeaders, tableBody, onView, onDelete, onEdit }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const formatCellValue = (headerKey, value) => {
    const isDate =
      headerKey.toLowerCase().includes("date") && dayjs(value).isValid();
    return isDate ? dayjs(value).format("DD/MM/YYYY") : value ?? "-";
  };
  return (
    <div className="table-responsive">
      <table className="table table-borderless">
        <thead className="table-header">
          <tr>
            {tableHeaders.map((header) => (
              <th className="th-titles custom-poppins" key={header.id}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.length === 0 ? (
            <tr>
              <td colSpan={tableHeaders.length} className="text-center">
                No data available.
              </td>
            </tr>
          ) : (
            tableBody.map((item, index) => (
              <tr key={index}>
                {tableHeaders.map((header, idx) => (
                  <td className="p-4" key={idx}>
                    {header.key === "actions" ? (
                      <ActionsMenu
                        isOpen={openMenuIndex === index}
                        onToggle={() =>
                          setOpenMenuIndex(
                            openMenuIndex === index ? null : index
                          )
                        }
                        onView={() => onView(item)}
                        onEdit={() => onEdit(item)}
                        onDelete={() => onDelete(item)}
                      />
                    ) : (
                      formatCellValue(header.key, item[header.key])
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
