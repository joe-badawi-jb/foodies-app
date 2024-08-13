import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

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

export async function saveMeal(meal) {
    // Here I installed 2 packages: slugify which creates a slug out of the title in our case, 
    //and xss, which will protect us from cross site scripting attacks
    // the cross scripting attacks could happen because of the following: instructions are being outputted as HTML, we are vulnerable in that case
    meal.slug = slugify(meal.title, { lower: true }); //lower case all
    meal.instructions = xss(meal.instructions); //override the instructions object

    // Now for the image
    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}_${Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000}.${extension}`; //here I added a random number in order to avoid overriding images with same file name

    const stream = fs.createWriteStream(`public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    //THE IMAGE WILL NOT WORK WHEN WE ARE IN PRODUCTION
    // we should store the images on a server like aws s3
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
    });

    meal.image = `/images/${fileName}`;
    db.prepare(`INSERT INTO meals
            (slug,
            title,
            image,
            summary,
            instructions,
            creator,
            creator_email)    
        VALUES (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)
    `).run(meal);
}