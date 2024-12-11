import { Hono } from 'hono'
import { db } from '$db'
import * as table from '$schema';
import { eq } from 'drizzle-orm';

const app = new Hono();

app.put('/edit', async (c) => {
    const {id ,fullname, skill, education, facebook, github, x } = await c.req.json();

    const EditProfile = await db.update(table.users).set({
        fullname: fullname, 
        skill: skill, 
        education:education, 
        facebook:facebook,
        github:github,
        x:x,
        updated_at: new Date()
    }).where(eq(table.users.id, id))

    console.log(EditProfile)
    return c.json({ 
        fullname: fullname, 
        skill:skill, 
        education:education, 
        facebook:facebook,
        github:github,
        x:x
    }, 200)
})

app.get('/:username', async (c) => {
    const username = c.req.param('username');
    const response = await db.select({
        id: table.users.id,
        fullname: table.users.fullname,
        username: table.users.username,
        skill: table.users.skill,
        education: table.users.education,
        facebook: table.users.facebook,
        github: table.users.github,
        x: table.users.x
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
                skill: user.skill,
                education:user.education,
                facebook:user.facebook,
                github:user.github,
                x:user.x
            },
            200
        );

    }
    else {
        return c.json({ message: "User not found" }, 403)
    }

    
});



export default app;