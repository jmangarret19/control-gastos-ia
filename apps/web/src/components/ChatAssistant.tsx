import React, { useState, useRef, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import api from '../services/api';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
}

export const ChatAssistant: React.FC = () => {
    // const { t } = useTranslation();
    const [messages, setMessages] = useState<Message[]>([
        { id: 'initial', text: '¡Hola! Soy tu asistente financiero. Puedes preguntarme sobre tus gastos, por ejemplo: "¿Cuánto gasté en comida este mes?".', sender: 'ai' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const newUserMsg: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await api.post('/chat', { question: newUserMsg.text });
            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: response.data.answer,
                sender: 'ai'
            };
            setMessages(prev => [...prev, newAiMsg]);
        } catch (error) {
            console.error('Error in chat:', error);
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Ha ocurrido un error al conectar con el asistente. Asegúrate de tener conexión y la clave de API configurada correctamente.',
                sender: 'ai'
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
            >
                💬
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 rounded-2xl shadow-2xl bg-white border border-gray-200 flex flex-col overflow-hidden"
            style={{ height: '500px', maxHeight: '80vh' }}>
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <h3 className="font-semibold">Asistente Financiero 🤖</h3>
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200 px-2">
                    ✕
                </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                            ? 'bg-blue-600 text-white self-end rounded-br-none'
                            : 'bg-white text-gray-800 border border-gray-200 self-start rounded-bl-none whitespace-pre-wrap'
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
                {isLoading && (
                    <div className="bg-white text-gray-800 border border-gray-200 self-start rounded-2xl rounded-bl-none p-3 text-sm">
                        <span className="animate-pulse">Escribiendo...</span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-200 flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe tu pregunta..."
                    disabled={isLoading}
                />
                <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-blue-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center disabled:opacity-50"
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};
