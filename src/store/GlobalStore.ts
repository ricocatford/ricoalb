import { createStore } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

export type GlobalState = {
    theme: "dark" | "light";
    language: "en" | "es";
    isLoading: boolean;
};

export type GlobalActions = {
    toggleTheme: () => void;
    setTheme: (theme: "dark" | "light") => void;
    setLanguage: (language: "en" | "es") => void;
    finishLoading: () => void;
};

export type GlobalStore = GlobalState & GlobalActions;

export const initGlobalStore = (): GlobalState => {
    const browserLanguage = typeof window !== "undefined" ? (navigator.language.startsWith("es") ? "es" : "en") : "en";
    return {
        theme: "dark",
        language: browserLanguage,
        isLoading: true
    }
}

export const defaultInitState: GlobalState = {
    theme: "dark",
    language: "en",
    isLoading: true
}

export const createGlobalStore = (initState: GlobalState = defaultInitState) => {
    return createStore<GlobalStore>()(
        persist(
            (set) => ({
                ...initState,

                toggleTheme: () =>
                    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),

                setTheme: (theme: "dark" | "light") => set({ theme }),

                setLanguage: (language: "en" | "es") => set({ language }),

                finishLoading: () => set({ isLoading: false }),
            }),
            {
                name: "global-storage",
                storage: createJSONStorage(() =>
                    (typeof window !== "undefined" ? localStorage : null) as StateStorage
                ),

                partialize: (state) => ({
                    theme: state.theme,
                    language: state.language,
                }),

                merge: (persisted, current) => ({
                    ...current,
                    ...defaultInitState,
                    ...(persisted as Partial<GlobalStore>),
                    isLoading: true,
                }),
            }
        )
    )
}