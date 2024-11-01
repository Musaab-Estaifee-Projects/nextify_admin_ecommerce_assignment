import React from "react";
import { Edit2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface EditProps {
  id: string;
  item: string;
}

const Edit = ({ id, item }: EditProps) => {
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/${item}/${id}`);
  };
  return (
    <div>
      <Button onClick={handleEdit} className="bg-green-600">
        <Edit2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Edit;
