import { Hono } from 'hono'
import bcrypt from 'bcryptjs'
const app = new Hono()

const user: string = "tony"
const pass: string = "$2a$10$HWlro/jvsB23bWzbLKYarOZN2fVzGcPzZekongL.oGiOiuwMl/BxG"

app.post('/register', async (c) => {
    const { username, email, password, confirmpassword } = await c.req.json();
    //hash password

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
    const hashedPassword = bcrypt.hashSync(password, 10)
    console.log(hashedPassword)

    return c.json({message: "User created successfully!"},201)
});

app.post('/login', async (c)=>{
    const {username, password} = await c.req.json()
    const hashedPassword = bcrypt.compareSync(password, pass)

    if(hashedPassword){
        return c.json({message: "okay!"},200)
    }else{
        return c.json({message: "not okay!"},400)
    }

})


export default app;