"use server"
import { createFavourite, getFavourite } from "./Favourite";
import prisma from "@/app/libs/prismadb";
import { revalidatePath } from "next/cache";

export async function incrementRecipeQuantity(recipeId: string) {
    const favourite = (await getFavourite()) ?? (await createFavourite());

    const articleInCart = favourite.items.find((item: { recipeId: string; }) => item.recipeId === recipeId);

    if ( articleInCart ) {
        await prisma.favouriteItem.update({
            where: { id: articleInCart.id },
            data: { quantity: { increment: 1 } }
        })
    }
    else {
        await prisma.favouriteItem.create({
            data: {
                favouriteId: favourite.id,
                recipeId: recipeId,
                quantity: 1
            }
        })
    }

    revalidatePath("/recipes/[id]")

}