import './Home.css';
import Sidebar from '../components/Sidebar';

// tells you if you had a high preference in xyz category
// tells you if you were recommended a fund because of a fund you're already invested in

function Recommendations() {
  return (
    <div className="home-container">
      <Sidebar />
      <div className='content'>
      <h2> Hello, welcome to your Recommendations. </h2>
      You were recommended this investment because of:

      
      </div>

    </div>
  );
}

export default Recommendations;