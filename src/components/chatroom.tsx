
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

interface ChatRoom {
  _id: string;
  doctorId?: string;
  userId?: string;
  latestMessage?: string;
  timestamp?: string;
}

interface User {
  _id: string;
  username: string;
  imageURL: string;
  name: string;
  role: string;
}

interface Doctor {
  id: string;
  name: string;
  imageURL: string;
}

const ChatRoomComponent = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const userId = Cookies.get("userId");
  const userRole = Cookies.get("role");
  const router = useRouter();

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/chatrooms/user/${userId}`
        );
        setChatRooms(response.data);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    };

    fetchChatRooms();
  }, [userId]);

  useEffect(() => {
    socket.on("chatRoomCreated", (chatRoom) => {
      console.log("New chat room created:", chatRoom);
      setChatRooms((prev) => [...prev, chatRoom]);
    });

    return () => {
      socket.off("chatRoomCreated");
    };
  }, []);

  const fetchLatestMessages = async (roomId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/chatrooms/${roomId}/messages`
      );
      const messages = response.data;
      if (messages.length > 0) {
        return {
          latestMessage: messages[messages.length - 1].content,
          timestamp: messages[messages.length - 1].timestamp,
        };
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
    return { latestMessage: null, timestamp: null };
  };

  const updateChatRoomsWithLatestMessages = async () => {
    const updatedRooms = await Promise.all(
      chatRooms.map(async (room) => {
        const latestMessages = await fetchLatestMessages(room._id);
        return { ...room, ...latestMessages };
      })
    );
    setChatRooms(updatedRooms);
  };
  useEffect(() => {
    if (chatRooms.length > 0) {
      updateChatRoomsWithLatestMessages();
    }
  }, [chatRooms.length]);

  const handleCreateChatRoom = async (user: User) => {
    try {
      const chatRoomData =
        userRole === "doctor"
          ? { doctorId: userId, userId: user._id }
          : { doctorId: user._id, userId: userId };

      const createChatRoomResponse = await axios.post(
        `http://localhost:3000/chatrooms`,
        chatRoomData
      );
      router.push(`/chat?roomId=${createChatRoomResponse.data._id}`);
    } catch (error) {
      console.error("Error creating or fetching chat room:", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users`);
      const allUsers = response.data;
      const filteredUsers = allUsers.filter((user: User) => {
        return userRole === "doctor"
          ? user.role === "guest"
          : user.role === "doctor";
      });

      setSearchResults(filteredUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  const handleRoomClick = (roomId: string) => {
    setActiveRoomId(roomId);
    router.push(`/chat?roomId=${roomId}`);
  };

  const handleDeleteChatRoom = async (roomId: string) => {
    try {
      await axios.delete(`http://localhost:3000/chatrooms/${roomId}`);
      setChatRooms((prev) => prev.filter((room) => room._id !== roomId));
    } catch (error) {
      console.error("Error deleting chat room:", error);
    }
  };
  const handleSearchClick = () => {
    setIsSearching(!isSearching);
    if (!isSearching) {
      fetchUsers();
    }
  };

  const filteredResults = searchResults.filter(
    (user) =>
      (user.username &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleString("vi-VN", options).replace(",", "");
  };
  const MessagePreview = ({ message }: { message: string }) => {
    const limitWords = (text: string, limit: number) => {
      const words = text.split(" ");
      if (words.length > limit) {
        return words.slice(0, limit).join(" ") + "...";
      }
      return text;
    };

    return <div>{limitWords(message, 3)}</div>;
  };

  return (
    <div className="flex flex-col items-center max-w-md w-full h-[750px] m-auto p-4 pt-[60px] border border-gray-300 rounded-lg bg-white font-roboto relative overflow-hidden shadow-lg">
      <div
        className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-lg shadow transition hover:bg-blue-600 flex items-center"
        onClick={handleSearchClick}
      >
        <FaPlus size={18} className="mr-1" />
        <span className="font-semibold text-sm">Thêm</span>
      </div>

      {isSearching && (
        <div className="mt-2 w-full">
          <input
            type="text"
            placeholder="Tìm người dùng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-full mb-2"
          />
          <div className="max-h-72 overflow-y-auto border border-gray-300 rounded-md bg-white absolute z-10">
            {filteredResults.length > 0 ? (
              filteredResults.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center p-2 cursor-pointer border-b border-gray-300 hover:bg-gray-100"
                  onClick={() => handleCreateChatRoom(user)}
                >
                  <img
                    src={user.imageURL || "/content/panel/noAvatar.png"}
                    alt={`${user.username}'s avatar`}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <div>
                    <span className="font-semibold">{user.username}</span>
                    <p className="text-sm text-gray-600">{user.name}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 text-center">Không tìm thấy người dùng</div>
            )}
          </div>
        </div>
      )}

      {chatRooms.length > 0 ? (
        chatRooms.map((room) => (
          <div
            key={room._id}
            className={`flex items-center justify-between w-full p-3 mb-2 border border-gray-200 rounded-lg cursor-pointer transition ${
              activeRoomId === room._id
                ? "bg-blue-100 border-l-4 border-blue-600"
                : "bg-white"
            } hover:bg-gray-50`}
            onClick={() => handleRoomClick(room._id)}
          >
            {userRole === "guest" ? (
              <DoctorInfo doctorId={room.doctorId} roomId={room._id} />
            ) : (
              <UserInfo userId={room.userId} roomId={room._id} />
            )}
            <div className="flex flex-col ml-auto text-gray-500 text-sm">
              {room.latestMessage ? (
                <>
                  <MessagePreview message={room.latestMessage} />
                  <span className="text-xs text-gray-400">
                    {room.timestamp ? formatTimestamp(room.timestamp) : "N/A"}
                  </span>
                </>
              ) : (
                <div className="text-gray-400">Không có tin nhắn</div>
              )}
            </div>
            <button
              className="text-gray-400 hover:text-red-500 ml-2"
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện click lan truyền
                handleDeleteChatRoom(room._id);
              }}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 mt-4">
          Chưa có phòng chat nào!
        </div>
      )}
    </div>
  );
};

const DoctorInfo = ({
  doctorId,
  roomId,
}: {
  doctorId?: string;
  roomId: string;
}) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctor = async () => {
      if (doctorId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/doctors/${doctorId}`
          );
          setDoctor(response.data);
        } catch (error) {
          console.error("Error fetching doctor:", error);
        }
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleDoctorClick = () => {
    router.push(`/chat?roomId=${roomId}`);
  };

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={handleDoctorClick}
    >
      <img
        src={doctor?.imageURL || "/content/panel/noAvatar.png"}
        alt={`${doctor?.name}'s avatar`}
        className="w-10 h-10 rounded-full mr-2"
      />
      <span className="font-medium">{doctor ? doctor.name : "Loading..."}</span>
    </div>
  );
};

const UserInfo = ({ userId, roomId }: { userId?: string; roomId: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:3000/users/userid/${userId}`
          );
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUser();
  }, [userId]);

  const handleUserClick = () => {
    router.push(`/chat?roomId=${roomId}`);
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleUserClick}>
      <img
        src={user?.imageURL || "/content/panel/noAvatar.png"}
        alt={`${user?.username}'s avatar`}
        className="w-10 h-10 rounded-full mr-2"
      />
      <span className="font-medium">{user ? user.username : "Loading..."}</span>
    </div>
  );
};

export default ChatRoomComponent;
