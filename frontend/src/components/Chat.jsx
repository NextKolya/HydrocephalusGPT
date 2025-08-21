import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import useChatStore from '../ChatStore';

import MessageInput from './MessageInput';

import chatStyles from './styles/Chat.module.css';

export default function Chat() {
    const chats = useChatStore((state) => state.chats);
    const currentChatId = useChatStore((state) => state.currentChatId);
    const currentChat = chats.find((chat) => chat.id === currentChatId);

    const now = new Date();

    return (
        <>
            <div className={chatStyles.chat}>
                <div className={chatStyles.messages}>
                    {currentChat?.messages?.map((message) => (
                        <div
                            className={chatStyles['message-container']}
                            key={message.id}
                        >
                            <div className={chatStyles['question-container']}>
                                <div className={chatStyles['question-avatar']}>
                                    <img
                                        src='/default-avatar.png'
                                        alt='avatar'
                                    />
                                </div>
                                <div className={chatStyles['question-content']}>
                                    <span>{message.question}</span>

                                    <span
                                        className={chatStyles['question-time']}
                                    >
                                        {now.getHours()}:{now.getMinutes()}
                                    </span>
                                </div>
                            </div>

                            <div className={chatStyles['answer-container']}>
                                <div className={chatStyles['answer-avatar']}>
                                    <span>RG</span>
                                </div>
                                <div className={chatStyles['answer-content']}>
                                    <ReactMarkdown>
                                        {message.answer}
                                    </ReactMarkdown>

                                    <span className={chatStyles['answer-time']}>
                                        {now.getHours()}:{now.getMinutes()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <MessageInput></MessageInput>
        </>
    );
}
