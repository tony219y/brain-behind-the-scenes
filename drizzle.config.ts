import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle', // กำหนดตำแหน่งที่ไฟล์ schema จะถูกดึงมา
  schema: './src/db/schema.ts', // ชี้ไปที่ไฟล์ schema ที่จะใช้
  dialect: 'postgresql', // กำหนดไดอาเล็กต์เป็น PostgreSQL
  dbCredentials: {
    url: process.env.DATABASE_URL!, // ใช้ URL ที่มาจาก .env
  },
});
