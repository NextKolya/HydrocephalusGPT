import { useState } from 'react';

import useChatStore from '../ChatStore';

const local_server = 'http://localhost:3000/responses';
const render_com_server = 'https://hydrocephalusgpt.onrender.com/responses';

export function useSendMessage() {
    const chats = useChatStore((state) => state.chats);
    const currentChatId = useChatStore((state) => state.currentChatId);
    // const currentChat = chats.find((chat) => chat.id === currentChatId);

    const addMessage = useChatStore((state) => state.addMessage);
    const updateAnswer = useChatStore((state) => state.updateAnswer);
    const setCurrentMessage = useChatStore((state) => state.setCurrentMessage);

    const [loading, setLoading] = useState(false);

    // async function getAIresponse(prompt) {
    //     setLoading(true);
    //     try {
    //         const response = await fetch(render_com_server, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ prompt: prompt }),
    //         });

    //         const aiAnswer = await response.json();
    //         return aiAnswer.answer;
    //     } catch (error) {
    //         console.error('Fetch AI response error: ', error);
    //         return 'Error connecting to AI api server';
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    async function sendMessage(question, setQuestion) {
        if (!currentChatId || !question || loading) return;

        const now = new Date();
        const newMessage = {
            id: crypto.randomUUID(),
            question: question,
            answer: 'generating',
            messageTime: `${now.getHours()}:${now.getMinutes()}`,
        };

        addMessage(currentChatId, newMessage);
        setCurrentMessage(newMessage);

        setQuestion('');

        setLoading(true);
        try {
            const response = await fetch(render_com_server, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: question }),
            });
            const aiAnswer = await response.json();

            updateAnswer(currentChatId, aiAnswer.answer);
        } catch (error) {
            console.error('Fetch AI response error: ', error);
            return 'Error connecting to AI api server';
        } finally {
            setLoading(false);
        }
    }

    return { sendMessage, loading };
}
