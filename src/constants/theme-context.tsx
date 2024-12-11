/* eslint-disable react-refresh/only-export-components */
// src/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

interface ThemeContextProps {
	theme: 'light' | 'dark';
	toggleTheme: () => void;
	setTheme: Dispatch<SetStateAction<'light' | 'dark'>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	// Optional: Initialize theme based on user's system preference or localStorage
	const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
	const initialTheme = savedTheme ? savedTheme : prefersDark ? 'dark' : 'light';

	const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

	const toggleTheme = () => {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
	};

	// Persist theme to localStorage and update HTML class
	React.useEffect(() => {
		localStorage.setItem('theme', theme);
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
