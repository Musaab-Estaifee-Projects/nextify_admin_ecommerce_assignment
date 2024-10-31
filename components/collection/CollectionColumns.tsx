"use client";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom/Delete";
import Link from "next/link";

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
    cell: ({ row }) => <Delete id={row.original._id} />,
  },
];

// const CollectionColumns = () => {
//   return <div>CollectionColumns</div>;
// };

// export default CollectionColumns;
