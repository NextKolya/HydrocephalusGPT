import { useState } from 'react';

import useChatStore from '../ChatStore';

// AI api urls
const local_server = 'http://localhost:3000/responses'; //* for local test (nodemon)
const render_com_server = 'https://hydrocephalusgpt.onrender.com/responses'; //* for deploy (render.com)

export function useSendMessage() {
    const currentChatId = useChatStore((state) => state.currentChatId);

    const addMessage = useChatStore((state) => state.addMessage);
    const updateAnswer = useChatStore((state) => state.updateAnswer);
    const setCurrentMessage = useChatStore((state) => state.setCurrentMessage);

    const [isLoading, setIsLoading] = useState(false);

    async function sendMessage(question) {
        if (!currentChatId || !question || isLoading) return;

        const now = new Date();
        const newMessage = {
            id: crypto.randomUUID(),
            question: question,
            answer: '',
            isLoading: true,
            messageTime: now,
        };

        addMessage(currentChatId, newMessage);
        setCurrentMessage(newMessage);

        setIsLoading(true);

        try {
            const response = await fetch(render_com_server, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: question }),
            });
            const aiAnswer = await response.json();

            updateAnswer(currentChatId, {
                isLoading: false,
                answer: aiAnswer.answer,
            });
        } catch (error) {
            console.error('Fetch AI response error: ', error);
            return 'Error connecting to AI api server';
        } finally {
            setIsLoading(false);
        }
    }

    return { sendMessage, isLoading };
}
