"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidText(text) {
    if (!text || text.trim === '') {

    }
}

export const shareMeal = async (prevState, formData) => {
    // if we add the "use client" directive at the top, we would get an error that we cannot use server actions
    // better to separate the logic from the JSX code

    const meal = {
        title: formData.get("title"),
        summary: formData.get("summary"),
        instruction: formData.get("instructions"),
        image: formData.get("image"),
        creator: formData.get("name"),
        creator_email: formData.get("email"),
    };

    // SERVER SIDE VALIDATION

    if (isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instruction) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image ||
        meal.image.size === 0
    ) {
        return {
            message: "Invalid Input."
        }
    }

    await saveMeal(meal);
    revalidatePath('/meals'); //This is used to handle the aggressive caching on producation
    redirect("/meals")
};