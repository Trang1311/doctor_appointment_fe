import React from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa'; // Star icon from react-icons

const Advertisement: React.FC = () => {
  return (
    <div className="ad-container">
      <div className="left-box">
        <div className="left-text">
          <h3>
            <FaStar color="#8DBBFA" size={24} />
              __Rated #1 choice for healthcare appointments by users
          </h3>
          <p className="sologan">
          Empowering Your <span className="mind">Mind</span>, <br/>Enhancing Your <span className="life">Life</span>
        </p>  
        </div>
      </div>
      <div className="image-container">
        <Image
          src="/content/logo/DisplayFileFormFileName.png" // Replace with your image path
          alt="Healthcare"
          layout="responsive"
          width={500}
          height={300}
          className="ad-image"
        />
        <div className="top-right-text"><span className="hour">10k+</span> hours of patient meetings</div>
      </div>
      
      <style jsx>{`
        .ad-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 50px 50px;
          padding: 20px;
          background-color: #F0F8FF; 
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          flex-wrap: nowrap;
          margin-top: 40px;
        }

        .left-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 50px;
          max-width: 500px; /* Increase width */
        }

        .left-text h3 {
          font-size: 20px;
          color: #8DBBFA;
          background-color: #D1E9FB;
          padding: 5px;
          border-radius: 18px;
          white-space: nowrap;
          
        }

        .left-text p {
          font-size: 50px; 
          margin: 20px -20px 0;
          font-family: 'Inter';
          white-space: nowrap;
        }

        .image-container {
          position: relative;
          max-width: 500px;
          flex: 1;
        }

        .ad-image {
          border-radius: 10px;
        }

        .top-right-text {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(0, 0, 0, 0.7);
          color: #fff;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 18px;
        }
        .mind {
          font-weight: bold;
          font-family: 'Inika', serif;
          color: #2F80ED;
        }
        .life {
          font-weight: bold;
          font-family: 'Inika', serif;
          color: #196C17;
        }
        .hour{
          font-weight:bold;
          color:#D1E9FB;
          font-size: 48px;
        
        }
      `}</style>
    </div>
  );
};

export default Advertisement;
