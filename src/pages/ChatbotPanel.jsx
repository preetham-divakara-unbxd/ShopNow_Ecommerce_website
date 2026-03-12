import { useShoppingAssistant } from "@unbxd-ui/react-shopping-assistant-hooks";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router";


const ChatbotPanel = ({ onClose, fullWidth=false }) => {
    const {
        startNewConversation,
        askAgent,
        conversation,
        loading,
    } = useShoppingAssistant();
    const [inputText, setInputText] = useState('');
    const bottomRef = useRef(null);
    const navigate=useNavigate();
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);
    


    // console.log("conversation", conversation);
    // console.log("startNewConversation", startNewConversation);
    // console.log("getInitialPrompts", getInitialPrompts);
    // console.log("questions", questions);
    // console.log("conversationId", conversationId);
    // console.log("conversationsList", conversationsList);
    // console.log("loading", loading);
    // console.log("initialLoading", initialLoading);
    // console.log("fetchHistory", fetchHistory);
    // console.log("getAllConversations", getAllConversations);
    // console.log("updateConversationId", updateConversationId);

    const handleSend = () => {
        if (!inputText.trim() || loading) return;
        askAgent(inputText);
        setInputText('');
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className={`chatbot-panel ${fullWidth ? 'chatbot-panel-fullwidth' : ''}`}>
            <div className="chatbot-header">
                <div className="chatbot-header-left">
                    <div className="chatbot-agent-icon">🤖</div>
                    <div className="chatbot-agent-info">
                        <div className="chatbot-agent-name">Product Listing Agent</div>
                        <div className="chatbot-agent-subtitle">I will help you find the perfect products</div>
                    </div>
                </div>
                <div className="chatbot-header-right">
                    <button className="chatbot-new-chat" onClick={startNewConversation}>+ New Chat</button>
                    {!fullWidth && (<button className="chatbot-close" onClick={onClose}>✕</button>)}
                </div>
            </div>
            <div className="chatbot-body">
                <div className="initial-message-component">
                    👋 Hi there! I'm your Furniture Shopping Assistant, ready to help you find exactly what you're looking for. ✨ — What would you like to shop for today?
                    <br />

                </div>
                {conversation.length === 0 && (
                    <div className="initial-message-component">
                        Ask me anything, or try one of these to get started:
                    </div>
                )}
               
                {conversation.map((msg, i) => { 
                    // console.log(msg.content?.products);
                    return (

                    <div key={i} className={`chat-message-wrapper ${msg.role}`}>

                        {msg.role === 'user' && (
                            <>
                                <img src="/icons/user.png" alt="user" className="icon-image" />
                                <div className="chat-user-message">
                                    {msg.message}
                                </div>
                            </>

                        )}


                        {msg.role === 'assistant' && (
                            <div className="chat-assistant-wrapper">
                                <img src="/icons/robot.png" alt="robot" className="icon-image" />
                                <div className="chat-assistant-content">

                                    <div className="chat-assistant-bubble">
                                        {msg.message}
                                    </div>

                                    {msg.content?.filters?.length > 0 && (
                                        <div className="chat-filter-pills">
                                            {msg.content.filters.map((filter, fi) =>
                                                filter.options?.map((option, oi) => (
                                                    <button
                                                        key={`${fi}-${oi}`}
                                                        className="chat-filter-pill"
                                                        onClick={() => askAgent(option, { field: filter.field, options: [option] })}
                                                    >
                                                        {option}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    )}
                                    
                                    {msg.content?.products?.length > 0 && (
                                        <div className="chat-products-section">
                                            <div className="chat-products-heading">Recommended Products:</div>
                                            <div className="chat-products-scroll">
                                                {msg.content.products.map((product) => (
                                                    <div key={product.uniqueId} 
                                                    className="chat-product-card"
                                                    onClick={(e)=>{
                                                         e.preventDefault();
                                                         navigate(`/product/${product.uniqueId}`, { state: { product } });
                                                    }}
                                                    style={{ cursor: "pointer" }}
                                                    >
                                                        <img src={product.imageUrl?.[0]} alt={product.title} />
                                                        <div className="chat-product-title">{product.title}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )})}

                {loading && (
                    <div className="chat-message-wrapper assistant">
                        <img src="/icons/robot.png" alt="robot" className="icon-image" />
                        <div className="chat-assistant-bubble">
                            <span>Analysing your request..</span>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />


            </div>
            <div className="chatbot-input-bar">
                <input
                    type="text"
                    placeholder="Ask me anything..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend} disabled={loading}>
                    {loading ? '...' : 'Send'}
                </button>
            </div>
        </div>
    );
};
export default ChatbotPanel;