import prisma from "@/app/libs/prismadb";
import FormSubmitButton from "@/app/components/FormSubmitButton";
import { redirect } from "next/navigation";
import Link from "next/link";

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageURL = formData.get("imageURL")?.toString();

  if (!name || !description || !imageURL) {
    throw Error("Missing required fields");
  }

  await prisma.recipe.create({
    data: {
      name,
      description,
      imageURL,
    },
  });

  redirect("/recipes");
}

export default async function AddProductPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-6">
      <Link
        href="/recipes"
        className="absolute top-4 left-4 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-green-300 transition-all"
      >
        ← Back to Recipes
      </Link>

      <div className="flex justify-center items-center h-full text-black">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h1 className="mb-5 text-xl font-bold text-center text-gray-800">Add Your Recipe</h1>
          <form action={addProduct}>
            <div className="mb-4">
              <input
                required
                name="name"
                placeholder="Recipe Name"
                className="input input-bordered w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-green-300"
              />
            </div>
            <div className="mb-4">
              <textarea
                required
                name="description"
                placeholder="Recipe Description"
                className="textarea textarea-bordered w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-green-300"
              ></textarea>
            </div>
            <div className="mb-4">
              <input
                required
                name="imageURL"
                placeholder="Image URL"
                type="url"
                className="input input-bordered w-full p-3 rounded-md border border-gray-300 focus:ring focus:ring-green-300"
              />
            </div>
            <FormSubmitButton>Add Recipe</FormSubmitButton>
          </form>
        </div>
      </div>
    </div>
  );
}