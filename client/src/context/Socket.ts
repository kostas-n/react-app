import { Message } from "../models/Message";
import socketio from "socket.io-client";

const SOCKET_URL = "http://localhost:4000";

export type ChatMessage = {reply:Message, chatId: string}

export const useSocket = () => {
	const socket = socketio(SOCKET_URL).connect();
	// const state = useChatStore((state: ChatState) => state);
	// const {chatId} = useContext(ChatContext); 
	// const chatIdByRef = useRef('');
	// chatIdByRef.current = chatId;

	// socket.on && socket.on("NEW_REPLY_POSTED", (t: ChatMessage) => {
	// 	console.log(`receiving reply from ${t.reply.postedBy} ${socket.id}`)
	// 	if (t.chatId !== chatIdByRef.current) { state.sync(t.reply); }
	// });

	return socket;
}
