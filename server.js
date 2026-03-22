const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const EARTH_API = "https://ubapi.earthlink.iq/api/user";

app.post('/api/login', async (req, res) => {
    try {
        const response = await axios.post(`${EARTH_API}/Token`, 
            new URLSearchParams({
                'grant_type': 'password',
                'username': req.body.username,
                'password': req.body.password,
                'Logintype': '0'
            }),
            { 
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded' 
                } 
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        res.status(401).json({ 
            error: 'فشل تسجيل الدخول',
            details: error.response?.data?.error_description || error.message 
        });
    }
});

app.get('/api/userdata', async (req, res) => {
    try {
        const response = await axios.get(`${EARTH_API}/GetUserDataAr`, {
            headers: { 
                'Authorization': `Bearer ${req.query.token}` 
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('UserData error:', error.response?.data || error.message);
        res.status(500).json({ 
            error: 'فشل جلب البيانات',
            details: error.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
