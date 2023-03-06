import { createContext, useState } from "react";

type HomePageContextType = {
    showLoginForm: boolean;
    setShowLoginForm: (val: boolean) => void;
    showRegisterForm: boolean;
    setShowRegisterForm: (val: boolean) => void;
}
export const HomePageContext = createContext<HomePageContextType | null>(null);