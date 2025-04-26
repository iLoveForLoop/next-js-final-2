import { create } from "zustand";

type MyState = {
    username: string;
    setUsername: (value: string) => void;
}

export const useMyStore = create<MyState>((set)=>({
    username: '',
    setUsername: (value) => set({username: value})
}))