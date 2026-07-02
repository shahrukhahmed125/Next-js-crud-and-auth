import { prisma } from "./prisma";

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
}

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
}) {
  return await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
    },
  });
}

export async function updateProduct(
    id: number,
    data: {
        name: string;
        description: string;
        price: number;
    },
    ) {
    return await prisma.product.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            price: data.price,
        },
    });
}

export async function deleteProduct(id: number) {
    return await prisma.product.delete({
        where: { id },
    });
}
