import { Hono } from "hono";

const app = new Hono()

app.post("/offerapply", async(c)=>{
    const {sender_id , post_id , content, post_type} = await c.req.json();
})

export default app;
