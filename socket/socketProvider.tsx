"use client"
import React, { useCallback, useContext, useEffect, useState } from "react"
import { io, Socket } from 'socket.io-client'

export interface ProductUpdateEvent {
    itemName: string;
    quantityAdded: number;
    userName: string;
}

interface SocketProviderProps {
    children?: React.ReactNode
}

interface ISocketContext {
    addProduct: (product: ProductUpdateEvent) => void;
    onProductUpdate: (callback: (product: ProductUpdateEvent) => void) => () => void;
}

const SocketContext = React.createContext<ISocketContext | null>(null)

export const useSocket = () => {
    const state = useContext(SocketContext)
    if (!state) {
        throw new Error('useSocket must be used within SocketProvider')
    }
    return state
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket>()

    const addProduct = useCallback((product: ProductUpdateEvent) => {
        console.log('Emitting product:add', product)
        if (socket) {
            socket.emit('product:add', product)
        }
    }, [socket])

    const onProductUpdate = useCallback((callback: (product: ProductUpdateEvent) => void) => {
        if (!socket) return () => {};
        
        const handler = (product: ProductUpdateEvent) => {
            console.log('Product update received:', product);
            callback(product);
        };

        socket.on('product:updated', handler);

        // Return cleanup function
        return () => {
            socket.off('product:updated', handler);
        };
    }, [socket])

    useEffect(() => {
        const _socket = io('http://localhost:8000', {
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5
        })
        
        console.log('Socket connecting...');

        _socket.on('connect', () => {
            console.log('Socket connected successfully:', _socket.id);
        });

        _socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
        });

        _socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        setSocket(_socket)

        return () => {
            console.log('Disconnecting socket...');
            _socket.disconnect()
            setSocket(undefined)
        }
    }, [])

    return (
        <SocketContext.Provider value={{ addProduct, onProductUpdate }}>
            {children}
        </SocketContext.Provider>
    )
}