import { useEffect, useState } from "react";
import api from "@/utils/api";
import Cookies from "js-cookie";
import Layout from "@/components/layout";
import DashboardData from "@/components/dashboard_data";
import { FaPen } from "react-icons/fa"; // Import a pencil icon

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;
  specialization?: string;
  experience?: number;
  qualifications?: string;
  clinicAddress?: string;
  dailySlots?: DailySlot[];
  imageURL?: string;
}

interface DailySlot {
  date: string;
  slots: { time: string }[];
}

const Profile: React.FC = () => {
  const userId = Cookies.get("userId");
  const [isHovered, setIsHovered] = useState(false);
  const username = Cookies.get("username");
  const role = Cookies.get("role");
  const [user, setUser] = useState<User | null>(null);
  const [originalUserData, setOriginalUserData] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Omit<User, "_id" | "role">>({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    specialization: "",
    experience: undefined,
    qualifications: "",
    clinicAddress: "",
    dailySlots: [],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;

      const endpoint =
        role === "guest" ? `/users/${username}` : `/doctors/${userId}`;
      try {
        const response = await api.get(endpoint);
        setUser(response.data);
        setOriginalUserData(response.data); // Set original data
        setFormData({
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          specialization: response.data.specialization || "",
          experience: response.data.experience,
          qualifications: response.data.qualifications || "",
          clinicAddress: response.data.clinicAddress || "",
          dailySlots: response.data.dailySlots || [],
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [userId, role, username]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpdate = async () => {
    if (user) {
      const updateEndpoint =
        role === "guest"
          ? `/users/update/${user._id}`
          : `/doctors/update/${user._id}`;
      setLoading(true);
      setSaving(true);
      setErrorMessage("");

      const formDataToUpdate = new FormData();
      if (selectedFile) {
        formDataToUpdate.append("image", selectedFile);
      }
      formDataToUpdate.append("name", formData.name);
      formDataToUpdate.append("username", formData.username);
      formDataToUpdate.append("email", formData.email);
      formDataToUpdate.append("phoneNumber", formData.phoneNumber);
      formDataToUpdate.append("specialization", formData.specialization || "");
      formDataToUpdate.append(
        "experience",
        formData.experience?.toString() || ""
      );
      formDataToUpdate.append("qualifications", formData.qualifications || "");
      formDataToUpdate.append("clinicAddress", formData.clinicAddress || "");

      try {
        const response = await api.put(updateEndpoint, formDataToUpdate, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setUser(response.data);
        setEditing(false);
        setSelectedFile(null); // Reset selected file after saving
      } catch (error) {
        setErrorMessage("Failed to update user. Please try again.");
        console.error("Failed to update user:", error);
      } finally {
        setLoading(false);
        setSaving(false);
      }
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setSelectedFile(null); // Reset selected file on cancel
    setFormData({
      name: originalUserData?.name || "",
      username: originalUserData?.username || "",
      email: originalUserData?.email || "",
      phoneNumber: originalUserData?.phoneNumber || "",
      specialization: originalUserData?.specialization || "",
      experience: originalUserData?.experience,
      qualifications: originalUserData?.qualifications || "",
      clinicAddress: originalUserData?.clinicAddress || "",
      dailySlots: originalUserData?.dailySlots || [],
    });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <Layout>
      <DashboardData />
      <div className="main-container">
        <div className="top-panel">
          <div className="profile-container">
            <div className="profile-header">
              <div className="profile-picture-container">
                <img
                  src={
                    selectedFile
                      ? URL.createObjectURL(selectedFile)
                      : user.imageURL || "/content/logo/doctor.png"
                  }
                  alt="Profile Picture"
                  className="profile-picture"
                />
                {editing && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      id="file-input"
                    />
                    <label
                      htmlFor="file-input"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <FaPen
                        className="edit-icon"
                        style={{
                          color: isHovered ? "#1A2A4B" : "#FFFFFF",
                          padding: "5px",
                          marginLeft: "-30px",
                        }}
                      />
                    </label>
                  </>
                )}
              </div>

              <h1 className="user-profile-title">User Profile</h1>
            </div>
            <div className="profile-details">
              {errorMessage && (
                <div className="error-message">{errorMessage}</div>
              )}
              <div>
                <label>Name:</label>
                {editing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{user.name}</span>
                )}
              </div>
              <div>
                <label>Username:</label>
                {editing ? (
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{user.username}</span>
                )}
              </div>
              <div>
                <label>Email:</label>
                {editing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{user.email}</span>
                )}
              </div>
              <div>
                <label>Phone Number:</label>
                {editing ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{user.phoneNumber}</span>
                )}
              </div>
              {role === "doctor" && (
                <>
                  <div>
                    <label>Specialization:</label>
                    {editing ? (
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                      />
                    ) : (
                      <span>{user.specialization}</span>
                    )}
                  </div>
                  <div>
                    <label>Experience:</label>
                    {editing ? (
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience || ""}
                        onChange={handleChange}
                      />
                    ) : (
                      <span>{user.experience}</span>
                    )}
                  </div>
                  <div>
                    <label>Qualifications:</label>
                    {editing ? (
                      <input
                        type="text"
                        name="qualifications"
                        value={formData.qualifications}
                        onChange={handleChange}
                      />
                    ) : (
                      <span>{user.qualifications}</span>
                    )}
                  </div>
                  <div>
                    <label>Clinic Address:</label>
                    {editing ? (
                      <input
                        type="text"
                        name="clinicAddress"
                        value={formData.clinicAddress}
                        onChange={handleChange}
                      />
                    ) : (
                      <span>{user.clinicAddress}</span>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="buttons-container">
              {!editing ? (
                <button onClick={handleEdit}>Edit</button>
              ) : (
                <>
                  <button onClick={handleUpdate} disabled={loading}>
                    {loading ? "Loading..." : saving ? "Saving..." : "Save"}
                  </button>
                  <button onClick={handleCancel} disabled={loading}>
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .main-container {
          display: flex;
          align-items: stretch;
          width: 1290px;
          margin-left: 200px;
          margin-top:40px;
        }
        .top-panel {
          flex: 1;
          background-image:url('/content/panel/7bb2a3886ee2eed843abf1b2fe05ca19.gif'); 
          background-size: cover;
          background-position: center;
          height: 600px;
        }
        .profile-container {
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 50px;
          flex: 1;
          margin-top: 25px;
          padding: 10px;
        }
        .profile-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          font-size:18px;
          color:#fff;
        }
        .profile-picture {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin-right: 10px;
          border: 2px solid color: #8dbbfa;
          background-color: #fff;
        }
           .user-profile-title {
            font-family: Georgia, "Times New Roman", Times, serif;
            font-size: 32px; 
          }
        .profile-details {
          width: 100%;
          color:##0a2351;
          max-width: 600px;
          background-color:#ffff;
          padding: 25px;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 1);
        }
        .profile-details > div {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        label {
          font-weight: bold;
          margin-right: 10px;
          width: 150px;
        }
        input {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          flex: 1; 
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: 16px;
        }
        button {
          margin-top: 20px;
          margin-right:60px;
          margin-left:60px;
          padding: 10px 25px;
          background: linear-gradient(90deg, #4b6cb7 0%, #182848 100%);
          color: #FFFFFF;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-family: Georgia, "Times New Roman", Times, serif;
          font-size: 16px;
        }
        button:hover {
          background: linear-gradient(180deg, #4b6cb7 0%, #182848 100%);
        }
        .error-message {
          color: red;
          margin-bottom: 10px;
        }
      `}</style>
    </Layout>
  );
};

export default Profile;
