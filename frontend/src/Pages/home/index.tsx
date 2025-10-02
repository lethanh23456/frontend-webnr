import './home.scss';
import Beerus from "../../assets/beerus-01.png";
import Hit from "../../assets/zA4dnaP_d.webp";

function Home() {
  return (
    <div className="home">
      <div className="game_banner">
        <div className="banner_background">
          <div className="banner_characters">
            <div className="character character_left">
              <img src={Hit} alt="Hit" />
            </div>
            <div className="character character_right">
              <img src={Beerus} alt="Beerus" />
            </div>
          </div>
          
          <div className="banner_content">
            <div className="game_title">
              <h1>DRAGON BALL LEGENDS</h1>
              <div className="title_decoration"></div>
            </div>
            
            <div className="game_description">
              <p>Trải nghiệm trận chiến Dragon Ball cực kỳ mãn nhãn</p>
              <p>Với đồ họa 3D tuyệt đẹp và gameplay hấp dẫn</p>
            </div>
          </div>
        </div>
      </div>


      <div className="download_section">
        <div className="download_title">
          <div className="title_banner">
            <span>TẢI GAME</span>
          </div>
        </div>
        
        <div className="download_buttons">
          <div className="download_item">
            <div className="download_button windows">
              <div className="button_icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 5.45L9.5 4.5V11.5H3V5.45ZM3 12.5H9.5V19.5L3 18.55V12.5ZM10.5 4.25L21 2.5V11.5H10.5V4.25ZM21 12.5V21.5L10.5 19.75V12.5H21Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="button_content">
                <div className="button_label">Tải cho</div>
                <div className="button_platform">Windows</div>
              </div>
            </div>
          </div>

          <div className="download_item">
            <div className="download_button appstore">
              <div className="button_icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.19 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="button_content">
                <div className="button_label">Tải game</div>
                <div className="button_platform">App Store</div>
              </div>
            </div>
          </div>

          <div className="download_item">
            <div className="download_button googleplay">
              <div className="button_icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="button_content">
                <div className="button_label">Tải game</div>
                <div className="button_platform">Google Play</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;