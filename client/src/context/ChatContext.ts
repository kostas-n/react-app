import React from "react";
import { IChatApi } from "../api/IChatApi";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface IChatContextProps {
	joiner: string,
	setJoiner: (name: string) => void,
	api: IChatApi,
	socket: Socket<DefaultEventsMap, DefaultEventsMap>,
	chatId: string
} 

export const ChatContext = React.createContext({} as IChatContextProps);