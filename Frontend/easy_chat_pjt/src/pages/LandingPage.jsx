import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiLogIn } from 'react-icons/fi';

function LandingPage() {
  const [roomId, setRoomId] = useState('');

  const handleCreateRoom = (e) => {
    e.preventDefault();
    // Handle room creation logic here
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    // Handle room joining logic here
  };

  return (
    <div className="min-h-screen bg-ocean-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-ocean-700">Easy Chat</h1>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="flex items-center text-ocean-600 hover:text-ocean-700"
              >
                <FiLogIn className="mr-2" />
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Create Room Section */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <FiPlus className="text-2xl text-ocean-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">Create Room</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Start a new chat room and invite others to join your conversation.
            </p>
            <button
              onClick={handleCreateRoom}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-ocean-600 hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500"
            >
              Create New Room
            </button>
          </div>

          {/* Join Room Section */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Join Room</h2>
            <form onSubmit={handleJoinRoom} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room ID
                </label>
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-ocean-500 focus:ring-ocean-500"
                  placeholder="Enter room ID"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-ocean-600 hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500"
              >
                Join Room
              </button>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Why Choose Easy Chat?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-ocean-600 mb-3">
                Instant Setup
              </h3>
              <p className="text-gray-600">
                Create or join a room in seconds. No registration required.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-ocean-600 mb-3">
                Secure Chats
              </h3>
              <p className="text-gray-600">
                Your conversations are private and secure.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-ocean-600 mb-3">
                Easy to Use
              </h3>
              <p className="text-gray-600">
                Simple and intuitive interface for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;