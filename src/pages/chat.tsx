import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import Layout from "@/components/layout_nofooter";
import ChatRoom from "@/components/chatroom";
import io from "socket.io-client";
import VideoCallModal from "@/components/VideoCallModal";
import IncomingCallModal from "@/components/incomingCall";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

interface Message {
  id: string;
  content: string;
  senderId: string;
  chatRoomId: string;
  timestamp: string;
}

interface User {
  id: string;
  username: string;
}

interface CallData {
  from: string;
  roomId: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  const [participants, setParticipants] = useState<{ [key: string]: string }>(
    {}
  );
  const [isCalling, setIsCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [callerId, setCallerId] = useState<string | null>(null);
  const userId = Cookies.get("userId") as string | undefined;
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<any>(null);

  const handleVideoCall = () => {
    setIsCalling(true);
    if (chatRoomId && userId) {
      socketRef.current.emit("call", { from: userId, roomId: chatRoomId });
    }
  };
  const userName = Cookies.get("username") as string | undefined;
  const zcRef = useRef<any>(null);
  const startCall = async () => {
    if (!chatRoomId || !userId) return;

    const startTime = new Date().toLocaleTimeString();
    try {
      await axios.post("http://localhost:3000/chatrooms/messages", {
        chatRoomId: chatRoomId,
        content: `Cuộc gọi video đã bắt đầu lúc ${startTime}. Mời bạn tham gia vào phòng chat.`,
        senderId: userId,
      });
    } catch (error) {
      console.error("Error sending call start message:", error);
    }

    const appID = 574318999;
    const serverSecret = "3195ab5de0615645323fced633f963fd";
    const roomID = chatRoomId;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userId,
      userName
    );

    // Ensure code runs on the client side
    if (typeof window !== "undefined") {
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zcRef.current = zc;
      zc.joinRoom({
        container: document.getElementById("video-container"),
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
      });

      setIsCalling(false);
    }
  };

  const acceptCall = () => {
    setIncomingCall(false);
    startCall();
  };

  const declineCall = () => {
    setIncomingCall(false);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const recipientId =
    Object.keys(participants).find((id) => id !== userId) || null;
  useEffect(() => {
    const { roomId } = router.query;
    setChatRoomId(roomId as string);
  }, [router.query]);
  useEffect(() => {
    const fetchMessages = async () => {
      if (chatRoomId) {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:3000/chatrooms/${chatRoomId}/messages`
          );
          setMessages(response.data);
          fetchParticipants(response.data);
        } catch (error) {
          setError(" ");
          console.error("Error fetching messages:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMessages();
  }, [chatRoomId, userId]);

  useEffect(() => {
    fetchParticipants(messages);
  }, [messages]);

  const fetchParticipants = async (messages: Message[]) => {
    const uniqueIds = Array.from(new Set(messages.map((msg) => msg.senderId)));
    const participantsData: { [key: string]: string } = {};

    for (const id of uniqueIds) {
      try {
        let participantName = "";
        if (id === userId) {
          participantName = "Tôi";
        } else {
          const userResponse = await axios.get(
            `http://localhost:3000/users/userid/${id}`
          );
          participantName = userResponse.data.username || "";
          if (!participantName) {
            const doctorResponse = await axios.get(
              `http://localhost:3000/doctors/${id}`
            );
            participantName = doctorResponse.data.name;
          }
        }
        participantsData[id] = participantName;
      } catch (error) {
        console.error(`Error fetching participant with id ${id}:`, error);
      }
    }
    setParticipants(participantsData);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("newMessage", (message: Message) => {
      const messageExists = messages.some((msg) => msg.id === message.id);
      if (!messageExists) {
        fetchParticipants([...messages, message]);
        setMessages((prevMessages) => [...prevMessages, message]);
        scrollToBottom();
      }
    });

    socketRef.current.on("call", (data: CallData) => {
      if (data.roomId === chatRoomId && data.from !== userId) {
        setIncomingCall(true);
        setCallerId(data.from);
      }
    });

    socketRef.current.emit("joinRoom", chatRoomId);
  }, [chatRoomId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:3000/chatrooms/messages`,
        {
          chatRoomId: chatRoomId,
          content: newMessage,
          senderId: userId,
        }
      );

      const newMessageData = response.data;
      fetchParticipants([...messages, newMessageData]);
      // setMessages((prevMessages) => [...prevMessages, newMessageData]);
      socketRef.current.on("newMessage", (newMessageData: Message) => {
        const messageExists = messages.some(
          (msg) => msg.id === newMessageData.id
        );
        if (!messageExists) {
          scrollToBottom();
        }
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Layout>
      <div className="mx-auto mt-6 w-full p-8 bg-slate-50">
        <div className="flex flex-col md:flex-row -ml-32 md:-ml-48 lg:-ml-64">
          <div className="flex flex-col w-full">
            <ChatRoom />
          </div>
          <div className="flex flex-col w-full -ml-32 md:-ml-48 lg:-ml-64">
            <div className="flex flex-col w-full h-[750px] border border-gray-300 rounded-lg bg-white relative">
              <h1 className="text-center text-lg text-blue-600 bg-white border-b border-gray-300 rounded-t-lg p-4 relative">
                {recipientId ? participants[recipientId] : " "}
                <FontAwesomeIcon
                  icon={faVideoCamera}
                  className="text-blue-600 absolute top-4 right-4 cursor-pointer hover:text-black"
                  onClick={handleVideoCall}
                />
              </h1>
              {loading && (
                <p
                  className="text-center font-bold text-red-600 text-2xl"
                  style={{ marginTop: 200 }}
                >
                  Hãy chọn 1 người để bắt đầu cuộc trò chuyện
                </p>
              )}
              {error && <p className="text-center text-red-600">{error}</p>}
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex flex-col mb-2">
                    {message.senderId === userId ? (
                      <>
                        <strong className="text-sm text-right">
                          {participants[message.senderId] || message.senderId}
                        </strong>
                        <div className="bg-blue-400 text-white p-2 rounded-[20px] max-w-[35%] ml-auto break-words">
                          <span>{message.content}</span>
                        </div>
                        <small className="text-gray-500 text-xs text-right">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </small>
                      </>
                    ) : (
                      <>
                        <strong className="text-sm">
                          {participants[message.senderId] || message.senderId}
                        </strong>
                        <div className="bg-blue-600 text-white p-2 rounded-[20px] max-w-[35%] break-words self-start">
                          <span>{message.content}</span>
                        </div>
                        <small className="text-gray-500 text-xs">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </small>
                      </>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form
                onSubmit={handleSendMessage}
                className="flex p-4 border-t border-gray-300"
              >
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  required
                  className="flex-1 p-2 border border-gray-300 rounded-full"
                />
                <button
                  type="submit"
                  className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>
              {isCalling && (
                <VideoCallModal
                  onClose={() => setIsCalling(false)}
                  onStartCall={startCall}
                />
              )}
              {incomingCall && (
                <IncomingCallModal
                  onAccept={acceptCall}
                  onDecline={declineCall}
                  callerId={callerId || "Người gọi không xác định"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
