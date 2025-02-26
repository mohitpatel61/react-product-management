import React from 'react';
import { userInfo } from '../utils/loggedUserData';
import { Chart, registerables } from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import  PieChart from '../utils/dashboardChart/eventChart';


const Dashboard = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await userInfo();
      setUser(userData);
    };

    fetchUserData();

  
  }, []);

  return (
    <div className="row">
      <h2>
        Welcome to product management <br />
        <b>{user?.first_name} {user?.last_name}</b>
      </h2>

      {/* Chart */}
      <PieChart />
    </div>
  );
};

export default Dashboard;
