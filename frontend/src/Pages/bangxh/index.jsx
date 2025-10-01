import React, { useState, useEffect } from 'react';
import './bangxh.scss';
import UserService from '../../services/userService';
import LogoBxh from "../../assets/2.png";
import NhanVat from "../../assets/524.png";

function Bangxh() {
  const [dataSucManh, setDataSucManh] = useState([]);
  const [dataVang, setDataVang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('sucmanh');

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const response1 = await UserService.get10sucmanh();
        const response2 = await UserService.get10vang();
        
        console.log('Sức mạnh:', response1);
        console.log('Vàng:', response2);
        
        const userData1 = response1.data || [];
        const processedDataSucManh = userData1.map((user, index) => {
          const sucManh = user.sucManh || 0;
          const sucManhDeTu = user.sucManhDeTu || 0;
          const vang = user.vang || 0;
          const ngoc = user.ngoc || 0;
          
          return {
            ...user,
            rank: index + 1, 
            formattedSucManh: formatNumber(sucManh),
            formattedSucManhDeTu: formatNumber(sucManhDeTu),
            formattedVang: formatNumber(vang),
            formattedNgoc: formatNumber(ngoc)
          };
        });
        
        const userData2 = response2.data || [];
        const processedDataVang = userData2.map((user, index) => {
          const sucManh = user.sucManh || 0;
          const sucManhDeTu = user.sucManhDeTu || 0;
          const vang = user.vang || 0;
          const ngoc = user.ngoc || 0;
          
          return {
            ...user,
            rank: index + 1, 
            formattedSucManh: formatNumber(sucManh),
            formattedSucManhDeTu: formatNumber(sucManhDeTu),
            formattedVang: formatNumber(vang),
            formattedNgoc: formatNumber(ngoc)
          };
        });
        
        setDataSucManh(processedDataSucManh);
        setDataVang(processedDataVang);
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApi();
  }, []);

  const formatNumber = (num) => {
    if (num === null || num === undefined) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const currentData = activeTab === 'sucmanh' ? dataSucManh : dataVang;

  if (loading) {
    return (
      <div className="bangxh">
        <div className="loading">
          <div className="loading_spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bangxh">
      <div className='rank_filter'>
        <div className='logoBxh'>
          <img src={LogoBxh} alt="Logo BXH" />
        </div>
      </div>
      
      <div className='top_section'>
        <div className='top_tabs'>
          <div 
            className={`tab ${activeTab === 'sucmanh' ? 'active' : ''}`}
            onClick={() => setActiveTab('sucmanh')}
          >
            <span className="tab_icon">⚔️</span>
            <span className="tab_text">TOP SỨC MẠNH</span>
          </div>
          <div 
            className={`tab ${activeTab === 'vang' ? 'active' : ''}`}
            onClick={() => setActiveTab('vang')}
          >
            <span className="tab_icon">💰</span>
            <span className="tab_text">TOP ĐẠI GIA</span>
          </div>
          <div className='tab tab_disabled'>
            <span className="tab_icon">🔒</span>
            <span className="tab_text">SẮP RA MẮT</span>
          </div>
        </div>
        
        <div className='top_podium'>
          {currentData.length >= 2 && (
            <div className='rank_item rank_2'>
              <div className='crown crown_silver'>👑</div>
              <div className='rank_badge rank_badge_silver'>2</div>
              <div className='avatar'>
                <img src={NhanVat} alt={currentData[1]?.username || "player"} />
                <div className='avatar_glow glow_silver'></div>
              </div>
              <div className='username'>{currentData[1]?.username || 'N/A'}</div>
              <div className='stats'>
                <div className='stat_item'>
                  <span className='stat_label'>
                    {activeTab === 'sucmanh' ? 'Sức mạnh' : 'Vàng'}
                  </span>
                  <span className='stat_value'>
                    {activeTab === 'sucmanh' 
                      ? currentData[1]?.formattedSucManh 
                      : currentData[1]?.formattedVang || '0'}
                  </span>
                </div>
                <div className='stat_item'>
                  <span className='stat_label'>
                    {activeTab === 'sucmanh' ? 'Đệ tử' : 'Ngọc'}
                  </span>
                  <span className='stat_value'>
                    {activeTab === 'sucmanh'
                      ? currentData[1]?.formattedSucManhDeTu
                      : currentData[1]?.formattedNgoc || '0'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {currentData.length >= 1 && (
            <div className='rank_item rank_1'>
              <div className='crown crown_gold'>👑</div>
              <div className='rank_badge rank_badge_gold'>1</div>
              <div className='avatar'>
                <img src={NhanVat} alt={currentData[0]?.username || "player"} />
                <div className='avatar_glow glow_gold'></div>
              </div>
              <div className='username'>{currentData[0]?.username || 'N/A'}</div>
              <div className='stats'>
                <div className='stat_item'>
                  <span className='stat_label'>
                    {activeTab === 'sucmanh' ? 'Sức mạnh' : 'Vàng'}
                  </span>
                  <span className='stat_value'>
                    {activeTab === 'sucmanh' 
                      ? currentData[0]?.formattedSucManh 
                      : currentData[0]?.formattedVang || '0'}
                  </span>
                </div>
                <div className='stat_item'>
                  <span className='stat_label'>
                    {activeTab === 'sucmanh' ? 'Đệ tử' : 'Ngọc'}
                  </span>
                  <span className='stat_value'>
                    {activeTab === 'sucmanh'
                      ? currentData[0]?.formattedSucManhDeTu
                      : currentData[0]?.formattedNgoc || '0'}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          {currentData.length >= 3 && (
            <div className='rank_item rank_3'>
              <div className='crown crown_bronze'>👑</div>
              <div className='rank_badge rank_badge_bronze'>3</div>
              <div className='avatar'>
                <img src={NhanVat} alt={currentData[2]?.username || "player"} />
                <div className='avatar_glow glow_bronze'></div>
              </div>
              <div className='username'>{currentData[2]?.username || 'N/A'}</div>
              <div className='stats'>
                <div className='stat_item'>
                  <span className='stat_label'>
                    {activeTab === 'sucmanh' ? 'Sức mạnh' : 'Vàng'}
                  </span>
                  <span className='stat_value'>
                    {activeTab === 'sucmanh' 
                      ? currentData[2]?.formattedSucManh 
                      : currentData[2]?.formattedVang || '0'}
                  </span>
                </div>
                <div className='stat_item'>
                  <span className='stat_label'>
                    {activeTab === 'sucmanh' ? 'Đệ tử' : 'Ngọc'}
                  </span>
                  <span className='stat_value'>
                    {activeTab === 'sucmanh'
                      ? currentData[2]?.formattedSucManhDeTu
                      : currentData[2]?.formattedNgoc || '0'}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className='ranking_table'>
        <div className='table_header'>
          <div className='header_item'>HẠNG</div>
          <div className='header_item'>NHÂN VẬT</div>
          <div className='header_item'>
            {activeTab === 'sucmanh' ? 'SỨC MẠNH' : 'VÀNG'}
          </div>
          <div className='header_item'>
            {activeTab === 'sucmanh' ? 'ĐỆ TỬ' : 'NGỌC'}
          </div>
        </div>
        
        <div className='table_body'>
          {currentData.length > 0 ? (
            currentData.map((user, index) => (
              <div key={user.id || index} className='table_row'>
                <div className='rank_cell'>
                  {user.rank <= 3 ? (
                    <div className={`rank_medal rank_medal_${user.rank}`}>
                      {user.rank}
                    </div>
                  ) : (
                    <div className='rank_number'>{user.rank}</div>
                  )}
                </div>
                <div className='player_info'>
                  <div className='player_avatar'>
                    <img src={NhanVat} alt={user.username || "player"} />
                  </div>
                  <span className='player_name'>{user.username || `Player ${index + 1}`}</span>
                </div>
                <div className='power_value'>
                  {activeTab === 'sucmanh' 
                    ? user.formattedSucManh 
                    : user.formattedVang}
                </div>
                <div className='detu_value'>
                  {activeTab === 'sucmanh'
                    ? user.formattedSucManhDeTu
                    : user.formattedNgoc || '0'}
                </div>
              </div>
            ))
          ) : (
            <div className="no_data">
              <p>Không có dữ liệu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Bangxh;