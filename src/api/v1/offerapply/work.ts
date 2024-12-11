import { Hono } from "hono";
import { db } from '$db'
import * as table from '$schema';

const app = new Hono()

app.post("/offerapply", async(c)=>{
    const {sender_id , post_id , content, post_type} = await c.req.json();
    console.log({sender_id , post_id , content, post_type});

    const response = await db.insert(table.postOfferApply).values({
        user_id: sender_id,
        post_id: post_id,
        action_type: post_type,
        content: content,
        status: "pending"
    })

    if(response){
        return c.json({message: "Thank you! Your request has been processed successfully."},201);
    }else{
        return c.json({message: "Something wrong!"},400);
    }
    

})

export default app;
