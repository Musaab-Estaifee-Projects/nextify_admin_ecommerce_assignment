"use client";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom/Delete";
import Link from "next/link";
import Edit from "../custom/Edit";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        className="hover:text-orange-400"
        href={`/collections/${row.original._id}`}
      >
        <p>{row.original.title}</p>
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Delete item="collection" id={row.original._id} />
        <Edit item="collections" id={row.original._id} />
      </div>
    ),
  },
];

// const CollectionColumns = () => {
//   return <div>CollectionColumns</div>;
// };

// export default CollectionColumns;
