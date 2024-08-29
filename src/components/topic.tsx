import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../components/withAuth'; // Import authentication context

interface TopicProps {
  _id: string;
  name: string;
  description?: string;
}

const Topic: React.FC<TopicProps> = ({ _id, name, description }) => {
  const [showDescription, setShowDescription] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuth(); // Use authentication context

  const handleClick = () => {
    if (isAuthenticated) {
      router.push(`/list_doctor?topicId=${_id}`); // Navigate to list_doctor with topicId
    } else {
      router.push('/login'); // Redirect to login if not authenticated
    }
  };

  return (
    <div
      className="item"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
      onClick={handleClick}
    >
      <div className="icon"><img src="/content/logo/lotus.png" alt="Icon" /></div>
      <h3>{name}</h3>
      {showDescription && (
        <div className="description">
          <p>{description}</p>
        </div>
      )}

      <style jsx>{`
        .item {
          position: relative;
          flex: 1 0 calc(20% - 50px);
          max-width: calc(20% - 50px);
          box-sizing: border-box;
          background-color: #D1E9FB;
          padding: 20px;
          text-align: center;
          border-radius: 8px;
          transition: background-color 0.3s ease;
          cursor: pointer;
          font-family:'Inika','serif';
          font-size: 18px;
        }
        .item:hover {
          background-color: #8DBBFA;
        }

        .icon {
          width: 40px;
          height: 40px;
          margin: 0 auto 10px;
        }

        .icon img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .description {
          position: absolute;
          bottom: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
          padding: 5px 10px;
          border-radius: 8px;
          font-size: 18px;
          z-index: 10;
          pointer-events: none;
        }

        .description::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 5px;
          border-style: solid;
          border-color: rgba(0, 0, 0, 0.7) transparent transparent transparent;
        }
      `}</style>
    </div>
  );
};

export default Topic;
