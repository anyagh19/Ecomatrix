"use client"
import { storeProduct } from "@/models/store.model"
import React, { useCallback, useEffect } from "react"
import {io} from 'socket.io-client'

interface SocketProviderProps{
    children?: React.ReactNode
}

interface ISocketContext {
    addProduct: (product: storeProduct) => any;
}
const socketConetxt = React.createContext<ISocketContext | null>(null)

export const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {

    const addProduct: ISocketContext['addProduct'] = useCallback((product) => {
        console.log('add product' , product)
    } ,[]) 

    useEffect(() => {
        const _socket = io('http://localhost:8000')

        return () => {
            _socket.disconnect()
        }
    } , [])

    return (
        <socketConetxt.Provider value={{addProduct}}>
            {children}
        </socketConetxt.Provider>
    )
}