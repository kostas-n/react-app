import { CheckOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";

interface INameInputProps {
	onNameInputChange: React.ChangeEventHandler<HTMLInputElement>,
	onJoin: React.FormEventHandler<any>,
	isReadOnly: boolean
};

export const NameInput = (props: INameInputProps) => {
	return (
		<div>
			<Space.Compact>
				<Input 
					disabled={props.isReadOnly}
					placeholder="Join as..."
					onChange={props.onNameInputChange}
				/>
				<Button disabled={props.isReadOnly} icon={<CheckOutlined />} onClick={props.onJoin}/>
			</Space.Compact>
		</div>
	);
}