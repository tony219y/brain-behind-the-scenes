import { Hono } from "hono";
import { db } from '$db'
import * as table from '$schema';
import { eq, sql } from 'drizzle-orm';

const app = new Hono()

app.post("/offerapply", async (c) => {
    const { sender_id, post_id, content, post_type } = await c.req.json();
    console.log({ sender_id, post_id, content, post_type });

    const response = await db.insert(table.postOfferApply).values({
        user_id: sender_id,
        post_id: post_id,
        action_type: post_type,
        content: content,
        status: "pending"
    })

    if (response) {
        return c.json({ message: "Thank you! Your request has been processed successfully." }, 201);
    } else {
        return c.json({ message: "Something wrong!" }, 400);
    }

})

app.get("/get-offerApply", async(c)=>{
    try {
        const response = await db.select({
            id: table.postOfferApply.id,
            username: table.users.username,
            title: table.posts.title,
            action_type: table.postOfferApply.action_type,
            create_at: sql`TO_CHAR(${table.postOfferApply.created_at} + INTERVAL '7 hours', 'DD Mon YYYY HH24:MI')`.as('created_at'),
            content: table.postOfferApply.content,
            status: table.postOfferApply.status
        })
        .from(table.postOfferApply)
        .innerJoin(table.users, eq(table.postOfferApply.user_id, table.users.id))
        .innerJoin(table.posts, eq(table.postOfferApply.post_id, table.posts.id));

        // Handle the case where no records are found
        if (response.length === 0) {
            return c.json({ message: "No offer applications found." }, 404);
        }

        return c.json(response, 200);
    } catch (err) {
        console.error("Error fetching offer applications:", err);
        return c.json({ message: "An error occurred while fetching offer applications." }, 500);
    }
})

export default app;
