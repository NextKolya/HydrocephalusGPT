import { create } from 'zustand';

const useChatStore = create((set) => ({
    chats: [
        // TEST chat
        // { id: crypto.randomUUID(), title: 'test chat', messages: [] }
    ],
    createChat: (newChat) => {
        set((state) => {
            if (state.chats.length >= 3) return {};
            return {
                chats: [...state.chats, newChat],
                currentChatId: newChat.id,
            };
        });
    },
    deleteChat: (chatId) => {
        set((state) => ({
            chats: state.chats.filter((chat) => chat.id !== chatId),
        }));
    },
    editChatTitle: (chatId, newTitle) => {
        set((state) => ({
            chats: state.chats.map((chat) =>
                chat.id === chatId ? { ...chat, title: newTitle } : chat
            ),
        }));
    },

    currentChatId: null,
    setCurrentChat: (chat) => {
        set(() => ({ currentChatId: chat.id }));
    },
    addMessage: (chatId, message) => {
        set((state) => ({
            chats: state.chats.map((chat) =>
                chat.id === chatId
                    ? {
                          ...chat,
                          messages: [
                              ...chat.messages,
                              {
                                  ...message,
                              },
                          ],
                      }
                    : chat
            ),
        }));
    },
    currentMessage: null,
    setCurrentMessage: (message) => {
        set(() => ({ currentMessage: message ?? null }));
    },
    updateAnswer: (chatId, newAnswerContent) => {
        set((state) => {
            if (!state.currentMessage) return;

            return {
                chats: state.chats.map((chat) =>
                    chat.id === chatId
                        ? {
                              ...chat,
                              messages: chat.messages.map((message) =>
                                  message.id === state.currentMessage.id
                                      ? {
                                            ...message,
                                            answer: newAnswerContent,
                                        }
                                      : message
                              ),
                          }
                        : chat
                ),
                currentMessage: {
                    ...state.currentMessage,
                    answer: newAnswerContent,
                },
            };
        });
    },
}));

export default useChatStore;
