import RecipeCard from "../components/RecipeCard";
import prisma from "@/app/libs/prismadb";
import Image from "next/image";
import Link from "next/link";

export default async function Recipes() {
  const recipes = await prisma.recipe.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="flex flex-col items-center bg-gray-50">
      {
        <div className="w-full max-w-screen-xl mx-auto my-6 p-6 bg-gradient-to-r from-green-100 to-green-300 rounded-xl shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="relative w-full max-w-md">
              <Image
                src={recipes[0].imageURL}
                alt={recipes[0].name}
                width={500}
                height={700}
                className="rounded-lg shadow-2xl object-cover"
                priority
              />
            </div>
            <div className="text-center lg:text-left space-y-4">
              <h1 className="text-4xl lg:text-5xl font-semibold text-gray-800">{recipes[0].name}</h1>
              <p className="text-lg text-gray-600">{recipes[0].description}</p>
              <div className="mt-4">
                <Link
                  href={`/recipes/${recipes[0].id}`}
                  className="px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-medium shadow-lg transition-all hover:bg-blue-700"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        </div>
      }

      <div className="my-6 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 px-4 sm:px-8 lg:px-16">
        {recipes.slice(1).map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

    </div>
  );
}
