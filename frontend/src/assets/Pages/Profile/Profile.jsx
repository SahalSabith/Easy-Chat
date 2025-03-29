import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  // This would be fetched from your Django backend
  const [userData, setUserData] = useState({
    username: 'ChatMaster',
    email: 'chatmaster@example.com',
    fullName: 'Alex Johnson',
    bio: 'I love discussing technology and gaming. Always open to new chat topics!',
    joinedDate: 'January 2023',
    profileImage: null, // URL would come from backend
    hostedRooms: 5,
    participatedRooms: 12
  });

  const [activeTab, setActiveTab] = useState('profile');
  
  // Demo data for hosted and joined rooms
  const hostedRooms = [
    { id: 1, name: 'Tech Innovations', participants: 24, lastActive: '2 hours ago' },
    { id: 2, name: 'Game Development', participants: 18, lastActive: '1 day ago' },
    { id: 3, name: 'Sci-Fi Discussions', participants: 15, lastActive: '3 days ago' },
    { id: 4, name: 'Web Programming', participants: 21, lastActive: '5 days ago' },
    { id: 5, name: 'AI Enthusiasts', participants: 32, lastActive: '1 week ago' }
  ];
  
  const joinedRooms = [
    { id: 6, name: 'Book Recommendations', host: 'BookLover', participants: 16, lastActive: '1 hour ago' },
    { id: 7, name: 'Music Production', host: 'BeatMaker', participants: 28, lastActive: '4 hours ago' },
    { id: 8, name: 'Photography Tips', host: 'LensLife', participants: 42, lastActive: '1 day ago' },
    { id: 9, name: 'Travel Stories', host: 'Wanderlust', participants: 36, lastActive: '2 days ago' },
    { id: 10, name: 'Cooking Recipes', host: 'ChefMaster', participants: 54, lastActive: '3 days ago' },
    { id: 11, name: 'Fitness Goals', host: 'FitCoach', participants: 31, lastActive: '5 days ago' },
    { id: 12, name: 'Career Advice', host: 'WorkPro', participants: 47, lastActive: '1 week ago' }
  ];
  
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: userData.fullName,
    email: userData.email,
    bio: userData.bio,
    profileImage: userData.profileImage
  });
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Here you would make an API call to update the user profile
    setUserData(prev => ({
      ...prev,
      fullName: editFormData.fullName,
      email: editFormData.email,
      bio: editFormData.bio,
      profileImage: editFormData.profileImage
    }));
    setIsEditing(false);
  };
  
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this file to your server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      setEditFormData(prev => ({
        ...prev,
        profileImage: imageUrl
      }));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {userData.profileImage ? (
            <img src={userData.profileImage} alt={userData.username} />
          ) : (
            <div className="avatar-placeholder">
              {userData.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="profile-info">
          <h1>{userData.username}</h1>
          <p className="profile-joined">Member since {userData.joinedDate}</p>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">{userData.hostedRooms}</span>
              <span className="stat-label">Rooms Hosted</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{userData.participatedRooms}</span>
              <span className="stat-label">Rooms Joined</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-tabs">
        <button 
          className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Info
        </button>
        <button 
          className={`profile-tab ${activeTab === 'hosted' ? 'active' : ''}`}
          onClick={() => setActiveTab('hosted')}
        >
          Hosted Rooms
        </button>
        <button 
          className={`profile-tab ${activeTab === 'joined' ? 'active' : ''}`}
          onClick={() => setActiveTab('joined')}
        >
          Joined Rooms
        </button>
      </div>
      
      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-details">
            {isEditing ? (
              <form className="profile-edit-form" onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label>Profile Picture</label>
                  <div className="profile-image-upload">
                    {editFormData.profileImage ? (
                      <img src={editFormData.profileImage} alt="Profile preview" className="profile-image-preview" />
                    ) : (
                      <div className="avatar-placeholder upload-placeholder">
                        {userData.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <input 
                      type="file" 
                      id="profileImage" 
                      accept="image/*" 
                      onChange={handleProfileImageChange}
                    />
                    <label htmlFor="profileImage" className="upload-button">Choose Image</label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={editFormData.fullName}
                    onChange={handleEditChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={editFormData.bio}
                    onChange={handleEditChange}
                    rows="4"
                  ></textarea>
                </div>
                
                <div className="edit-actions">
                  <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="save-button">
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="detail-item">
                  <h3>Full Name</h3>
                  <p>{userData.fullName}</p>
                </div>
                
                <div className="detail-item">
                  <h3>Email</h3>
                  <p>{userData.email}</p>
                </div>
                
                <div className="detail-item">
                  <h3>Bio</h3>
                  <p>{userData.bio}</p>
                </div>
                
                <button className="edit-profile-button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              </>
            )}
          </div>
        )}
        
        {activeTab === 'hosted' && (
          <div className="profile-rooms">
            <h2>Your Hosted Chat Rooms</h2>
            {hostedRooms.length === 0 ? (
              <div className="empty-state">
                <p>You haven't hosted any chat rooms yet.</p>
                <button className="create-room-button">Host Your First Room</button>
              </div>
            ) : (
              <div className="rooms-list">
                {hostedRooms.map(room => (
                  <div key={room.id} className="room-item">
                    <div className="room-details">
                      <h3>{room.name}</h3>
                      <div className="room-meta">
                        <span>{room.participants} participants</span>
                        <span>Last active: {room.lastActive}</span>
                      </div>
                    </div>
                    <div className="room-actions">
                      <button className="room-action-button primary">Enter Room</button>
                      <button className="room-action-button secondary">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'joined' && (
          <div className="profile-rooms">
            <h2>Rooms You've Joined</h2>
            {joinedRooms.length === 0 ? (
              <div className="empty-state">
                <p>You haven't joined any chat rooms yet.</p>
                <button className="explore-rooms-button">Explore Rooms</button>
              </div>
            ) : (
              <div className="rooms-list">
                {joinedRooms.map(room => (
                  <div key={room.id} className="room-item">
                    <div className="room-details">
                      <h3>{room.name}</h3>
                      <div className="room-meta">
                        <span>Hosted by: {room.host}</span>
                        <span>{room.participants} participants</span>
                        <span>Last active: {room.lastActive}</span>
                      </div>
                    </div>
                    <div className="room-actions">
                      <button className="room-action-button primary">Enter Room</button>
                      <button className="room-action-button tertiary">Leave Room</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;