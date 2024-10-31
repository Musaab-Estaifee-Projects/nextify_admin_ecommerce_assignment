"use client";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom/Delete";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <p>{row.original.title}</p>,
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    header: "Amount",
    cell: ({ row }) => <Delete id={row.original._id} />,
  },
];

// const CollectionColumns = () => {
//   return <div>CollectionColumns</div>;
// };

// export default CollectionColumns;
