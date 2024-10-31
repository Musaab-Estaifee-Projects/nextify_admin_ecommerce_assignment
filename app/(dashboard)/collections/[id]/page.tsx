"use client";
import CollectionForm from "@/components/collection/CollectionForm";
import Loader from "@/components/custom/Loader";
import React, { useEffect, useState } from "react";

const CollectionDetailsPage = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.id}`, {
        method: "GET",
      });
      const data = await res.json();
      setCollectionDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("[Collection_GET]", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, []);

  return loading ? (<Loader />) : (<CollectionForm initialData={collectionDetails}/>)
};

export default CollectionDetailsPage;
