import { Hono } from 'hono'
import bcrypt from 'bcryptjs'

import { db } from '$db'
import * as table from '$schema';
import { eq, or, sql } from 'drizzle-orm';
const app = new Hono()

const user: string = "tony"
const pass: string = "$2a$10$HWlro/jvsB23bWzbLKYarOZN2fVzGcPzZekongL.oGiOiuwMl/BxG"

app.post('/register', async (c) => {
    const { username, email, password, confirmpassword } = await c.req.json();

    const hashedPassword = bcrypt.hashSync(password, 10)

    const result = await db
        .select()
        .from(table.users)
        .where(
            sql`${table.users.username} = ${username} OR ${table.users.email} = ${email}`
        );
    if (result.length > 0) {
        return c.json({ message: "Username or Email has been used!" }, 400);
    }

    if (!username || !email || !password || !confirmpassword) {
        return c.json({ message: "Invalid Input!" }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return c.json({ message: "Invalid email format!" }, 400);
    }

    if (password !== confirmpassword) {
        return c.json({ message: "Passwords do not match!" }, 400);
    }
    try {
        const res = await db.insert(table.users).values({
            username: username,
            email: email,
            password: hashedPassword
        })
        console.log(res)
        return c.json({ message: "User created successfully!" }, 201)
    } catch (error) {
        console.log(error)
        return c.json({ message: "Bad request!" }, 400)
    }


});

app.post('/login', async (c) => {
    const { username, password } = await c.req.json()
    const hashedPassword = bcrypt.compareSync(password, pass)

    const result = await db
        .select()
        .from(table.users)
        .where(
            sql`${table.users.username} = ${username} OR ${table.users.password} = ${hashedPassword}`
        );

        console.log(result.length)
    if(result.length<1){
        return c.json({message: "User not found!"},401)
    }else{
        return c.json({message: "Login successfully!"},200)
    }

})


export default app;