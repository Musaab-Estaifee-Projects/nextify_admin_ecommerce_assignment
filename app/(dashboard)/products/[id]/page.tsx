"use client";

import Loader from "@/components/custom/Loader";
import ProductForm from "@/components/product/ProductForm";
import React, { useEffect, useState } from "react";

const ProductDetailsPage = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );

  const getProductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: "GET",
      });
      const data = await res.json();
      setProductDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("[Product_GET]", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return loading ? <Loader /> : <ProductForm initialData={productDetails} />;
};

export default ProductDetailsPage;
