import { create } from 'zustand'
import { ChatState, LoadingEnum } from './state'
import axios, { AxiosResponse } from 'axios';
import { IChatApi, ILoadMessages } from '../api/IChatApi';
import { Message } from "../models/Message";

export const useChatStore = create<ChatState>((set) => ({
	messages: [],
	loading: LoadingEnum.idle,
	hasErrors: false,
	loadMessages: async (api: IChatApi, startIndex: number, pageSize: number) =>{
		const source = axios.CancelToken.source();
		set(() => ({ loading: LoadingEnum.loading }));
		return api.loadMessages(startIndex, pageSize, source.token)
			.then((response: AxiosResponse<ILoadMessages>) => {
				if (response.status === 200) {
					console.log('Resolved');
					set(() => ({ messages: response.data.messages, loading: LoadingEnum.loaded }));
				} else {
					set(() => ({ hasErrors: true, loading: LoadingEnum.loaded }));
				}
			});
	},
	addReply: (api: IChatApi, newReply: Message) => {
		const source = axios.CancelToken.source();
		return api.addReply({message: newReply}, source.token)
			.then((response: AxiosResponse<void, any>) => {
				if (response.status === 201) {
					console.log('Added');
					set((state: ChatState) => ({ 
						messages: [...state.messages, newReply],
					}))
				}
			});
	},
	sync: (incomingReply: Message) => {
		console.log('Synced');
		set((state: ChatState) => ({ 
			messages: [...state.messages, incomingReply],
		}))
	}
}))