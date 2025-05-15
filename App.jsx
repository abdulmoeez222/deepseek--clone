import { useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ChatWindow from './components/ChatWindow'
import InputArea from './components/InputArea'
import { useChatbot } from './hooks/useChatbot'

function App() {
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState({ id: 'default', messages: [] });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { sendMessage, loading, error } = useChatbot();
  
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    const updatedMessages = [
      ...currentConversation.messages,
      { role: 'user', content: message }
    ];
    
    setCurrentConversation(prev => ({
      ...prev,
      messages: updatedMessages
    }));
    
    try {
      // Send message to AI and get response
      const response = await sendMessage(message, updatedMessages);
      
      // Add AI response to conversation
      setCurrentConversation(prev => ({
        ...prev,
        messages: [...prev.messages, { role: 'assistant', content: response }]
      }));
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };
  
  const startNewConversation = () => {
    const newConversationId = Date.now().toString();
    const newConversation = {
      id: newConversationId,
      messages: []
    };
    
    setConversations(prev => [...prev, newConversation]);
    setCurrentConversation(newConversation);
  };
  
  const switchConversation = (conversationId) => {
    const conversation = conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
    }
  };
  
  // Save conversations to localStorage
  useEffect(() => {
    const allConversations = [
      ...conversations.filter(conv => conv.id !== currentConversation.id),
      currentConversation
    ];
    
    setConversations(allConversations);
    localStorage.setItem('conversations', JSON.stringify(allConversations));
  }, [currentConversation]);
  
  // Load conversations from localStorage
  useEffect(() => {
    const savedConversations = localStorage.getItem('conversations');
    if (savedConversations) {
      const parsedConversations = JSON.parse(savedConversations);
      setConversations(parsedConversations);
      
      if (parsedConversations.length > 0) {
        setCurrentConversation(parsedConversations[parsedConversations.length - 1]);
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar 
        conversations={conversations}
        currentConversationId={currentConversation.id}
        onSelectConversation={switchConversation}
        onNewConversation={startNewConversation}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-hidden flex flex-col">
          <ChatWindow 
            messages={currentConversation.messages}
            loading={loading}
            error={error}
          />
          
          <InputArea onSendMessage={handleSendMessage} disabled={loading} />
        </main>
      </div>
    </div>
  );
}

export default App 