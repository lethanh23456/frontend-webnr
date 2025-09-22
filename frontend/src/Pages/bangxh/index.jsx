import React from 'react';
import './bangxh.scss';

import LogoBxh from "../../assets/2.png";
import NhanVat from "../../assets/524.png";

function Bangxh() {
  return (
    <div className="bangxh">
      <div className='rank_filter'>
        <div className='logoBxh'>
            <img src={LogoBxh} />
        </div>
      </div>
      
     
      <div className='top_section'>
        <div className='top_tabs'>
          <div className='tab active'>TOP SM</div>
          <div className='tab'>TOP ĐẠI GIA</div>
          <div className='tab'>CẬP NHẬT SAU</div>
        </div>
        
        <div className='top_podium'>
          <div className='rank_item rank_2'>
            <div className='rank_number'>2</div>
            <div className='avatar'>
              <img src={NhanVat} alt="galick" />
            </div>
            <div className='username'>galick</div>
            <div className='power'>120,206,383,959</div>
            <div className='detu'>100,414,705,487</div>
          </div>
          
          <div className='rank_item rank_1'>
            <div className='rank_number'>1</div>
            <div className='avatar'>
              <img src={NhanVat} alt="nobita" />
            </div>
            <div className='username'>nobita</div>
            <div className='power'>120,186,581,295</div>
            <div className='detu'>100,767,966,343</div>
          </div>
          
          <div className='rank_item rank_3'>
            <div className='rank_number'>3</div>
            <div className='avatar'>
              <img src={NhanVat} alt="kyusuke" />
            </div>
            <div className='username'>kyusuke</div>
            <div className='power'>120,029,813,661</div>
            <div className='detu'>100,326,479,631</div>
          </div>
        </div>
      </div>
      
     
      <div className='ranking_table'>
        <div className='table_header'>
          <div className='header_item'>HẠNG</div>
          <div className='header_item'>NHÂN VẬT</div>
          <div className='header_item'>SỨC MẠNH</div>
          <div className='header_item'>ĐỆ TỬ</div>
        </div>
        
        <div className='table_body'>
          <div className='table_row'>
            <div className='rank_number'>1</div>
            <div className='player_info'>
              <img src={NhanVat} alt="nobita" />
              <span>nobita</span>
            </div>
            <div className='power_value'>120,186,581,295</div>
            <div className='detu_value'>100,767,966,343</div>
          </div>
          
          <div className='table_row'>
            <div className='rank_number'>2</div>
            <div className='player_info'>
              <img src={NhanVat} alt="galick" />
              <span>galick</span>
            </div>
            <div className='power_value'>120,206,383,959</div>
            <div className='detu_value'>100,414,705,487</div>
          </div>
          
          <div className='table_row'>
            <div className='rank_number'>3</div>
            <div className='player_info'>
              <img src={NhanVat} alt="kyusuke" />
              <span>kyusuke</span>
            </div>
            <div className='power_value'>120,029,813,661</div>
            <div className='detu_value'>100,326,479,631</div>
          </div>
          
          <div className='table_row'>
            <div className='rank_number'>4</div>
            <div className='player_info'>
              <img src={NhanVat} alt="kamisama" />
              <span>kamisama</span>
            </div>
            <div className='power_value'>120,099,995,555</div>
            <div className='detu_value'>100,135,710,848</div>
          </div>
          
          <div className='table_row'>
            <div className='rank_number'>5</div>
            <div className='player_info'>
              <img src={NhanVat} alt="pem300k" />
              <span>pem300k</span>
            </div>
            <div className='power_value'>120,047,279,317</div>
            <div className='detu_value'>100,069,798,742</div>
          </div>
          
          <div className='table_row'>
            <div className='rank_number'>6</div>
            <div className='player_info'>
              <img src={NhanVat} alt="s3boy69" />
              <span>s3boy69</span>
            </div>
            <div className='power_value'>120,024,934,562</div>
            <div className='detu_value'>100,050,151,997</div>
          </div>
          
          <div className='table_row'>
            <div className='rank_number'>7</div>
            <div className='player_info'>
              <img src={NhanVat} alt="gnasche" />
              <span>gnasche</span>
            </div>
            <div className='power_value'>101,782,767,293</div>
            <div className='detu_value'>100,438,672,774</div>
          </div>
          
         
        </div>
      </div>
    </div>
  );
}

export default Bangxh;