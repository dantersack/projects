import prisma from "@/lib/db";

import classes from "./page.module.css";

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  console.log(product);

  return (
    <main>
      <div className={classes.productCard}>
        <h1>{product?.name}</h1>
        <p className={classes.description}>{product?.description}</p>
        <p className={classes.price}>${product?.price.toFixed(2)}</p>
      </div>
    </main>
  );
}
