import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";

interface IMessageInputProps {
	onInputChange: React.ChangeEventHandler<HTMLTextAreaElement>,
	onSubmit: React.FormEventHandler<any>
};

export const MessageInput = (props: IMessageInputProps) => {
	return (
		<div>
			<TextArea 
				id="messageInput" 
				rows={2} 
				placeholder="Type your reply..."
				onChange={props.onInputChange}
			/>
			<div className="InputButton">
				<Button type="primary" onClick={props.onSubmit}>Submit</Button>
			</div>
		</div>
	);
}