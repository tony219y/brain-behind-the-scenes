import { Hono } from 'hono'
import { db } from '$db'
import * as table from '$schema';
import { eq } from 'drizzle-orm';

const app = new Hono();


app.put('/profile', async (c) => {
    const { name } = await c.req.json();
    console.log(name + " from back");

    return c.json({ message: name }, 200)
})

app.get('/:username', async (c) => {
    const username = c.req.param('username');
    const response = await db.select({
        id: table.users.id,
        fullname: table.users.fullname,
        username: table.users.username
    })
        .from(table.users)
        .where(eq(table.users.username, username));

    if (response.length > 0) {
        const user = response[0];

        return c.json(
            {
                id: user.id,
                username: user.username,
                fullname: user.fullname,
            },
            200
        );

    }
    else {
        return c.json({ message: "User not found" }, 403)
    }

});


export default app;