import { Hono } from 'hono';
// import multer from 'multer';
// import path from 'path';

const app = new Hono();

// ตั้งค่า Multer สำหรับการจัดการไฟล์
// const upload = multer({
//   dest: 'uploads/', // กำหนดที่เก็บไฟล์
//   limits: { fileSize: 10 * 1024 * 1024 }, // จำกัดขนาดไฟล์
//   fileFilter(req, file, cb) {
//     if (!file.mimetype.startsWith('image/')) {
//       return cb(new Error('Only image files are allowed.'));
//     }
//     cb(null, true);
//   },
// });

// API สำหรับอัปโหลดไฟล์และแสดงข้อมูล
app.post('/upload', async (c) => {
    const body = await c.req.parseBody()
    const file = body.image;
    console.log(body)
    return c.json("hello",200)

});

// เริ่มเซิร์ฟเวอร์
export default app;
