import { useEffect, useRef } from 'react';

import ReactMarkdown from 'react-markdown';

// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Message, Chat } from '../stores/chatStore.types';

import { formatTime } from '../utils/formatTime';

// @ts-ignore
import AnswerLoading from './AnswerLoading';

import chatStyles from './styles/Chat.module.css';

type ChatMessageProps = {
    message: Message;
    currentChat: Chat;
    index: number;
};

export default function ChatMessage({
    message,
    currentChat,
    index,
}: ChatMessageProps) {
    const lastAnswerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (lastAnswerRef.current) {
            lastAnswerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentChat, currentChat?.messages]);

    return (
        <div className={chatStyles['message-container']} key={message.id}>
            <div className={chatStyles['question-container']}>
                <div className={chatStyles['question-avatar']}>
                    <img src='/default-avatar.png' alt='avatar' />
                </div>
                <div className={chatStyles['question-content']}>
                    <span>{message.question}</span>

                    <span className={chatStyles['question-time']}>
                        {formatTime(message.messageTime)}
                    </span>
                </div>
            </div>

            <div className={chatStyles['answer-container']}>
                <div className={chatStyles['answer-avatar']}>
                    <span>RG</span>
                </div>
                <div className={chatStyles['answer-content']}>
                    {message?.isLoading ? (
                        <AnswerLoading />
                    ) : (
                        <ReactMarkdown
                            components={{
                                code({
                                    inline,
                                    className,
                                    children,
                                    ...props
                                }: {
                                    inline?: boolean;
                                    className?: string;
                                    children?: React.ReactNode;
                                    [key: string]: any;
                                }) {
                                    const match = /language-(\w+)/.exec(
                                        className || ''
                                    );
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            style={oneDark}
                                            children={String(children).replace(
                                                /\n$/,
                                                ''
                                            )}
                                            language={
                                                match ? match[1] : 'plain-text'
                                            }
                                            {...props}
                                        />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        >
                            {message.answer}
                        </ReactMarkdown>
                    )}
                    {index === currentChat.messages.length - 1 && (
                        <div ref={lastAnswerRef} />
                    )}

                    <span
                        className={chatStyles['answer-time']}
                        style={{
                            visibility: message?.isLoading
                                ? 'hidden'
                                : 'visible',
                        }}
                    >
                        {formatTime(message.messageTime)}
                    </span>
                </div>
            </div>
        </div>
    );
}
