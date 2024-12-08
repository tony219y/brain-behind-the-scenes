import { Hono } from 'hono'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import { db } from '$db'
import * as table from '$schema';
import { eq, is, or, sql } from 'drizzle-orm';
const app = new Hono()

const JWT_SECRET = 'secret';

app.post('/register', async (c) => {
    const { username, fullname, email, password, confirmpassword } = await c.req.json();

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
            fullname: fullname,
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

    const result = await db
        .select()
        .from(table.users)
        .where(
            sql`${table.users.username} = ${username}`
        );

    console.log()
    if (result.length < 1) {
        return c.json({ message: "User not found!" }, 401)
    }
    const user = result[0];
    if (!user.password) {
        return c.json({ message: "User not found!!" }, 400);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return c.json({ message: "User not found!!" }, 400);
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return c.json({ message: "Login successfully!", token }, 200);

})

// Middleware เพื่อตรวจสอบ Token
const verifyToken = (c: any) => {
    const authHeader = c.req.headers.get('Authorization')
    if (!authHeader) {
        return c.json({ message: 'No token provided' }, 401)
    }

    const token = authHeader.split(' ')[1]


    try {
        const decoded = jwt.verify(token, JWT_SECRET) // ตรวจสอบ JWT Token
        c.set('user', decoded)  // เก็บข้อมูลผู้ใช้ที่ถูก decode ใน context ของ Hono
        return true
    } catch (error) {
        return c.json({ message: 'Invalid token' }, 403)
    }
}

// /home endpoint ที่ต้องการการยืนยันตัวตน
app.get('/verify', async (c) => {
    const authHeader = c.req.header('Authorization')
    const token = authHeader?.split(' ')[1];

    if (!token) {
        return c.json({ message: 'Token is missing' }, 401)
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
    
        if (typeof decoded !== 'string' && 'userId' in decoded && 'username' in decoded) {
            // console.log(decoded)
            // return c.json({ userId: decoded.userId, username: decoded.username }) 
            const userData = await db.select().from(table.users).where(eq(table.users.id, decoded.userId))
            console.log(userData)
            return c.json({
                id: userData[0].id,
                username: userData[0].username,
                fullname: userData[0].fullname,

            },200)
        } else {
            return c.json({ message: 'Invalid token' }, 403)
        }
    } catch (error) {
        return c.json({ message: 'Invalid token' }, 403)
    }
    
});

export default app;