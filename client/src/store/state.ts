import { IChatApi } from "../api/IChatApi";
import { Message } from "../models/Message";

export enum LoadingEnum{
	idle,
	loading,
	loaded
}

export type ChatState = {
	messages: Message[],
	loading: LoadingEnum,
	hasErrors: boolean,
	loadMessages: (api: IChatApi, startIndex: number, pageSize: number) => Promise<void>,
	addReply: (api: IChatApi, newReply: Message) => Promise<void>,
	sync: (incomingReply: Message) => void
}