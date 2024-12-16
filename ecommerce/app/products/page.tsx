import Link from "next/link";

import prisma from "@/lib/db";
import { createProduct } from "@/actions";

import classes from "./page.module.css";

async function getProducts() {
  const products = await prisma.product.findMany();
  return products;
}

export default async function Products() {
  const products = await getProducts();
  console.log(products);

  return (
    <main>
      <h1 className={classes.h1}>All Products ({products.length})</h1>

      <form action={createProduct} className={classes.form}>
        <h2 className={classes.formTitle}>Create new product</h2>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />

        <label htmlFor="description">Description</label>
        <input id="description" name="description" />

        <label htmlFor="price">Price</label>
        <input id="price" name="price" />

        <button type="submit" className={classes.formButton}>
          Create
        </button>
      </form>

      <div className={classes.productsListContainer}>
        {products.length > 0 ? (
          <ul className={classes.listContainer}>
            {products.map((product) => (
              <li key={product.id}>
                <Link href={`/products/${product.slug}`}>
                  Name: {product.name} - Price: ${product.price.toFixed(2)}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className={classes.noProductsYet}>No products yet.</p>
        )}
      </div>
    </main>
  );
}
