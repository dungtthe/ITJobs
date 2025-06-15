import { useState, useEffect, useRef } from "react";
import { getConversations } from "@/shared-services/conversations/getConversations";
import { getMessagesByConversationId } from "@/shared-services/conversations/getMessagesByConversationId";
import { formatDate, getTimeAgo } from "@/utils/formatUtils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser, FaPaperPlane, FaSearch } from "react-icons/fa";

// Reaction config
const reactionConfig = {
  1: { emoji: "👍", label: "Like" },
  2: { emoji: "❤️", label: "Love" },
  3: { emoji: "😂", label: "Haha" },
  4: { emoji: "😮", label: "Wow" },
  5: { emoji: "😢", label: "Sad" },
  6: { emoji: "😠", label: "Angry" },
};

export default function Index() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingConversations, setIsLoadingConversations] = useState(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadConversations();
  }, []);

  // Load messages khi chọn conversation
  useEffect(() => {
    if (selectedConversation) {
      setMessages([]);
      setIsLoadingMessages(true);
      loadMessages(selectedConversation.id);
    }
  }, [selectedConversation?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
        setMessages([]);
        setIsLoadingMessages(false);
      },
      (exception) => {
        console.error("Load messages exception:", exception);
        setMessages([]);
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

  const filteredConversations = conversations.filter((conv) =>
    conv.otherUserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-4 bg-background rounded-xl border pb-4">
      <div className="border-b pl-4 pb-4 flex gap-2">
        <h1 className="text-2xl">Quản lý tin nhắn</h1>
      </div>

      <div className="flex h-[calc(100vh-200px)] mt-4 mx-4 border rounded-lg overflow-hidden">
        <div className="w-1/3 border-r border-border bg-background flex flex-col">
          <div className="p-6 border-b border-border">
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

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {isLoadingConversations ? (
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="p-4 border-b border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-muted animate-pulse"></div>
                      <div className="flex-1">
                        <div className="bg-muted rounded h-5 w-2/3 mb-2 animate-pulse"></div>
                        <div className="bg-muted rounded h-4 w-1/2 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))
            ) : filteredConversations.length > 0 ? (
              filteredConversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  isSelected={selectedConversation?.id === conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                />
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="mb-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <FaUser className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {searchTerm
                    ? "Không tìm thấy cuộc trò chuyện"
                    : "Chưa có cuộc trò chuyện nào"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Main - Chat Messages */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-border bg-background">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-border">
                    <AvatarImage
                      src={selectedConversation.otherUserAvatar}
                      alt={selectedConversation.otherUserName}
                    />
                    <AvatarFallback className="bg-muted">
                      <FaUser className="h-5 w-5 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {selectedConversation.otherUserName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Đang hoạt động
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/20">
                {isLoadingMessages ? (
                  Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-muted animate-pulse"></div>
                        <div className="flex-1">
                          <div className="bg-muted rounded-lg px-4 py-3 animate-pulse max-w-md">
                            <div className="bg-muted-foreground/20 rounded h-4 w-full mb-2"></div>
                            <div className="bg-muted-foreground/20 rounded h-4 w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : messages.length > 0 ? (
                  messages.map((message) => (
                    <MessageItem
                      key={message.id}
                      message={message}
                      onReact={(reactionType) =>
                        handleReactToMessage(message.id, reactionType)
                      }
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="mb-4">
                      <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-2xl">💬</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      Chưa có tin nhắn nào
                    </h3>
                    <p className="text-muted-foreground">
                      Hãy bắt đầu cuộc trò chuyện với{" "}
                      {selectedConversation.otherUserName}
                    </p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-6 border-t border-border bg-background">
                <form onSubmit={handleSendMessage} className="flex gap-4">
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
                    className="bg-primary text-primary-foreground rounded-lg px-6 py-3 hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
                  >
                    <FaPaperPlane />
                    Gửi
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">💬</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Chọn một cuộc trò chuyện
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Chọn một cuộc trò chuyện từ danh sách bên trái để bắt đầu xem
                  và quản lý tin nhắn
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ConversationItem = ({ conversation, isSelected, onClick }) => {
  return (
    <div
      className={`
        p-4 border-b border-border/50 cursor-pointer transition-colors
        hover:bg-accent/50
        ${isSelected ? "bg-accent border-l-4 border-l-primary" : ""}
      `}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-14 w-14 border-2 border-border">
            <AvatarImage
              src={conversation.otherUserAvatar}
              alt={conversation.otherUserName}
            />
            <AvatarFallback className="bg-muted">
              <FaUser className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          {conversation.unreadMessagesCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
              {conversation.unreadMessagesCount > 9
                ? "9+"
                : conversation.unreadMessagesCount}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-base truncate">
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

const MessageItem = ({ message, onReact }) => {
  const isMyMessage = !message.isOtherSender;

  return (
    <div
      className={`flex items-start gap-4 ${
        isMyMessage ? "flex-row-reverse" : ""
      }`}
    >
      {!isMyMessage && (
        <Avatar className="h-10 w-10 border-2 border-border">
          <AvatarImage src={message.senderImage} alt={message.senderFullName} />
          <AvatarFallback className="bg-muted">
            <FaUser className="h-4 w-4 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      )}

      <div className={`flex-1 max-w-md ${isMyMessage ? "text-right" : ""}`}>
        {message.parentMessageContent && (
          <div
            className={`
              text-xs text-muted-foreground mb-2 p-3 rounded border-l-2 border-primary/50 bg-muted/50
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
          <div className="text-sm leading-relaxed">{message.content}</div>
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
                bg-background border rounded-full w-7 h-7 text-sm shadow-sm
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
