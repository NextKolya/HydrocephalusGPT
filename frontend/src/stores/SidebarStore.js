import { create } from 'zustand';

const useSidebarStore = create((set) => ({
    currentTool: 'Model',
    setCurrentTool: (tool) => {
        set({ currentTool: tool });
    },
}));

export default useSidebarStore;
