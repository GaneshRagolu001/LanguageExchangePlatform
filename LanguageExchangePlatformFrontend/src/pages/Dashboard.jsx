import { useState } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state.login.user);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data - in a real app, this would come from your Redux store or API
  const connections = [
    { id: 1, name: "Maria Garcia", language: "Spanish", country: "Spain", status: "online", avatar: "/api/placeholder/40/40" },
    { id: 2, name: "Hiroshi Tanaka", language: "Japanese", country: "Japan", status: "offline", avatar: "/api/placeholder/40/40" },
    { id: 3, name: "Emilie Dubois", language: "French", country: "France", status: "online", avatar: "/api/placeholder/40/40" }
  ];
  
  const pendingRequests = [
    { id: 4, name: "Paulo Silva", language: "Portuguese", country: "Brazil", avatar: "/api/placeholder/40/40" },
    { id: 5, name: "Anna Schmidt", language: "German", country: "Germany", avatar: "/api/placeholder/40/40" }
  ];
  
  const upcomingSessions = [
    { id: 1, partner: "Maria Garcia", language: "Spanish", date: "April 16, 2025", time: "3:00 PM" },
    { id: 2, partner: "Hiroshi Tanaka", language: "Japanese", date: "April 18, 2025", time: "10:00 AM" }
  ];
  
  const stats = [
    { name: "Practice Sessions", value: "0" },
    { name: "Connections", value: "0" },
    { name: "Messages", value: "0" },
    { name: "Streak Days", value: "0" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              {user?.native_language && (
                <span className="ml-4 px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">
                  {user.native_language} Speaker
                </span>
              )}
            </div>
            <Link
              to="/profile"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <img
                className="h-8 w-8 rounded-full mr-2"
                src={user?.profile_picture || "/api/placeholder/32/32"}
                alt="Profile"
              />
              My Profile
            </Link>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name || "Language Learner"}!
              </h2>
              {user?.learning_language && (
                <p className="mt-1 text-sm text-gray-500">
                  You're currently learning: <span className="font-medium text-blue-600">{user.learning_language}</span>
                </p>
              )}
              {user?.location && (
                <p className="mt-1 text-sm text-gray-500">
                  Location: <span className="font-medium">{user.location}</span>
                </p>
              )}
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link
                to="/find-partners"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Find New Partners
              </Link>
              <Link
                to="/schedule-session"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Schedule Session
              </Link>
            </div>
          </div>
        </div>

        {/* Complete Profile Alert - Show only if profile is incomplete */}
        {(!user?.bio || !user?.learning_language || !user?.native_language || !user?.interests) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Your profile is incomplete. Please 
                  <Link to="/profile/edit" className="font-medium underline text-yellow-700 hover:text-yellow-600"> complete your profile </Link>
                  to get better language partner matches.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stat.value}</dd>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`${
                activeTab === 'connections'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Connections
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`${
                activeTab === 'messages'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`${
                activeTab === 'progress'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Progress
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {activeTab === 'overview' && (
            <div className="p-6">
              {/* Get Started Guide - Show if new user */}
              {!user?.created_at && (
                <div className="mb-8 bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">Get Started with LinguaLink</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-blue-800">
                    <li>Complete your profile with your language preferences and interests</li>
                    <li>Find language partners who match your learning goals</li>
                    <li>Schedule your first conversation session</li>
                    <li>Start practicing with real native speakers!</li>
                  </ol>
                  <div className="mt-4">
                    <Link
                      to="/profile/edit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Complete Your Profile
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Pending Requests */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Connection Requests</h3>
                {pendingRequests.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {pendingRequests.map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-md p-4 flex justify-between items-center">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={request.avatar}
                            alt={request.name}
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{request.name}</p>
                            <p className="text-sm text-gray-500">{request.language} • {request.country}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                            Accept
                          </button>
                          <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Decline
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 px-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No pending requests</h3>
                    <p className="mt-1 text-sm text-gray-500">You don't have any pending connection requests at this time.</p>
                    <div className="mt-6">
                      <Link to="/find-partners" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Find Language Partners
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Upcoming Sessions */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Sessions</h3>
                {upcomingSessions.length > 0 ? (
                  <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Partner
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Language
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date & Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {upcomingSessions.map((session) => (
                          <tr key={session.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {session.partner}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {session.language}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {session.date} at {session.time}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <Link to={`/sessions/${session.id}`} className="text-blue-600 hover:text-blue-900">
                                Join
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 px-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming sessions</h3>
                    <p className="mt-1 text-sm text-gray-500">You don't have any practice sessions scheduled yet.</p>
                    <div className="mt-6">
                      <Link to="/schedule-session" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Schedule a Session
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggested Language Partners */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Suggested Partners</h3>
                  <Link to="/find-partners" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src="/api/placeholder/40/40" alt="Suggested partner" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Sofia Martinez</p>
                        <p className="text-sm text-gray-500">Spanish • Mexico</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-500">Interests: Music, Travel, Cooking</p>
                    <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src="/api/placeholder/40/40" alt="Suggested partner" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Jean Dupont</p>
                        <p className="text-sm text-gray-500">French • France</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-500">Interests: Books, Movies, Technology</p>
                    <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src="/api/placeholder/40/40" alt="Suggested partner" />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Akira Sato</p>
                        <p className="text-sm text-gray-500">Japanese • Japan</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-500">Interests: Sports, Anime, Photography</p>
                    <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'connections' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">Your Language Partners</h3>
                <Link
                  to="/find-partners"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Find New Partners
                </Link>
              </div>
              
              {connections.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {connections.map((connection) => (
                    <div key={connection.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={connection.avatar}
                            alt={connection.name}
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{connection.name}</p>
                            <p className="text-sm text-gray-500">{connection.language} • {connection.country}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          connection.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {connection.status}
                        </span>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Link
                          to={`/chat/${connection.id}`}
                          className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Message
                        </Link>
                        <Link
                          to={`/schedule/${connection.id}`}
                          className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Schedule
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No connections yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Start by finding language partners who match your interests.</p>
                  <div className="mt-6">
                    <Link
                      to="/find-partners"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Find Language Partners
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Messages</h3>
              
              {connections.length > 0 ? (
                <div className="space-y-4">
                  {connections.map((connection) => (
                    <div key={connection.id} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={connection.avatar}
                            alt={connection.name}
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{connection.name}</p>
                            <p className="text-sm text-gray-500 truncate w-48">
                              Hello! How was your weekend? I practiced...
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-gray-500">3:42 PM</span>
                          {connection.status === 'online' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 mt-1">
                              online
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No messages yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Connect with language partners to start messaging.</p>
                  <div className="mt-6">
                    <Link
                      to="/find-partners"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Find Language Partners
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Your Learning Progress</h3>
              
              {user?.learning_language ? (
                <div>
                  <div className="bg-gray-50 rounded-lg p-6 mb-8">
                    <h4 className="text-base font-medium text-gray-900 mb-4">{user.learning_language} Progress</h4>
                    
                    {/* Simple progress bars */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Vocabulary</span>
                          <span className="text-sm font-medium text-gray-700">0%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Grammar</span>
                          <span className="text-sm font-medium text-gray-700">0%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">Conversation</span>
                          <span className="text-sm font-medium text-gray-700">0%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Link
                        to="/practice"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Start Practicing
                      </Link>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-medium text-gray-900 mb-4">Learning Resources</h4>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="border border-gray-200 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Beginner's Guide to {user?.learning_language || "Your Target Language"}</h5>
                        <p className="text-xs text-gray-500 mb-4">Learn basic conversation phrases and grammar</p>
                        <Link to="/resources/beginners-guide" className="text-xs text-blue-600 font-medium hover:text-blue-500">
                          View Guide →
                        </Link>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Vocabulary Flashcards</h5>
                        <p className="text-xs text-gray-500 mb-4">Practice essential words and phrases</p>
                        <Link to="/resources/flashcards" className="text-xs text-blue-600 font-medium hover:text-blue-500">
                          Start Practicing →
                        </Link>
                      </div>
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h5 className="text-sm font-medium text-gray-900 mb-2">Grammar Exercises</h5>
                        <p className="text-xs text-gray-500 mb-4">Strengthen your understanding of rules</p>
                        <Link to="/resources/grammar" className="text-xs text-blue-600 font-medium hover:text-blue-500">
                          Start Exercises →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Select a language to learn</h3>
                  <p className="mt-1 text-sm text-gray-500">You haven't selected which language you want to learn yet.</p>
                  <div className="mt-6">
                    <Link
                      to="/profile/edit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Update Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">© 2025 LinguaLink. All rights reserved.</span>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <Link to="/help" className="text-gray-500 hover:text-gray-900 text-sm">
                  Help Center
                </Link>
                <Link to="/privacy" className="text-gray-500 hover:text-gray-900 text-sm">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-500 hover:text-gray-900 text-sm">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}