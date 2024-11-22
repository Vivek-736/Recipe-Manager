import { cookies } from "next/headers";
import prisma from "@/app/libs/prismadb";
import { Favourite, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export type FavouriteWithProducts = Prisma.FavouriteGetPayload<{
    include: {
        items: {
            include: { recipe: true }
        }
    }
}>;

export type FavouriteItemWithProducts = Prisma.FavouriteItemGetPayload<{
    include: {
        recipe: true
    }
}>;

export type ShoppingFavourite = Favourite & {
    size: number
    items: { recipeId: string; id: string; quantity: number }[];
}

export async function getFavourite(): Promise<ShoppingFavourite | null> {
    const session = await getServerSession(authOptions);

    let Favourite: FavouriteWithProducts | null = null;

    if (session) {
        Favourite = await prisma.favourite.findFirst({
            where: { userId: session.user.email },
            include: {
                items: {
                    include: { recipe: true }
                }
            }
        })
    }

    else {
        const localFavouriteId = (await cookies()).get("localFavouriteId")?.value
        Favourite = localFavouriteId ?
            await prisma.favourite.findUnique({
                where: { id: localFavouriteId },
                include: {
                    items: {
                        include: { recipe: true }
                    }
                }
            })
            : null;
    }

    if (!Favourite) {
        return null
    }

    return {
        ...Favourite,
        size: Favourite.items.reduce((acc, item) => acc + item.quantity, 0)
    }
}

export async function createFavourite(): Promise<ShoppingFavourite> {

    const session = await getServerSession(authOptions);
    let newFavourite: Favourite;

    if (session) {
        newFavourite = await prisma.favourite.create({
            data: {
                userId: session.user.email,
            }
        })
    }
    else {
        newFavourite = await prisma.favourite.create({
            data: {}
        })

        ;(await cookies()).set("localFavouriteId", newFavourite.id);
    }

    return {
        ...newFavourite,
        size: 0,
        items: []
    }
}