"use client";
import React, { useEffect, useState } from "react";

const CollectionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("[Collection_GET]", error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  console.log(collections);
  return <div>CollectionsPage</div>;
};

export default CollectionsPage;
