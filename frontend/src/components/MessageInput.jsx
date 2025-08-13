import { useState } from 'react';

import useChatStore from '../ChatStore';

import messageInput from './styles/MessageInput.module.css';

export default function MessageInput() {
    const [question, setQuestion] = useState('');

    const chats = useChatStore((state) => state.chats);
    const currentChatId = useChatStore((state) => state.currentChatId);
    const currentChat = chats.find((chat) => chat.id === currentChatId);

    const addMessage = useChatStore((state) => state.addMessage);
    const updateAnswer = useChatStore((state) => state.updateAnswer);
    const setCurrentMessage = useChatStore((state) => state.setCurrentMessage);

    async function getAIresponse(prompt) {
        try {
            const response = await fetch(
                'https://hydrocephalusgpt.onrender.com/responses',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: prompt }),
                }
            );

            const data = await response.json();
            return data.answer;
        } catch (error) {
            console.error('Fetch AI response error: ', error);
            return 'Error connecting to AI api server';
        }
    }

    async function sendMessage() {
        if (!currentChatId || !currentChat?.id || !question) return;

        const newMessage = {
            id: crypto.randomUUID(),
            question: question,
            answer: 'generating',
        };

        addMessage(currentChat.id, newMessage);
        setCurrentMessage(newMessage);

        setQuestion('');

        getAIresponse(question).then((ai_answer) =>
            updateAnswer(currentChat.id, ai_answer)
        );
    }

    return (
        <div className={messageInput['message-input-container']}>
            <div className={messageInput['message-input']}>
                <input
                    type='text'
                    placeholder='Message hydrocephalusGPT...'
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                />

                <img
                    src='clip-icon.svg'
                    alt='clip'
                    className={messageInput['clip-icon']}
                />

                <div className={messageInput['send-buttons-container']}>
                    <button className={messageInput['voice-button']}>
                        <img src='voice-button.svg' alt='voice' />
                    </button>

                    <button
                        className={
                            currentChat && question
                                ? messageInput['send-button']
                                : `${messageInput['send-button']} ${messageInput['send-button-disabled']}`
                        }
                        onClick={sendMessage}
                    >
                        <img src='top-arrow-icon.svg' alt='send' />
                    </button>
                </div>
            </div>

            <span>
                HydrocephalusGPT can make mistakes. Check our Terms &
                Conditions.
            </span>
        </div>
    );
}
