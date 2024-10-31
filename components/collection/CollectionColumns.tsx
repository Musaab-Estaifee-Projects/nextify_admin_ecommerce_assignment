"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Delete } from "lucide-react";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    id: "actions",
    cell: ({row}) => <Delete />,
    header: "Amount",
  },
];


const CollectionColumns = () => {
  return <div>CollectionColumns</div>;
};

export default CollectionColumns;
