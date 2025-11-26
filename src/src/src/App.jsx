import React, { useState, useEffect } from 'react';
import { Calendar, Trophy, Users, Home, Edit3, Save, X, Lock, ChevronRight } from 'lucide-react';

const UtahInlineHockeyLeague = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [teams, setTeams] = useState([
    { id: 1, name: 'Salt Lake Sliders', wins: 0, losses: 0, ties: 0, points: 0, streak: 0, players: [] },
    { id: 2, name: 'Provo Pucksters', wins: 0, losses: 0, ties: 0, points: 0, streak: 0, players: [] },
    { id: 3, name: 'Ogden Ice Hawks', wins: 0, losses: 0, ties: 0, points: 0, streak: 0, players: [] },
    { id: 4, name: 'Park City Blades', wins: 0, losses: 0, ties: 0, points: 0, streak: 0, players: [] },
  ]);

  const [schedule, setSchedule] = useState([
    { id: 1, date: '2025-12-03', time: '7:00 PM', homeTeam: 'Salt Lake Sliders', awayTeam: 'Provo Pucksters', homeScore: null, awayScore: null },
    { id: 2, date: '2025-12-03', time: '8:30 PM', homeTeam: 'Ogden Ice Hawks', awayTeam: 'Park City Blades', homeScore: null, awayScore: null },
    { id: 3, date: '2025-12-10', time: '7:00 PM', homeTeam: 'Provo Pucksters', awayTeam: 'Ogden Ice Hawks', homeScore: null, awayScore: null },
    { id: 4, date: '2025-12-10', time: '8:30 PM', homeTeam: 'Park City Blades', awayTeam: 'Salt Lake Sliders', homeScore: null, awayScore: null },
  ]);

  const [selectedTeam, setSelectedTeam] = useState(null);

  const adminPassword = 'admin123';

  const handleLogin = () => {
    if (passwordInput === adminPassword) {
      setIsAdmin(true);
      setShowPasswordModal(false);
      setPasswordInput('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setEditMode(false);
  };

  const updateGameScore = (gameId, homeScore, awayScore) => {
    setSchedule(schedule.map(game => 
      game.id === gameId ? { ...game, homeScore: parseInt(homeScore) || 0, awayScore: parseInt(awayScore) || 0 } : game
    ));
  };

  const calculateStandings = () => {
    const standings = teams.map(team => {
      let wins = 0, losses = 0, ties = 0, streak = 0, lastResults = [];

      schedule.forEach(game => {
        if (game.homeScore !== null && game.awayScore !== null) {
          if (game.homeTeam === team.name) {
            if (game.homeScore > game.awayScore) {
              wins++;
              lastResults.push('W');
            } else if (game.homeScore < game.awayScore) {
              losses++;
              lastResults.push('L');
            } else {
              ties++;
              lastResults.push('T');
            }
          } else if (game.awayTeam === team.name) {
            if (game.awayScore > game.homeScore) {
              wins++;
              lastResults.push('W');
            } else if (game.awayScore < game.homeScore) {
              losses++;
              lastResults.push('L');
            } else {
              ties++;
              lastResults.push('T');
            }
          }
        }
      });

      for (let i = lastResults.length - 1; i >= 0; i--) {
        if (i === lastResults.length - 1) {
          streak = lastResults[i] === 'W' ? 1 : lastResults[i] === 'L' ? -1 : 0;
        } else {
          if (lastResults[i] === lastResults[lastResults.length - 1] && lastResults[i] !== 'T') {
            streak = lastResults[i] === 'W' ? Math.abs(streak) + 1 : -(Math.abs(streak) + 1);
          } else {
            break;
          }
        }
      }

      const points = wins * 2 + ties;
      const gamesPlayed = wins + losses + ties;

      return { ...team, wins, losses, ties, points, streak, gamesPlayed };
    });

    return standings.sort((a, b) => b.points - a.points || b.wins - a.wins);
  };

  const HomePage = () => (
    <div className="max-w-7xl mx-auto">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-12 mb-8 shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6TTAgMTZjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMlMwIDIyLjYyNyAwIDE2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Utah Inline Hockey League
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 font-light">Where passion meets the pavement</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
            <Calendar className="text-blue-600" size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Game Day</h3>
          <p className="text-gray-600">Every Tuesday</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
            <Trophy className="text-green-600" size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Season</h3>
          <p className="text-gray-600">Fall/Winter 2025</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
            <Users className="text-purple-600" size={24} />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Teams</h3>
          <p className="text-gray-600">{teams.length} Active Teams</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Latest Results</h2>
        </div>
        <div className="p-6">
          {schedule.filter(g => g.homeScore !== null).length > 0 ? (
            schedule.filter(g => g.homeScore !== null).slice(-3).map(game => (
              <div key={game.id} className="flex items-center justify-between py-4 border-b last:border-b-0 border-gray-100">
                <div className="flex-1 text-right pr-4">
                  <span className="font-semibold text-gray-900">{game.homeTeam}</span>
                </div>
                <div className="px-6">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-xl font-bold text-xl shadow-md">
                    {game.homeScore} - {game.awayScore}
                  </div>
                </div>
                <div className="flex-1 pl-4">
                  <span className="font-semibold text-gray-900">{game.awayTeam}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center py-8">No games played yet</p>
          )}
        </div>
      </div>
    </div>
  );

  const SchedulePage = () => (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Season Schedule</h1>
      <div className="space-y-4">
        {schedule.map(game => (
          <div key={game.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="text-sm font-semibold text-blue-600 mb-2">
                  {new Date(game.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} • {game.time}
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900 text-lg">{game.homeTeam}</span>
                  <span className="text-gray-400 font-light">vs</span>
                  <span className="font-bold text-gray-900 text-lg">{game.awayTeam}</span>
                </div>
              </div>
              {isAdmin && editMode ? (
                <div className="flex gap-3 items-center">
                  <input
                    type="number"
                    className="w-20 px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-center font-bold"
                    placeholder="0"
                    value={game.homeScore ?? ''}
                    onChange={(e) => updateGameScore(game.id, e.target.value, game.awayScore)}
                  />
                  <span className="text-gray-400 font-bold">-</span>
                  <input
                    type="number"
                    className="w-20 px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-center font-bold"
                    placeholder="0"
                    value={game.awayScore ?? ''}
                    onChange={(e) => updateGameScore(game.id, game.homeScore, e.target.value)}
                  />
                </div>
              ) : game.homeScore !== null ? (
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-bold text-2xl shadow-md">
                  {game.homeScore} - {game.awayScore}
                </div>
              ) : (
                <div className="px-6 py-3 bg-gray-100 rounded-xl text-gray-400 font-semibold">
                  Upcoming
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const StandingsPage = () => {
    const standings = calculateStandings();
    
    return (
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">League Standings</h1>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                  <th className="px-6 py-4 text-left font-bold">Rank</th>
                  <th className="px-6 py-4 text-left font-bold">Team</th>
                  <th className="px-6 py-4 text-center font-bold">GP</th>
                  <th className="px-6 py-4 text-center font-bold">W</th>
                  <th className="px-6 py-4 text-center font-bold">L</th>
                  <th className="px-6 py-4 text-center font-bold">T</th>
                  <th className="px-6 py-4 text-center font-bold">PTS</th>
                  <th className="px-6 py-4 text-center font-bold">Streak</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team, index) => (
                  <tr key={team.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-700">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">{team.name}</td>
                    <td className="px-6 py-4 text-center text-gray-600">{team.gamesPlayed}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-lg font-semibold">
                        {team.wins}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-lg font-semibold">
                        {team.losses}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-semibold">
                        {team.ties}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-4 py-1 bg-blue-600 text-white rounded-lg font-bold text-lg">
                        {team.points}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {team.streak > 0 ? (
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold">
                          W{team.streak}
                        </span>
                      ) : team.streak < 0 ? (
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-lg font-bold">
                          L{Math.abs(team.streak)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const TeamsPage = () => {
    const standings = calculateStandings();

    if (selectedTeam) {
      const team = standings.find(t => t.id === selectedTeam);
      return (
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setSelectedTeam(null)}
            className="mb-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 transition-colors"
          >
            ← Back to Teams
          </button>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
              <h1 className="text-4xl font-bold mb-2">{team.name}</h1>
              <p className="text-blue-200">Season {new Date().getFullYear()}</p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-6 bg-green-50 rounded-xl border-2 border-green-200">
                  <div className="text-4xl font-bold text-green-700 mb-1">{team.wins}</div>
                  <div className="text-sm font-semibold text-green-600">Wins</div>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-xl border-2 border-red-200">
                  <div className="text-4xl font-bold text-red-700 mb-1">{team.losses}</div>
                  <div className="text-sm font-semibold text-red-600">Losses</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
                  <div className="text-4xl font-bold text-gray-700 mb-1">{team.ties}</div>
                  <div className="text-sm font-semibold text-gray-600">Ties</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                  <div className="text-4xl font-bold text-blue-700 mb-1">{team.points}</div>
                  <div className="text-sm font-semibold text-blue-600">Points</div>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Roster</h2>
              <p className="text-gray-400 italic bg-gray-50 p-6 rounded-xl text-center">
                Player stats coming soon...
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Teams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standings.map(team => (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team.id)}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {team.name}
                </h2>
                <ChevronRight className="text-gray-400 group-hover:text-blue-600 transition-colors" size={20} />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Record</span>
                  <span className="font-bold text-gray-900">{team.wins}-{team.losses}-{team.ties}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Points</span>
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white rounded-lg font-bold">
                    {team.points}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center font-bold text-white shadow-lg">
              U
            </div>
            <div className="text-xl font-bold text-gray-900">UIHL</div>
          </div>
          <div className="flex gap-2">
            {isAdmin ? (
              <>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-md"
                >
                  {editMode ? <Save size={18} /> : <Edit3 size={18} />}
                  {editMode ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  <X size={18} />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-semibold shadow-md"
              >
                <Lock size={18} />
                Admin
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'standings', label: 'Standings', icon: Trophy },
              { id: 'teams', label: 'Teams', icon: Users }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedTeam(null); }}
                className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'schedule' && <SchedulePage />}
        {activeTab === 'standings' && <StandingsPage />}
        {activeTab === 'teams' && <TeamsPage />}
      </div>

      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Admin Login</h2>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Enter password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl mb-6 focus:border-blue-500 focus:outline-none"
            />
            <div className="flex gap-3">
              <button
                onClick={handleLogin}
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 font-semibold transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => { setShowPasswordModal(false); setPasswordInput(''); }}
                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-200 font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">Demo password: admin123</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UtahInlineHockeyLeague;
