import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRooms } from '../../Redux/roomSlice.js';
import { selectTheme } from '../../Redux/themeSlice.js';
import './Home.css';

const Home = () => {
  // Redux hooks
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  const isDark = currentTheme === 'dark';

  const rooms = useSelector((state) => state.rooms.rooms);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    document.body.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    document.body.style.backgroundColor = isDark ? '#121212' : '#f5f7fa';
    document.body.style.color = isDark ? '#e0e0e0' : '#333';
  }, [isDark]);

  useEffect(() => {
    if (token) {
      dispatch(fetchRooms());
    } else {
      console.log("Not Authenticated");
    }
  }, [dispatch, token]); // Added dependency array

  return (
    <div className="home-page">
      <div className={isDark ? 'hero-sectionDark' : 'hero-section'}>
        <h1>Welcome to Easy Chat</h1>
        <p>Join interesting conversations or host your own chat room</p>
      </div>

      <div className={isDark ? 'rooms-sectionDark' : 'rooms-section'}>
        <div className={isDark ? 'rooms-headerDark' : 'rooms-header'}>
          <h2>Active Chat Rooms</h2>
          <div className={isDark ? 'rooms-filtersDark' : 'rooms-filters'}>
            <input 
              type="text" 
              placeholder="Search rooms..." 
              className={isDark ? 'search-inputDark' : 'search-input'} 
            />
            <select className={isDark ? 'filter-selectDark' : 'filter-select'}>
              <option value="all">All Categories</option>
              <option value="gaming">Gaming</option>
              <option value="tech">Technology</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>
        </div>

        <div className={isDark ? 'rooms-gridDark' : 'rooms-grid'}>
          {rooms.map((room) => (
            <div key={room.id} className={isDark ? 'room-cardDark' : 'room-card'}>
              <div className={isDark ? 'room-headerDark' : 'room-header'}>
                <h3 className={isDark ? 'room-nameDark' : 'room-name'}>{room.name}</h3>
                <span className={isDark ? 'room-participantsDark' : 'room-participants'}>
                  {room.participants || 0} online
                </span>
              </div>
              <div className={isDark ? 'room-hostDark' : 'room-host'}>
                Hosted by: {room.host || "Unknown"}
              </div>
              <div className={isDark ? 'room-tagsDark' : 'room-tags'}>
                {(room.tags || []).map((tag) => (
                  <span key={tag} className={isDark ? 'room-tagDark' : 'room-tag'}>
                    #{tag}
                  </span>
                ))}
              </div>
              <button className={isDark ? 'join-buttonDark' : 'join-button'}>
                Join Room
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;