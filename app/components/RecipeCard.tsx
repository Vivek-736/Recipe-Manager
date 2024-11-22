import Link from "next/link";
import { Recipe } from "@prisma/client";
import Image from "next/image";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const isNew = Date.now() - new Date(recipe.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7;

  return (
    <Link
      href={`/recipes/` + recipe.id}
      className="card w-full bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
    >
      <div className="relative">
        <Image
          src={recipe.imageURL}
          alt={recipe.name}
          width={800}
          height={400}
          className="h-48 w-full object-cover"
        />
        {isNew && (
          <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold py-1 px-3 rounded-full shadow-md">
            NEW
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{recipe.name}</h2>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{recipe.description}</p>
      </div>
      <div className="flex justify-between items-center px-4 pb-4">
        <button className="btn btn-primary btn-sm py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          View Recipe
        </button>
        <div className="text-gray-500 text-xs">{new Date(recipe.createdAt).toLocaleDateString()}</div>
      </div>
    </Link>
  );
}
