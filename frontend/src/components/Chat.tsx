import { useParams } from 'react-router-dom';

import useChatStore from '../stores/ChatStore';

import MessageInput from './MessageInput';

import ChatMessage from './ChatMessage';

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
