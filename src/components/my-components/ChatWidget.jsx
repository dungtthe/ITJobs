import { useState, useEffect, useRef } from "react";
import { getConversations } from "@/shared-services/conversations/getConversations";
import { getMessagesByConversationId } from "@/shared-services/conversations/getMessagesByConversationId";
import { formatDate, getTimeAgo } from "@/utils/formatUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FaUser,
  FaPaperPlane,
  FaSearch,
  FaComments,
  FaTimes,
  FaMinus,
} from "react-icons/fa";

const reactionConfig = {
  1: { emoji: "👍", label: "Like" },
  2: { emoji: "❤️", label: "Love" },
  3: { emoji: "😂", label: "Haha" },
  4: { emoji: "😮", label: "Wow" },
  5: { emoji: "😢", label: "Sad" },
  6: { emoji: "😠", label: "Angry" },
};

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      loadConversations();
    }
  }, [isOpen, isMinimized]);

  // Load messages khi chọn conversation
  useEffect(() => {
    if (selectedConversation && isOpen && !isMinimized) {
      setMessages([]);
      setIsLoadingMessages(true);
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation?.id, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    const total = conversations.reduce(
      (sum, conv) => sum + conv.unreadMessagesCount,
      0
    );
    setUnreadCount(total);
  }, [conversations]);

  const loadConversations = () => {
    setIsLoadingConversations(true);
    getConversations(
      (data) => {
        setConversations(data || []);
        setIsLoadingConversations(false);
      },
      (error) => {
        console.error("Load conversations error:", error);
        setIsLoadingConversations(false);
      },
      (exception) => {
        console.error("Load conversations exception:", exception);
        setIsLoadingConversations(false);
      }
    );
  };

  const loadMessages = (conversationId) => {
    setIsLoadingMessages(true);
    getMessagesByConversationId(
      conversationId,
      (data) => {
        // Reverse array để tin nhắn cũ lên trên, mới xuống dưới
        setMessages((data || []).reverse());
        setIsLoadingMessages(false);
      },
      (error) => {
        console.error("Load messages error:", error);
        setIsLoadingMessages(false);
      },
      (exception) => {
        console.error("Load messages exception:", exception);
        setIsLoadingMessages(false);
      }
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    console.log("Sending message:", {
      conversationId: selectedConversation.id,
      content: newMessage,
    });

    setNewMessage("");
  };

  const handleReactToMessage = (messageId, reactionType) => {
    console.log("React to message:", { messageId, reactionType });
  };

  const handleToggleChat = () => {
    if (isOpen && !isMinimized) {
      setIsOpen(false);
      setSelectedConversation(null);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setSelectedConversation(null);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.otherUserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleToggleChat}
          className="relative bg-primary text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <FaComments className="text-2xl" />
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold">
              {unreadCount > 99 ? "99+" : unreadCount}
            </div>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-28 right-8 z-40 bg-card border rounded-lg shadow-2xl overflow-hidden transition-all duration-300">
          {isMinimized ? (
            // Minimized state
            <div
              className="w-96 p-5 cursor-pointer"
              onClick={() => setIsMinimized(false)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Tin nhắn</h3>
                <div className="flex items-center gap-3">
                  {unreadCount > 0 && (
                    <span className="bg-destructive text-destructive-foreground text-sm rounded-full px-3 py-1">
                      {unreadCount}
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsOpen(false);
                    }}
                    className="text-muted-foreground hover:text-foreground text-lg"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-120 h-[600px] flex flex-col">
              {!selectedConversation ? (
                // Conversations list
                <>
                  <div className="p-5 border-b border-border bg-background">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">Tin nhắn</h3>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleMinimize}
                          className="text-muted-foreground hover:text-foreground text-lg"
                        >
                          <FaMinus />
                        </button>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="text-muted-foreground hover:text-foreground text-lg"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                    <div className="relative">
                      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm cuộc trò chuyện..."
                        className="w-full pl-12 pr-4 py-3 border rounded-lg bg-background focus:outline-primary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Conversations */}
                  <div className="flex-1 overflow-y-auto">
                    {isLoadingConversations ? (
                      Array(4)
                        .fill(0)
                        .map((_, index) => (
                          <div
                            key={index}
                            className="p-4 border-b border-border/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-full bg-muted animate-pulse"></div>
                              <div className="flex-1">
                                <div className="bg-muted rounded h-4 w-2/3 mb-2 animate-pulse"></div>
                                <div className="bg-muted rounded h-3 w-1/2 animate-pulse"></div>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : filteredConversations.length > 0 ? (
                      filteredConversations.map((conversation) => (
                        <ChatConversationItem
                          key={conversation.id}
                          conversation={conversation}
                          onClick={() => setSelectedConversation(conversation)}
                        />
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">
                          {searchTerm
                            ? "Không tìm thấy cuộc trò chuyện"
                            : "Chưa có tin nhắn"}
                        </p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                // Chat messages
                <>
                  <div className="p-4 border-b border-border bg-background">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleBackToList}
                        className="text-muted-foreground hover:text-foreground text-lg"
                      >
                        ←
                      </button>
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage
                          src={selectedConversation.otherUserAvatar}
                          alt={selectedConversation.otherUserName}
                        />
                        <AvatarFallback className="bg-muted">
                          <FaUser className="h-4 w-4 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold truncate">
                          {selectedConversation.otherUserName}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Đang hoạt động
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleMinimize}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <FaMinus />
                        </button>
                        <button
                          onClick={() => setIsOpen(false)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {isLoadingMessages ? (
                      Array(5)
                        .fill(0)
                        .map((_, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
                            <div className="flex-1">
                              <div className="bg-muted rounded-lg px-4 py-3 animate-pulse">
                                <div className="bg-muted-foreground/20 rounded h-4 w-full mb-1"></div>
                                <div className="bg-muted-foreground/20 rounded h-4 w-2/3"></div>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : messages.length > 0 ? (
                      messages.map((message) => (
                        <ChatMessageItem
                          key={message.id}
                          message={message}
                          onReact={(reactionType) =>
                            handleReactToMessage(message.id, reactionType)
                          }
                        />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!
                        </p>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Send msg */}
                  <div className="p-4 border-t border-border bg-background">
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 px-4 py-3 border rounded-lg bg-background focus:outline-primary"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="bg-primary text-primary-foreground rounded-lg px-4 py-3 hover:opacity-90 transition disabled:opacity-50"
                      >
                        <FaPaperPlane />
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

const ChatConversationItem = ({ conversation, onClick }) => {
  return (
    <div
      className="p-4 border-b border-border/50 cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-12 w-12 border">
            <AvatarImage
              src={conversation.otherUserAvatar}
              alt={conversation.otherUserName}
            />
            <AvatarFallback className="bg-muted">
              <FaUser className="h-5 w-5 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          {conversation.unreadMessagesCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {conversation.unreadMessagesCount > 9
                ? "9+"
                : conversation.unreadMessagesCount}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold truncate">
              {conversation.otherUserName}
            </h4>
            {conversation.lastMessageTime && (
              <span className="text-xs text-muted-foreground">
                {getTimeAgo(conversation.lastMessageTime)}
              </span>
            )}
          </div>
          <p
            className={`
              text-sm truncate
              ${
                conversation.unreadMessagesCount > 0
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              }
            `}
          >
            {conversation.lastMessage || "Chưa có tin nhắn"}
          </p>
        </div>
      </div>
    </div>
  );
};

const ChatMessageItem = ({ message, onReact }) => {
  const isMyMessage = !message.isOtherSender;

  return (
    <div
      className={`flex items-start gap-3 ${
        isMyMessage ? "flex-row-reverse" : ""
      }`}
    >
      {!isMyMessage && (
        <Avatar className="h-8 w-8 border">
          <AvatarImage src={message.senderImage} alt={message.senderFullName} />
          <AvatarFallback className="bg-muted">
            <FaUser className="h-3 w-3 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex-1 max-w-[75%] ${isMyMessage ? "text-right" : ""}`}>
        {message.parentMessageContent && (
          <div
            className={`
              text-xs text-muted-foreground mb-2 p-2 rounded border-l-2 border-primary/50 bg-muted/50
              ${isMyMessage ? "text-right border-r-2 border-l-0" : ""}
            `}
          >
            {message.parentMessageContent}
          </div>
        )}

        <div
          className={`
            rounded-lg px-4 py-3 shadow-sm border relative
            ${
              isMyMessage
                ? "bg-primary text-primary-foreground border-primary/20 ml-auto"
                : "bg-card text-card-foreground border-border/60"
            }
          `}
        >
          {!isMyMessage && (
            <div className="text-xs font-medium text-primary mb-1">
              {message.senderFullName}
            </div>
          )}
          <div className="text-sm">{message.content}</div>
          <div
            className={`
              text-xs mt-2 opacity-70
              ${isMyMessage ? "text-right" : ""}
            `}
          >
            {formatDate(message.createdAt)}
          </div>

          {message.reactionType && (
            <div
              className={`
                absolute -bottom-2 flex items-center justify-center
                bg-background border rounded-full w-6 h-6 text-sm
                ${isMyMessage ? "-left-2" : "-right-2"}
              `}
              title={reactionConfig[message.reactionType]?.label}
            >
              {reactionConfig[message.reactionType]?.emoji}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
