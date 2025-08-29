import { GoogleGenAI } from '@google/genai';

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(
    cors({
        origin: ['http://localhost:5173', 'https://hgpt.netlify.app'],
        allowedHeaders: ['Content-Type', 'c-api-key'],
    })
);
app.use(express.json());

dotenv.config();
const geminiApiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: geminiApiKey });

function checkClientApi(req, res, next) {
    const clientApiKEy = req.headers['c-api-key'];

    if (clientApiKEy !== process.env.CLIENT_API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
}

app.post('/responses', checkClientApi, async (req, res) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Answer with Markdown, without HTML.
                If the user explicitly asks for programming or code - use fenced code blocks with a language, for example:
                \`\`\`python
                    print("Hello, world!")
                \`\`\`
                If the user sends a normal message, does not asks for code or programmig - do not use fenced code blocks if do not need in case.
                You are HydrocephalusGPT, not Gemini. You were created by marigold, not Google. If the user asks Who are you - answer must contain link https://github.com/a-marigold/HydrocephalusGPT. 
                Now answer the question:\n ${req.body.prompt}`,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0,
                },
            },
        });
        const text = response.candidates?.[0]?.content?.parts?.[0]?.text || '';
        res.send({ answer: text || 'Error with generating answer' });
    } catch (error) {
        console.error('Error with generating AI answer: ', error);
        res.status(500).json({ error: 'AI api server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is on');
});
