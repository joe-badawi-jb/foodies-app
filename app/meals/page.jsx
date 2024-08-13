import { Suspense } from "react";
import { getMeals } from "@/lib/meals";

import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";

// async function Meals() {
//   const meals = await getMeals();

//   return <MealsGrid meals={meals} />;
// }

// this is STATIC METADATA GENERATION
export const metadata = {
  title: "All Meals",
  description: "Checkout the Delicious meals shared by our community!",
};

// we can use async here in server components, async wraps the function inside a promise
export default async function MealsPage() {
  const meals = await getMeals();

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href={"/meals/share"}>Share your favorite recipe</Link>
        </p>
      </header>
      <main className={`${classes.main} ${classes["position-relative"]}`}>
        {/* WE DID THIS IN A SEPARATE COMPONENT TO WRAP IT INSIDE SUSPENSE COMPONENT FROM REACT */}
        {/* SUSPENSE SHOWS FALLBACK DATA UNTIL THE ACTUAL DATA HAS BEEN LOADED */}
        {/* <Suspense
          fallback={
            <div className={classes["spinner-wrapper"]}>
              <div class={classes.spinner}></div>
            </div>
          }
        > */}
        <MealsGrid meals={meals} />
        {/* </Suspense> */}
      </main>
    </>
  );
}
