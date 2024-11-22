import prisma from "@/app/libs/prismadb";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";

interface ProductPageProps {
    params: {
        id: string;
    };
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.recipe.findUnique({ where: { id } });
    if (!product) notFound();
    return product;
});

export default async function ProductPage({
    params: { id },
}: ProductPageProps) {
    const product = await getProduct(id);

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start p-6 max-w-7xl mx-auto">
            <div className="lg:w-1/2 w-full shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <Image
                    src={product.imageURL}
                    alt={product.name}
                    height={500}
                    width={500}
                    className="object-cover rounded-lg"
                    priority
                />
            </div>

            <div className="lg:w-1/2 w-full space-y-6">
                <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                    {product.name}
                </h1>
                <p className="text-lg text-gray-700">{product.description}</p>
            </div>
        </div>
    );
}