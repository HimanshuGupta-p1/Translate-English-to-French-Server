const express = require('express');
const translatte = require('translatte');
const dotenv = require('dotenv')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// POST method to translate english text to french.

app.post('/', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text to translate not provided' });
    }

    try {
        const translation = await translatte(text, { to: 'fr' });
        res.status(200).json({ translation: translation.text });
    } catch (error) {
        console.error('Translation error:', error);
        res.status(500).json({ error: 'Translation failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
