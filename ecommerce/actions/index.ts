"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/db";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as unknown as number;

  let slug = name.split(" ").join("-");

  let product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });

  while (product !== null) {
    slug += "-";
    product = await prisma.product.findUnique({
      where: {
        slug,
      },
    });
  }

  if (!product) {
    await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
      },
    });
  }

  revalidatePath("/posts");
}
