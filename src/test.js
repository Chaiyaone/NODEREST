const express = require('express');
const app = express();

app.use(express.json()); // Middleware สำหรับให้ Express อ่าน JSON จาก req.body

app.post('/users', (req, res) => {
    const { name, age } = req.body;
    console.log(req.body.name)
    res.json({ message: `สร้างผู้ใช้ ${name} อายุ ${age} ปี สำเร็จ!` });
});
app.get('/hello', (req, res) => {
    res.send('สวัสดี!'); // ส่งข้อความกลับไปยังไคลเอนต์
});
app.listen(3000, () => console.log('Server is running on port 3000'));
