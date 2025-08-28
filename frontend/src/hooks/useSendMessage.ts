import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useChatStore from '../stores/ChatStore';
import { Chat } from '../stores/chatStore.types';

// AI api urls
const _local_server = 'http://localhost:3000/responses'; //* for local test (nodemon)
const _render_com_server = 'https://hydrocephalusgpt.onrender.com/responses'; //* for deploy (render.com)

export function useSendMessage() {
    const currentChatId = useChatStore((state) => state.currentChatId);

    const createChat = useChatStore((state) => state.createChat);
    const setCurrentChat = useChatStore((state) => state.setCurrentChat);

    const addMessage = useChatStore((state) => state.addMessage);
    const updateAnswer = useChatStore((state) => state.updateAnswer);
    const setCurrentMessage = useChatStore((state) => state.setCurrentMessage);

    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    async function sendMessage(
        question: string,
        setQuestion: (newQuestion: string) => void
    ) {
        if (!question || isLoading) return;

        const now = new Date();

        const newMessage = {
            id: crypto.randomUUID(),
            question: question,
            answer: '',
            isLoading: true,
            messageTime: now,
        };

        let chatId = currentChatId;

        if (!chatId) {
            const newChat: Chat = {
                title: 'New Chat',
                id: crypto.randomUUID(),
                messages: [newMessage],
            };
            createChat(newChat);

            setCurrentChat(newChat);

            chatId = newChat.id;

            setQuestion('');

            navigate(`/chat/${chatId}`);
        } else {
            addMessage(chatId, newMessage);
            setQuestion('');
        }

        setCurrentMessage(newMessage);

        setIsLoading(true);

        try {
            const response = await fetch(_render_com_server, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'c-api-key': import.meta.env.VITE_CLIENT_API_KEY,
                },
                body: JSON.stringify({ prompt: question }),
            });
            const aiAnswer = await response.json();

            updateAnswer(chatId, {
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
