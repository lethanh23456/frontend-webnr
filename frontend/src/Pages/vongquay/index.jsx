import React, { useState } from 'react';
import './vongquay.scss';

function VongQuay() {
  // Mock data để demo
  const [leaderboardData] = useState([
    { id: 1, username: 'DragonKing', points: 158900, avatar: '👑' },
    { id: 2, username: 'PhoenixRise', points: 142500, avatar: '🔥' },
    { id: 3, username: 'TigerStorm', points: 128300, avatar: '⚡' },
    { id: 4, username: 'ShadowBlade', points: 115600, avatar: '🗡️' },
    { id: 5, username: 'MoonLight', points: 98400, avatar: '🌙' },
    { id: 6, username: 'StarHunter', points: 87200, avatar: '⭐' },
    { id: 7, username: 'IceQueen', points: 76500, avatar: '❄️' },
    { id: 8, username: 'FireStorm', points: 68900, avatar: '🌪️' },
    { id: 9, username: 'ThunderGod', points: 61200, avatar: '⚔️' },
    { id: 10, username: 'NightWolf', points: 55800, avatar: '🐺' },
  ]);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const getRankClass = (rank) => {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return '';
  };

  const getRankMedal = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <div className="vongquay">
      <div className="leaderboard-container">
        {/* Header */}
        <div className="leaderboard-header">
          <div className="header-glow"></div>
          <h1 className="title">
            <span className="title-icon">👑</span>
            BẢNG XẾP HẠNG
            <span className="title-icon">👑</span>
          </h1>
          <p className="subtitle">Top Cao Thủ Tuần Này</p>
        </div>

        {/* Top 3 Podium */}
        <div className="podium-section">
          <div className="podium-container">
            {/* Rank 2 */}
            <div className="podium-item rank-2-podium">
              <div className="podium-avatar">
                <div className="avatar-ring ring-silver"></div>
                <span className="avatar-emoji">{leaderboardData[1]?.avatar}</span>
                <div className="rank-badge badge-silver">2</div>
              </div>
              <div className="podium-info">
                <h3 className="podium-name">{leaderboardData[1]?.username}</h3>
                <p className="podium-points">{formatNumber(leaderboardData[1]?.points)}</p>
              </div>
              <div className="podium-base base-silver">
                <div className="base-shine"></div>
              </div>
            </div>

            {/* Rank 1 */}
            <div className="podium-item rank-1-podium">
              <div className="crown-animation">
                <span className="crown">👑</span>
              </div>
              <div className="podium-avatar">
                <div className="avatar-ring ring-gold"></div>
                <span className="avatar-emoji">{leaderboardData[0]?.avatar}</span>
                <div className="rank-badge badge-gold">1</div>
                <div className="winner-glow"></div>
              </div>
              <div className="podium-info">
                <h3 className="podium-name">{leaderboardData[0]?.username}</h3>
                <p className="podium-points">{formatNumber(leaderboardData[0]?.points)}</p>
              </div>
              <div className="podium-base base-gold">
                <div className="base-shine"></div>
              </div>
            </div>

            {/* Rank 3 */}
            <div className="podium-item rank-3-podium">
              <div className="podium-avatar">
                <div className="avatar-ring ring-bronze"></div>
                <span className="avatar-emoji">{leaderboardData[2]?.avatar}</span>
                <div className="rank-badge badge-bronze">3</div>
              </div>
              <div className="podium-info">
                <h3 className="podium-name">{leaderboardData[2]?.username}</h3>
                <p className="podium-points">{formatNumber(leaderboardData[2]?.points)}</p>
              </div>
              <div className="podium-base base-bronze">
                <div className="base-shine"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of Rankings */}
        <div className="rankings-list">
          {leaderboardData.slice(3).map((player, index) => (
            <div key={player.id} className={`ranking-item ${getRankClass(index + 4)}`}>
              <div className="rank-number">{getRankMedal(index + 4)}</div>
              <div className="player-avatar">
                <span className="avatar-emoji-small">{player.avatar}</span>
              </div>
              <div className="player-info">
                <h4 className="player-name">{player.username}</h4>
                <p className="player-points">{formatNumber(player.points)} điểm</p>
              </div>
              <div className="player-rank-badge">#{index + 4}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VongQuay;