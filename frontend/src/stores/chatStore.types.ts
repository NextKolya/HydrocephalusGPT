export type Chat = {
    title: string;
    id: string;
    messages: Message[];
};

export type Message = {
    id: string;
    question: string;
    answer: string;
    isLoading: boolean;
    messageTime: Date;
};

type NewAnswerContent = {
    isLoading: boolean;
    answer: string;
};

export interface ChatStore {
    chats: Chat[];

    createChat: (newChat: Chat) => void;
    deleteChat: (chatId: string) => void;
    editChatTitle: (chatId: string, newTitle: string) => void;

    currentChatId: string | null;
    setCurrentChat: (chat: Chat) => void;

    currentMessage: Message | null;
    setCurrentMessage: (message: Message | null) => void;

    addMessage: (chatId: string, message: Message) => void;

    updateAnswer: (chatId: string, newAnswerContent: NewAnswerContent) => void;
}
