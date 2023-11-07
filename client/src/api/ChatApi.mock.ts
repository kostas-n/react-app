import { IAddReply, IChatApi, ILoadMessages } from "./IChatApi";

import { AxiosResponse, CancelToken } from "axios";
import { MockedMessages } from "./mocks/messagesMock";

export default class ChatApi implements IChatApi{
	loadMessages = (startIndex: number, pageSize: number, cancelToken: CancelToken):  Promise<AxiosResponse<ILoadMessages>> => {
		return new Promise<AxiosResponse<ILoadMessages>>((resolve) => resolve({
			status: 200,
			statusText: 'OK',
			config: {},
			headers: {},
			data: {
				startIndex: 0,
				pageSize: 20,
				total: 30,
				messages: MockedMessages
			}
		})
	)}

	addReply(addReply: IAddReply, cancelToken: CancelToken): Promise<AxiosResponse<void, any>> {
		return new Promise<AxiosResponse<void, any>>((resolve) => resolve({
			status: 201,
			statusText: 'OK',
			config: {},
			headers: {},
			data: undefined
		})
	)}
}