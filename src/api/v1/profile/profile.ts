import { Hono } from 'hono'

const app = new Hono();

app.post('/profile', async (c) => {
    const {name} = await c.req.json();
    console.log(name + " from back");

    return c.json({message : name}, 200)
})

export default app;