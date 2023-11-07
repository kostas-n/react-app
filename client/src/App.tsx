import './App.css';
import { ChatViewer } from './components/ChatViewer';
import ChatApi from './api/ChatApi.mock';
import { ChatContext } from './context/ChatContext';
import { useState } from 'react';
import { useSocket } from './context/Socket';


function App() {
	const [joiner, setJoiner] = useState<string>('');
	const chatId = crypto.randomUUID();
	const socket = useSocket();
	const context = {joiner, api: new ChatApi(), setJoiner, socket, chatId};
	
	return (
		<div className="App">
			<div className="ChatViewer">
				<ChatContext.Provider value={context}>
					<ChatViewer />
				</ChatContext.Provider>
			</div>
		</div>
	);
}

export default App;
