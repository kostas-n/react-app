import { Message } from "../models/Message";
import { AxiosResponse, CancelToken } from 'axios';

export interface ILoadMessages {
	startIndex: number,
	pageSize: number,
	total: number,
	messages: Message[]
}

export interface IAddReply {
	message: Message
}

export interface IChatApi{
	loadMessages(startIndex: number, pageSize: number, cancelToken: CancelToken): Promise<AxiosResponse<ILoadMessages>>,
	addReply(addReply: IAddReply, cancelToken: CancelToken): Promise<AxiosResponse<void>>
}