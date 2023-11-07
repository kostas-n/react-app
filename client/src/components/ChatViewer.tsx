import { useContext, useEffect, useRef, useState } from "react";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";
import { useChatStore } from "../store/useChatStore";
import { ChatState, LoadingEnum } from "../store/state";
import { Message } from "../models/Message";
import { ChatContext } from "../context/ChatContext";
import { Spin } from "antd";
import { NameInput } from "./NameInput";
import { ChatMessage } from "../context/Socket";

const NEW_REPLY = "NEW_REPLY";

export const ChatViewer = () => {
	const [reply, setReply] = useState<string>('');
	const [currentUser, setCurrentUser] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState(false)
	const state = useChatStore((state: ChatState) => state);
	const {joiner, api, setJoiner, socket, chatId} = useContext(ChatContext); 
	const joinerByRef = useRef('');
	const chatIdByRef = useRef('');
	chatIdByRef.current = chatId;
	joinerByRef.current = joiner;

	useEffect(() => {
		socket.on && socket.on("NEW_REPLY_POSTED", (t: ChatMessage) => {
			console.log(`receiving reply from ${t.reply.postedBy} ${socket.id} ${chatId}`)
			if (t.chatId !== chatIdByRef.current) { state.sync(t.reply); }
		});
		return () => { socket.removeListener("NEW_REPLY_POSTED") };
	}, [chatId, socket, state]);

	useEffect(() => {
		if (state.loading === LoadingEnum.idle){
			state.loadMessages(api, 0, 20);
		}
	});

	const onSubmit = () => {
		setIsSubmitting(true);

		const newReply: Message = {content: reply, postedBy: joinerByRef.current};
		state.addReply(api, newReply);
		
		setIsSubmitting(false);
		console.log(`emitting ${socket.id}`)

		socket.emit && socket.emit(NEW_REPLY, {reply: newReply, chatId});
	}

	if (state.loading !== LoadingEnum.loaded) {return <div>Loading...</div>}

	const onNewReplySet = (e:  React.ChangeEvent<HTMLTextAreaElement>) => {
		setReply(e.target.value);
	}

	const onNameInputSet = (e:  React.ChangeEvent<HTMLInputElement>) => {
		setCurrentUser(e.target.value);
	}

	const onJoin = () =>{
		setJoiner(currentUser);
	}

	return (
		<div>
			<div>
				<NameInput isReadOnly={!!joinerByRef.current} onJoin={onJoin} onNameInputChange={onNameInputSet} />
			</div>
			<div>
				<MessageList messages={state.messages} />
			</div>
			<div className="MessageInput">
				<Spin spinning={isSubmitting}>
					<MessageInput onInputChange={onNewReplySet} onSubmit={onSubmit}/>
				</Spin>
			</div>
		</div>
	);
}

