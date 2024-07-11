import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
    // single row, .get()
    // all rows, all()
    // inserting or changing data .run()
    await new Promise((resolve) => setTimeout(resolve, 3000)) // just a delay so we can visualize better

    // throw new Error('FAILED TO FETCH MEALS...')
    return db.prepare('SELECT * FROM meals').all();
}

export async function getMeal(slug) {


    // return db.prepate(`SELECT * FROM meals WHERE slug = ${slug}`) this will open us up to sql injections, below is a safer way
    return db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug);
}