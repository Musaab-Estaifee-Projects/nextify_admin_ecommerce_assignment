type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
};

type CustomerType = {
  clerkId: string;
  name: string;
  email: string;
};
