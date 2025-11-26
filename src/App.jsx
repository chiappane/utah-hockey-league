import React from 'react';
import { Calendar, Trophy, Users, Home, ChevronRight, ChevronLeft } from 'lucide-react';

export default function App() {
  // ================================================================
  // SEASONS
  // ================================================================
  const seasons = {
    "Winter '25": {
      current: true,
      schedule: [
        { date: '2025-12-03', time: '7:00 PM', home: 'Salt Lake Sliders',    away: 'Provo Pucksters',       homeScore: 6, awayScore: 4 },
        { date: '2025-12-03', time: '8:30 PM', home: 'Ogden Ice Hawks',      away: 'Park City Blades',      homeScore: 3, awayScore: 3 },
        { date: '2025-12-10', time: '7:00 PM', home: 'Provo Pucksters',      away: 'Ogden Ice Hawks',       homeScore: 5, awayScore: 2 },
        { date: '2025-12-10', time: '8:30 PM', home: 'Park City Blades',     away: 'Salt Lake Sliders',     homeScore: 1, awayScore: 7 },
        { date: '2025-12-17', time: '7:00 PM', home: 'Lehi Lightning',       away: 'Layton Lancers',        homeScore: null, awayScore: null },
        { date: '2025-12-17', time: '8:30 PM', home: 'Orem Outlaws',         away: 'Logan Wolves',          homeScore: null, awayScore: null },
      ],
    },
  };

  const currentSeasonName = Object.keys(seasons).find(k => seasons[k].current) || Object.keys(seasons)[0];
  const currentSeason = seasons[currentSeasonName];

  // ================================================================
  // 10 TEAMS + ROSTERS
  // ================================================================
  const teams = [
    { id: 1,  name: 'Salt Lake Sliders',    color: 'blue'   },
    { id: 2,  name: 'Provo Pucksters',      color: 'purple' },
    { id: 3,  name: 'Ogden Ice Hawks',      color: 'black'  },
    { id: 4,  name: 'Park City Blades',     color: 'silver' },
    { id: 5,  name: 'Lehi Lightning',       color: 'yellow' },
    { id: 6,  name: 'Layton Lancers',       color: 'green'  },
    { id: 7,  name: 'Orem Outlaws',         color: 'red'    },
    { id: 8,  name: 'Logan Wolves',         color: 'gray'   },
    { id: 9,  name: 'St. George Scorchers', color: 'orange' },
    { id: 10, name: 'Cedar City Crushers',  color: 'maroon' },
  ];

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
  // CALCULATE STANDINGS (fixed the typo that caused white screen)
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
      return { ...team, wins: s.wins, losses: s.losses, ties: s.ties, points, streak, gp: s.wins + s.losses + s.ties };
    }).sort((a, b) => b.points - a.points || b.wins - a.wins);
  };

  // State
  const [activeTab, setActiveTab] = React.useState('home');
  const [selectedTeam, setSelectedTeam] = React.useState(null);
  const [selectedSeason, setSelectedSeason] = React.useState(currentSeasonName);

  const viewedSeason = seasons[selectedSeason] || currentSeason;
  const standings = calculateStandings(viewedSeason);

  const tabs = [
    { id: 'home',      label: 'Home',      icon: Home },
    { id: 'schedule',  label: 'Schedule',  icon: Calendar },
    { id: 'standings', label: 'Standings', icon: Trophy },
    { id: 'teams',     label: 'Teams',     icon: Users },
  ];

  // ================================================================
  // PAGES
  // ================================================================
  const HomePage = () => (
    <div className="text-center py-24">
      <h1 className="text-6xl md:text-8xl font-black text-white mb-6">UIHL</h1>
      <p className="text-3xl text-blue-300 mb-8">Utah Inline Hockey League</p>
      <p className="text-2xl text-yellow-400">Winter '25 Season • 10 Teams</p>
    </div>
  );

  const SchedulePage = () => (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-white">Schedule & Results – {selectedSeason}</h1>
      <div className="space-y-4">
        {viewedSeason.schedule.map((game, i) => {
          const played = game.homeScore !== null;
          return (
            <div key={i} className="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <div className="text-blue-300 font-semibold">
                    {new Date(game.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} • {game.time}
                  </div>
                  <div className="text-2xl font-bold text-white mt-2">
                    {game.home} vs {game.away}
                  </div>
                </div>
                {played ? (
                  <div className="text-4xl font-black text-yellow-400">
                    {game.homeScore}–{game.awayScore}
                  </div>
                ) : (
                  <span className="px-6 py-3 bg-yellow-600 text-black rounded-xl font-bold">UPCOMING</span>
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">League Standings – {selectedSeason}</h1>
        <select value={selectedSeason} onChange={e => setSelectedSeason(e.target.value)}
          className="px-4 py-2 bg-white text-black rounded-lg">
          {Object.keys(seasons).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white bg-opacity-10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white bg-opacity-20">
            <tr>
              <th className="px-6 py-4 text-left">Rank</th>
              <th className="px-6 py-4 text-left">Team</th>
              <th className="px-6 py-4 text-center">GP</th>
              <th className="px-6 py-4 text-center">W</th>
              <th className="px-6 py-4 text-center">L</th>
              <th className="px-6 py-4 text-center">T</th>
              <th className="px-6 py-4 text-center">PTS</th>
              <th className="px-6 py-4 text-center">Streak</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((team, i) => (
              <tr key={team.id} className="border-t border-white border-opacity-10">
                <td className="px-6 py-4">{i + 1}</td>
                <td className="px-6 py-4 font-bold">{team.name}</td>
                <td className="px-6 py-4 text-center">{team.gp}</td>
                <td className="px-6 py-4 text-center"><span className="px-3 py-1 bg-green-600 rounded-lg">{team.wins}</span></td>
                <td className="px-6 py-4 text-center"><span className="px-3 py-1 bg-red-600 rounded-lg">{team.losses}</span></td>
                <td className="px-6 py-4 text-center"><span className="px-3 py-1 bg-gray-600 rounded-lg">{team.ties}</span></td>
                <td className="px-6 py-4 text-center"><span className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg">{team.points}</span></td>
                <td className="px-6 py-4 text-center font-bold">
                  {team.streak > 0 ? `W${team.streak}` : team.streak < 0 ? `L${Math.abs(team.streak)}` : '–'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const TeamsPage = () => {
    if (selectedTeam) {
      const team = teams.find(t => t.id === selectedTeam);
      const roster = rosters[team.name] || [];
      return (
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setSelectedTeam(null)} className="mb-6 text-blue-400 flex items-center gap-2">
            <ChevronLeft /> Back
          </button>
          <div className="bg-white bg-opacity-10 rounded-3xl p-10">
            <h1 className="text-5xl font-black text-white mb-4">{team.name}</h1>
            <p className="text-2xl text-blue-300 mb-10">{selectedSeason} Roster</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roster.map((player, i) => {
                const isGoalie = player.includes('(G)');
                return (
                  <div key={i} className={`p-6 rounded-2xl ${isGoalie ? 'bg-yellow-900 bg-opacity-30 border-2 border-yellow-500' : 'bg-white bg-opacity-10'} `}>
                    <div className="text-xl font-bold text-white">{player.replace(' (G)', '')}</div>
                    {isGoalie && <div className="mt-2 text-yellow-400 font-bold text-lg">GOALIE</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-white">Teams – {selectedSeason}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {teams.map(team => (
            <div key={team.id} onClick={() => setSelectedTeam(team.id)}
              className="bg-white bg-opacity-10 rounded-2xl p-8 text-center cursor-pointer hover:scale-105 transition">
              <div className={`w-24 h-24 mx-auto rounded-full bg-${team.color}-600 text-white flex items-center justify-center text-3xl font-black mb-4`}>
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
  // RENDER
  // ================================================================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      <header className="bg-black bg-opacity-50 backdrop-blur sticky top-0 z-50 border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-3xl font-black">U</div>
            <div className="text-3xl font-bold">UIHL</div>
          </div>
          <div className="text-xl opacity-90">{selectedSeason}</div>
        </div>
      </header>

      <nav className="bg-black bg-opacity-70 backdrop-blur border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedTeam(null); }}
                className={`flex items-center gap-3 px-8 py-4 font-semibold transition ${activeTab === tab.id ? 'bg-blue-600' : 'hover:bg-white hover:bg-opacity-10'}`}>
                <tab.icon size={22} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'schedule' && <SchedulePage />}
        {activeTab === 'standings' && <StandingsPage />}
        {activeTab === 'teams' && <TeamsPage />}
      </main>
    </div>
  );
}
