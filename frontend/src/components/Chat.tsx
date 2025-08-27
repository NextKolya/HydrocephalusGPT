import { useEffect, useRef, ReactNode } from 'react';
import { useParams } from 'react-router-dom';

// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import useChatStore from '../stores/ChatStore';

import { formatTime } from '../utils/formatTime';

import MessageInput from './MessageInput';
import ChatMessage from './ChatMessage';
// @ts-ignore
import AnswerLoading from './AnswerLoading';

import chatStyles from './styles/Chat.module.css';

export default function Chat() {
    const { currentChatId } = useParams();

    const chats = useChatStore((state) => state.chats);
    const currentChat = chats.find((chat) => chat.id === currentChatId);

    return (
        <>
            <div className={chatStyles.chat}>
                <div className={chatStyles.messages}>
                    {currentChat?.messages?.map((message, index) => (
                        <ChatMessage
                            message={message}
                            currentChat={currentChat}
                            index={index}
                            key={message.id}
                        />
                    ))}
                </div>
            </div>
            <MessageInput></MessageInput>
        </>
    );
}
