import Layout from '../components/layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Topic from '../components/topic';
import Advertisement from '../components/advertisement';


interface TopicData {
  _id: string;
  name: string;
  description?: string;
}

const Index = () => {
  const [topics, setTopics] = useState<TopicData[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get<TopicData[]>('http://localhost:3000/topics');
        setTopics(response.data);
      } catch (error) {
        console.error('Error fetching topics:', error);
      }
    };

    fetchTopics();
  }, []);

  return (
    <Layout>
      <Advertisement />
      <div className="container">
        <h2 className="page-title">
          Choose doctor's <span className="highlight">Expertise</span>
        </h2>  
        <div className="topics-list">
          {topics.map((topic) => (
            <Topic key={topic._id} _id={topic._id} name={topic.name} description={topic.description} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .container {
          text-align: center;
          font-family: 'Aclonica', serif;
          padding: 20px;
        }

        .page-title {
          font-size: 50px;
          margin-bottom: 20px;
          color: #333;
          font-weight: light;
        }

        .highlight {
          font-weight: bold;
          font-family: 'Aclonica', serif;
          color: #0070f3;
        }

        .topics-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          font-family: 'Inika';
        }
      `}</style>
    </Layout>
  );
};

export default Index;
