import { GoogleGenAI } from '@google/genai';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const geminiApiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

app.post('/responses', async (req, res) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: req.body.prompt,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0,
                },
            },
        });
        res.send({ answer: response.text || 'Error with generating answer' });
    } catch (error) {
        console.error('Error with generating AI response: ', error);
    }
});

app.listen(3000, () => {
    console.log('Server is on');
});
