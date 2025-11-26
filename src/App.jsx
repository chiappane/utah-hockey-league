jsx// src/App.jsx
// FULL FINAL VERSION – 10 teams, rosters, multi-season support, Winter '25 title
// Just copy-paste this entire file over your current src/App.jsx and push to Netlify

import React from 'react';
import { Calendar, Trophy, Users, Home, ChevronRight, ChevronLeft } from 'lucide-react';

export default function App() {
  // ================================================================
  // SEASONS – Add a new object here every season (only ONE has current: true)
  // ================================================================
  const seasons = {
    "Winter '25": {
      current: true,
      schedule: [
        { date: '2025-12-03', time: '7:00 PM', home: 'Salt Lake Sliders',    away: 'Provo Pucksters',       homeScore: 6, awayScore: 4 },
        { date: '2025-12-03', time: '8:30 PM', home: 'Ogden Ice Hawks',      away: 'Park City Blades',      homeScore: 3, awayScore: 3 },
        { date: '2025-12-10', time: '7:00 PM', home: 'Provo Pucksters',      away: 'Ogden Ice Hawks',       homeScore: 5, awayScore: 2 },
        { date: '2025-12-10', time: '8:30 PM', home: 'Park City Blades',     away: 'Salt Lake Sliders',     homeScore: 1, awayScore: 7 },
        // ← Add games here every week. Use null for upcoming games
        { date: '2025-12-17', time: '7:00 PM', home: 'Lehi Lightning',       away: 'Layton Lancers',        homeScore: null, awayScore: null },
        { date: '2025-12-17', time: '8:30 PM', home: 'Orem Outlaws',         away: 'Logan Wolves',          homeScore: null, awayScore: null },
        // …keep going
      ],
    },
    // Example of a finished season (you will add these later)
    // "Fall '24": {
    //   current: false,
    //   schedule: [ …old games with real scores… ],
    // },
  };

  // Automatically pick the current season
  const currentSeasonName = Object.keys(seasons).find(k => seasons[k].current) || Object.keys(seasons)[0];
  const currentSeason = seasons[currentSeasonName];

  // ================================================================
  // 10 TEAMS
  // ================================================================
  const teams = [
    { id: 1,  name: 'Salt Lake Sliders',    color: 'blue'   },
    { id: 2,  name: 'Provo Pucksters',      color: 'purple' },
    { id: 3,  name: 'Ogden Ice Hawks',      color: 'black'  },
    { id: 4,  name: 'Park City Blades',    color: 'silver' },
    { id: 5,  name: 'Lehi Lightning',       color: 'yellow' },
    { id: 6,  name: 'Layton Lancers',       color: 'green'  },
    { id: 7,  name: 'Orem Outlaws',         color: 'red'    },
    { id: 8,  name: 'Logan Wolves',         color: 'gray'   },
    { id: 9,  name: 'St. George Scorchers', color: 'orange' },
    { id: 10, name: 'Cedar City Crushers',  color: 'maroon' },
  ];

  // ================================================================
  // ROSTERS – 5 players per team (last one is the goalie)
  // ================================================================
  const rosters = {
    'Salt Lake Sliders':     ['Jake Thompson', 'Mike Rivera', 'Alex Chen', 'Sarah Kim', 'Tyler Brooks (G)'],
    'Provo Pucksters':       ['Connor Davis', 'Liam Wright', 'Noah Patel', 'Emma Johnson', 'Carter Hayes (G)'],
    'Ogden Ice Hawks':       ['Mason Lee', 'Ethan Clark', 'Lucas Young', 'Ava Martinez', 'Owen Reed (G)'],
    'Park City Blades':      ['Caleb Hill', 'Ryan King', 'Dylan Scott', 'Mia Lopez', 'Gavin Ward (G)'],
    'Lehi Lightning':        ['Hunter Bell', 'Jordan Gray', 'Blake Adams', 'Zoe Nelson', 'Cole Foster (G)'],
    'Layton Lancers':        ['Bryce Turner', 'Eli Russell', 'Kayla Perez', 'Nate Coleman', 'Drew Murphy (G)'],
    'Orem Outlaws':          ['Tanner Cook', 'Jace Evans', 'Lilly Flores', 'Brady Long', 'Grant Price (G)'],
    'Logan Wolves':          ['Kaden Ross', 'Seth Bailey', 'Grace Howard', 'Wyatt Cox', 'Ian Fletcher (G)'],
    'St. George Scorchers':  ['Jett Ortiz', 'Knox Rivera', 'Hazel Diaz', 'Milo Grant', 'Beckett Shaw (G)'],
    'Cedar City Crushers':   ['Rhett Vargas', 'Soren Hale', 'Luna Rose', 'Tate Beck', 'Knox Pierce (G)'],
  };

  // ================================================================
  // CALCULATE STANDINGS FOR ANY SEASON
  // ================================================================
  const calculateStandings = (seasonData) => {
    const stats = new Map();
    teams.forEach(t => stats.set(t.name, { wins: 0, losses: 0, ties: 0, last: [] }));

    seasonData.schedule.forEach(game => {
      if (game.homeScore === null) return;

      if (game.homeScore > game.awayScore) {
        stats.get(game.home).wins++;
        stats.get(game.away).losses++;
        stats.get(game.home).last.push('W');
        stats.get(game.away).last.push('L');
      } else if (game.homeScore < game.awayScore) {
        stats.get(game.home).losses++;
        stats.get(game.away).wins++;
        stats.get(game.home).last.push('L');
        stats.get(game.away).last.push('W');
      } else {
        stats.get(game.home).ties++;
        stats.get(game.away).ties++;
        stats.get(game.home).last.push('T');
        stats.get(game.away).last.push('T');
      }
    });

    return teams.map(team => {
      const s = stats.get(team.name);
      const points = s.wins * 2 + s.ties;
      let streak = 0;
      if (s.last.length > 0) {
        const last = s.last[s.last.length - 1];
        if (last !== 'T') {
          let count = 0;
          for (let i = s.last.length - 1; i >= 0; i--) {
            if (s.last[i] === last) count++;
            else break;
          }
          streak = last === 'W' ? count : -count;
        }
      }
      return { ...team, ...s, points, streak, gp: s.wins + s.losses + s.ties };
    }).sort((a, b) => b.points - a.points || b.wins - a.wins);
  };

  // State
  const [activeTab, setActiveTab] = React.useState('home');
  const [selectedTeam, setSelectedTeam] = React.useState(null);
  const [selectedSeason, setSelectedSeason] = React.useState(currentSeasonName);

  // Standings for the season the user is viewing
  const viewedSeason = seasons[selectedSeason];
  const standings = calculateStandings(viewedSeason);

  const tabs = [
    { id: 'home',      label: 'Home',      icon: Home },
    { id: 'schedule',  label: 'Schedule',  icon: Calendar },
    { id: 'standings', label: 'Standings', icon: Trophy },
    { id: 'teams',     label: 'Teams',     icon: Users },
  ];

  // ================================================================
  // COMPONENTS
  // ================================================================
  const HomePage = () => (
    <div className="max-w-7xl mx-auto text-center py-24">
      <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Utah Inline Hockey League</h1>
      <p className="text-2xl md:text-3xl text-blue-200 mb-12">Winter ’25 Season • 10 Teams • Pure Fun</p>
      <div className="text-3xl md:text-4xl font-bold text-yellow-400">
        Next Games:{' '}
        {viewedSeason.schedule.find(g => g.homeScore === null)
          ? new Date(viewedSeason.schedule.find(g => g.homeScore === null).date).toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric'
            })
          : 'Season Complete'}
      </div>
    </div>
  );

  const SchedulePage = () => (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white">Schedule & Results – {selectedSeason}</h1>
      <div className="space-y-4">
        {viewedSeason.schedule.map((game, i) => {
          const played = game.homeScore !== null;
          return (
            <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6 hover:bg-white/20 transition">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-blue-300 mb-2">
                    {new Date(game.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} • {game.time}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {game.home} <span className="text-gray-400">vs</span> {game.away}
                  </div>
                </div>
                {played ? (
                  <div className="flex items-center gap-6">
                    <span className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold">FINAL</span>
                    <div className="text-4xl font-black text-yellow-400">{game.homeScore}–{game.awayScore}</div>
                  </div>
                ) : (
                  <div className="px-8 py-4 bg-yellow-600 text-black rounded-xl font-bold text-lg">
                    Upcoming
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const StandingsPage = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-white">League Standings – {selectedSeason}</h1>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value)}
          className="px-5 py-3 bg-white/20 backdrop-blur text-white rounded-lg border border-white/30"
        >
          {Object.keys(seasons).map(s => (
            <option key={s} value={s} className="bg-gray-900">{s}</option>
          ))}
        </select>
      </div>

      <div className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/20">
              <tr>
                <th className="px-6 py-4 text-left text-white">Rank</th>
                <th className="px-6 py-4 text-left text-white">Team</th>
                <th className="px-6 py-4 text-center text-white">GP</th>
                <th className="px-6 py-4 text-center text-white">W</th>
                <th className="px-6 py-4 text-center text-white">L</th>
                <th className="px-6 py-4 text-center text-white">T</th>
                <th className="px-6 py-4 text-center text-white">PTS</th>
                <th className="px-6 py-4 text-center text-white">Streak</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, i) => (
                <tr key={team.id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-6 py-5 text-white">{i + 1}</td>
                  <td className="px-6 py-5 font-bold text-white">{team.name}</td>
                  <td className="px-6 py-5 text-center text-gray-300">{team.gp}</td>
                  <td className="px-6 py-5 text-center"><span className="px-3 py-1 bg-green-600 text-white rounded-lg font-bold">{team.wins}</span></td>
                  <td className="px-6 py-5 text-center"><span className="px-3 py-1 bg-red-600 text-white rounded-lg font-bold">{team.losses}</span></td>
                  <td className="px-6 py-5 text-center"><span className="px-3 py-1 bg-gray-600 text-white rounded-lg font-bold">{team.ties}</span></td>
                  <td className="px-6 py-5 text-center"><span className="px-4 py-2 bg-yellow-500 text-black rounded-lg font-black text-lg">{team.points}</span></td>
                  <td className="px-6 py-5 text-center font-bold">
                    {team.streak > 0 ? <span className="text-green-400">W{team.streak}</span> : team.streak < 0 ? <span className="text-red-400">L{Math.abs(team.streak)}</span> : '–'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TeamsPage = () => {
    if (selectedTeam) {
      const team = teams.find(t => t.id === selectedTeam);
      const roster = rosters[team.name] || [];
      return (
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setSelectedTeam(null)} className="mb-6 text-blue-300 flex items-center gap-2 hover:text-white">
            <ChevronLeft size={20} /> Back to Teams
          </button>
          <div className="bg-white/10 backdrop-blur rounded-3xl overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-10 text-center">
              <h1 className="text-5xl font-black text-white">{team.name}</h1>
              <p className="text-xl text-blue-200 mt-3">{selectedSeason} Roster</p>
            </div>
            <div className="p-8">
              <h2 className="text-3xl font-bold text-white mb-8">Players (5)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {roster.map((player, i) => {
                  const isGoalie = player.includes('(G)');
                  return (
                    <div key={i} className={`p-6 rounded-2xl border-2 ${isGoalie ? 'border-yellow-500 bg-yellow-900/30' : 'border-white/20'} backdrop-blur`}>
                      <div className="text-xl font-bold text-white">{player.replace(' (G)', '')}</div>
                      {isGoalie && <div className="mt-2 px-4 py-1 bg-yellow-500 text-black rounded-full inline-block font-bold">GOALIE</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-white">Teams – {selectedSeason}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teams.map(team => (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team.id)}
              className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center cursor-pointer hover:scale-105 hover:bg-white/20 transition"
            >
              <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-${team.color}-600 to-${team.color}-800 text-white flex items-center justify-center text-4xl font-black mb-4 shadow-xl`}>
                {team.name.split(' ').map(w => w[0]).join('')}
              </div>
              <h3 className="text-xl font-bold text-white">{team.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ================================================================
  // MAIN RENDER
  // ================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl font-black">U</div>
            <div className="text-3xl font-bold">UIHL</div>
          </div>
          <div className="text-xl opacity-80">{selectedSeason}</div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black/70 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedTeam(null);
                }}
                className={`flex items-center gap-3 px-8 py-4 font-semibold rounded-t-lg transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon size={22} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'schedule' && <SchedulePage />}
        {activeTab === 'standings' && <StandingsPage />}
        {activeTab === 'teams' && <TeamsPage />}
      </main>
    </div>
  );
}
