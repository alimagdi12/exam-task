/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Quiz, QuizContextType } from '../../modals/modals';

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchQuizzes = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://blog2-uj54.onrender.com/api/exams');
            setQuizzes(response.data.data);
        } catch (error) {
            setError("Error fetching quizzes.");
        } finally {
            setLoading(false);
        }
    };

    const addQuiz = async (quiz: Omit<Quiz, '_id' | 'createdAt'>) => {
        setLoading(true);
        setError(null);
        try {
            console.log(quiz);
            const response = await axios.post('https://blog2-uj54.onrender.com/api/exam', quiz);
            console.log(response);

            setQuizzes((prev) => [...prev, response.data.data]);
            toast.success('Quiz Added Successfully...')
        } catch (error) {
            setError("Error adding quiz.");
        } finally {
            setLoading(false);
        }
    };

    const updateQuiz = async (id: string, updatedQuiz: Omit<Quiz, '_id' | 'createdAt'>) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.patch(`https://blog2-uj54.onrender.com/api/exam/${id}`, updatedQuiz);

            setQuizzes((prev) =>
                prev.map((quiz) => (quiz._id === id ? response.data.data : quiz))
            );
            toast.info('Announcement updated successfully...')
        } catch (error) {
            setError("Error updating quiz.");
        } finally {
            setLoading(false);
        }
    };

    const deleteQuiz = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`https://blog2-uj54.onrender.com/api/exam/${id}`);
            setQuizzes((prev) => prev.filter((quiz) => quiz._id !== id));
            toast.error('Announcement deleted successfully...')
        } catch (error) {
            setError("Error deleting quiz.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    return (
        <QuizContext.Provider value={{ quizzes, loading, error, fetchQuizzes, addQuiz, updateQuiz, deleteQuiz }}>
            {children}
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error("useQuizContext must be used within a QuizProvider");
    }
    return context;
};
