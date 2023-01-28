import redditBanner from '../assets/redditBanner.png';
import "../css/redditBanner.css";
const Banner = () => {
  return (
    <div className="Banner-Container">
      <header className="Banner-header">
        <img src={redditBanner} className="App-Banner" alt="logo" />
      </header>
    </div>
  );
};

export default Banner;
