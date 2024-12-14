import prisma from "@/db";

async function createProduct({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price: number;
}) {
  const newProduct = await prisma.product.create({
    data: {
      name,
      description,
      price,
    },
  });
  return newProduct;
}

async function getProducts() {
  const products = await prisma.product.findMany();
  return products;
}

export default async function Home() {
  const product = await createProduct({
    name: "Smart TV",
    description: "Watch your favorite games!",
    price: 700,
  });
  console.log(product);

  const products = await getProducts();
  console.log(products);

  return <main>hello world</main>;
}
