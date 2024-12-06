import { Hono } from 'hono'

const app = new Hono()

app.post('/register', async (c) => {
    const { username, email, password, confirmpassword } = await c.req.json();

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

    return c.json({message: "User created successfully!"},200)
});


export default app;