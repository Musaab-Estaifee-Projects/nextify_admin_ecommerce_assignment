import Collection from "@/lib/models/Collection";
import { connectToDatabase } from "@/lib/mongoose";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string; path: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDatabase();

    await Collection.findByIdAndDelete(params.id);

    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (error) {
    console.log("Collection_Delete", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
