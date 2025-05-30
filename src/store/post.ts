import { createCategoryPost } from '@/route/forum/category-post'
import { PostCategory } from '@/types'
import { Reply } from '@/types'
import { create } from 'zustand'
import { useAuthStore } from './auth'

interface PostState {
    categories: Partial<PostCategory>[]
    setCategories: (categories: PostCategory[]) => void
    reply: Partial<Reply>
    setReply: (reply: Partial<Reply>) => void
    saveCategory: (category: Partial<PostCategory>) => Promise<void>
}


export const usePostStore = create<PostState>((set) => ({
    categories: [],
    reply: {
        reply: '',
        createdAt: new Date(),
        author: {}
    },
    setCategories: (categories: PostCategory[]) => set({ categories }),
    setReply: (reply: Partial<Reply>) => set({ reply }),
    saveCategory: async (category: Partial<PostCategory>) => {
        const { token } = useAuthStore.getState();
        try {
            const response = await createCategoryPost(category, token);
            set((state) => ({
                categories: [...state.categories, { id: response.categoryId, name: response.name, forumCount: 0 }],
            }));
        } catch (error) {
        }

    }
}
)
)

