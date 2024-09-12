import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/Registration.module.css";

interface Topic {
  _id: string;
  name: string;
}

export default function Registration() {
  const [role, setRole] = useState<string>("user");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    specialization: "",
    experience: "",
    qualifications: "",
    clinicAddress: "",
    lifeMotto: "",
    topics: [],
  });
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:3000/topics");
        setTopics(response.data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "topics") {
      const value = e.target.value;
      setSelectedTopics((prev: string[]) =>
        prev.includes(value)
          ? prev.filter((topic) => topic !== value)
          : [...prev, value]
      );
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...formData,
      experience: Number(formData.experience) || 0,
      topic: selectedTopics,
    };

    try {
      if (role === "user") {
        await axios.post("http://localhost:3000/users/create", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
        });
      } else {
        await axios.post("http://localhost:3000/doctors", data);
      }
      alert("Registration successful!");
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className={styles.registrationContainer}>
      <div className={styles.imageContainer}>
        <div className={styles.imageOverlay}>
          <h2>
            Let’s get you all set up so you can verify your personal account and
            begin setting up your profile.
          </h2>
        </div>
      </div>
      <div className={styles.registrationFormContainer}>
        <div className={styles.registrationFormCard}>
          <h1 className={styles.title}>
            Register as {role === "user" ? "User" : "Doctor"}
          </h1>
          <div className={styles.roleSelection}>
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={role === "doctor"}
                onChange={() => setRole("doctor")}
              />
              Doctor
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            {role === "doctor" && (
              <>
                <div className={styles.formGroup}>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
            <div className={styles.formGroup}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Gender</label>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>

            {role === "doctor" && (
              <>
                <div className={styles.formGroup}>
                  <label>Specialization</label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Experience (years)</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    min="0"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Qualifications</label>
                  <input
                    type="text"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Clinic Address</label>
                  <input
                    type="text"
                    name="clinicAddress"
                    value={formData.clinicAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Life Motto</label>
                  <input
                    type="text"
                    name="lifeMotto"
                    value={formData.lifeMotto}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Topics</label>
                  {topics.map((topic) => (
                    <div key={topic._id}>
                      <label>
                        <input
                          type="checkbox"
                          name="topics"
                          value={topic._id}
                          checked={selectedTopics.includes(topic._id)}
                          onChange={handleChange}
                        />
                        {topic.name}
                      </label>
                    </div>
                  ))}
                </div>
              </>
            )}
            <button type="submit" className={styles.submitButton}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
