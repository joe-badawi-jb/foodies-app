"use server";

export const shareMeal = async (formData) => {
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

    console.log(meal);
};