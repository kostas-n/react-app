import { List } from "antd";
import { Message } from "../models/Message";

interface IMessageListProps {
	messages: Message[];
}

export const MessageList = (props: IMessageListProps) => {
	return (
		<List
			itemLayout="horizontal"
			dataSource={props.messages}
			renderItem={(item, index) => (
			<List.Item>
				<List.Item.Meta
				title={`Posted by ${item.postedBy}`}
				description={item.content}
				/>
			</List.Item>
			)}
	  />);
}