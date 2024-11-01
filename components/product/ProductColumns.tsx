"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Delete from "../custom/Delete";
import Edit from "../custom/Edit";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) =>
      row.original.collections.map((collection) => collection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
  },
  {
    accessorKey: "cost",
    header: "Cost ($)",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Delete item="product" id={row.original._id} />
        <Edit item="products" id={row.original._id} />
      </div>
    ),
    header: "Actions",
  },
];
