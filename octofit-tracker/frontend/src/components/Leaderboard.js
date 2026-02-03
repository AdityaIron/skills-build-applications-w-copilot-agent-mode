import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboards, setLeaderboards] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboards/`;

  useEffect(() => {
    console.log('Fetching leaderboards from:', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        console.log('Fetched leaderboards:', results);
        setLeaderboards(results);
      })
      .catch(err => console.error('Error fetching leaderboards:', err));
  }, [apiUrl]);

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h2 className="h4">Leaderboard</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboards.map(lb => (
              <tr key={lb._id || lb.id}>
                <td>{lb.team?.name || 'Unknown Team'}</td>
                <td>{lb.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
