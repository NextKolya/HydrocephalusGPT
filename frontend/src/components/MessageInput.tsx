import { useState, useEffect } from 'react';

import useChatStore from '../stores/ChatStore';
import { useSendMessage } from '../hooks/useSendMessage';

import messageInput from './styles/MessageInput.module.css';

export default function MessageInput() {
    const [question, setQuestion] = useState('');

    const chats = useChatStore((state) => state.chats);
    const currentChatId = useChatStore((state) => state.currentChatId);
    const currentChat = chats.find((chat) => chat.id === currentChatId);

    const { sendMessage, isLoading } = useSendMessage();

    const [inputContent, setInputContent] = useState(
        window.matchMedia('(max-width: 520px)').matches
            ? 'Message hGPT...'
            : 'Message hydrocephalusGPT...'
    );
    useEffect(() => {
        function handleResize() {
            setInputContent(
                window.matchMedia('(max-width: 520px)').matches
                    ? 'Message hGPT...'
                    : 'Message hydrocephalusGPT...'
            );
        }
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={messageInput['message-input-container']}>
            <div className={messageInput['message-input']}>
                <input
                    type='text'
                    placeholder={inputContent}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage(question);
                            setQuestion('');
                        }
                    }}
                />

                <img
                    src='/clip-icon.svg'
                    alt='clip'
                    className={messageInput['clip-icon']}
                />

                <div className={messageInput['send-buttons-container']}>
                    <button className={messageInput['voice-button']}>
                        <img src='/voice-button.svg' alt='voice' />
                    </button>

                    <button
                        className={
                            currentChat && question && !isLoading
                                ? messageInput['send-button']
                                : `${messageInput['send-button']} ${messageInput['send-button-disabled']}`
                        }
                        onClick={() => {
                            sendMessage(question);
                            setQuestion('');
                        }}
                    >
                        <img src='/top-arrow-icon.svg' alt='send' />
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
