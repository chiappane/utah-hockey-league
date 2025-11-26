import React from 'react';
import { Calendar, Trophy, Users, Home, ChevronLeft, ChevronDown } from 'lucide-react';

export default function App() {
  // ================================================================
  // SEASONS
  // ================================================================
  const seasons = {
    "Summer '25": {
      current: false,
      schedule: [
        { date: '2025-06-05', time: '7:00 PM', home: 'Salt Lake Sliders',    away: 'Provo Pucksters',       homeScore: 5, awayScore: 3 },
        { date: '2025-06-05', time: '8:30 PM', home: 'Ogden Ice Hawks',      away: 'Park City Blades',      homeScore: 4, awayScore: 4 },
        { date: '2025-06-12', time: '7:00 PM', home: 'Lehi Lightning',       away: 'Logan Wolves',          homeScore: 7, awayScore: 2 },
        { date: '2025-06-12', time: '8:30 PM', home: 'Orem Outlaws',         away: 'Cedar City Crushers',   homeScore: 1, awayScore: 6 },
        { date: '2025-06-19', time: '7:00 PM', home: 'St. George Scorchers', away: 'Layton Lancers',        homeScore: 8, awayScore: 5 },
        { date: '2025-06-26', time: '7:00 PM', home: 'Provo Pucksters',      away: 'Ogden Ice Hawks',       homeScore: 3, awayScore: 3 },
        { date: '2025-07-03', time: '7:00 PM', home: 'Park City Blades',     away: 'Salt Lake Sliders',     homeScore: 2, awayScore: 9 },
      ],
    },
    "Winter '25": {
      current: true,
      schedule: [
        { date: '2025-12-03', time: '7:00 PM', home: 'Salt Lake Sliders',    away: 'Provo Pucksters',       homeScore: 6, awayScore: 4 },
        { date: '2025-12-03', time: '8:30 PM', home: 'Ogden Ice Hawks',      away: 'Park City Blades',      homeScore: 3, awayScore: 3 },
        { date: '2025-12-10', time: '7:00 PM', home: 'Provo Pucksters',      away: 'Ogden Ice Hawks',       homeScore: 5, awayScore: 2 },
        { date: '2025-12-10', time: '8:30 PM', home: 'Park City Blades',     away: 'Salt Lake Sliders',     homeScore: 1, awayScore: 7 },
        { date: '2025-12-17', time: '7:00 PM', home: 'Lehi Lightning',       away: 'Layton Lancers',        homeScore: null, awayScore: null },
        { date: '2025-12-17', time: '8:30 PM', home: 'Orem Outlaws',         away: 'Logan Wolves',          homeScore: null, awayScore: null },
        { date: '2025-12-24', time: '7:00 PM', home: 'St. George Scorchers', away: 'Cedar City Crushers',   homeScore: null, awayScore: null },
      ],
    },
  };

  const seasonNames = Object.keys(seasons);
  const currentSeasonName = seasonNames.find(k => seasons[k].current) || seasonNames[0];

  // ================================================================
  // TEAMS & ROSTERS
  // ================================================================
  const teams = [
    { id: 1,  name: 'Salt Lake Sliders' },
    { id: 2,  name: 'Provo Pucksters' },
    { id: 3,  name: 'Ogden Ice Hawks' },
    { id: 4,  name: 'Park City Blades' },
    { id: 5,  name: 'Lehi Lightning' },
    { id: 6,  name: 'Layton Lancers' },
    { id: 7,  name: 'Orem Outlaws' },
    { id: 8,  name: 'Logan Wolves' },
    { id: 9,  name: 'St. George Scorchers' },
    { id: 10, name: 'Cedar City Crushers' },
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
  // STATE
  // ================================================================
  const [activeTab, setActiveTab] = React.useState('home');
  const [selectedTeam, setSelectedTeam] = React.useState(null);
  const [selectedSeason, setSelectedSeason] = React.useState(currentSeasonName);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const viewedSeason = seasons[selectedSeason];
  const standings = calculateStandings(viewedSeason);

  function calculateStandings(seasonData) {
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
  }

  const getTeamByName = (name) => teams.find(t => t.name === name);

  // ================================================================
  // SEASON DROPDOWN – Click to open/close + click outside to close
  // ================================================================
  const SeasonDropdown = () => {
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-bold text-lg transition"
        >
          {selectedSeason}
          <ChevronDown size={20} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full mt-2 left-0 min-w-full bg-black bg-opacity-95 rounded-xl shadow-2xl overflow-hidden z-50 border border-white border-opacity-20">
            {seasonNames.map(season => (
              <button
                key={season}
                onClick={() => {
                  setSelectedSeason(season);
                  setDropdownOpen(false);
                }}
                className={`block w-full text-left px-6 py-3 hover:bg-white hover:bg-opacity-20 transition font-medium ${season === selectedSeason ? 'bg-blue-600' : ''}`}
              >
                {season} {seasons[season].current && '← Current'}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ================================================================
  // TEAM PAGE
  // ================================================================
  const TeamPage = () => {
    if (!selectedTeam) return null;
    const team = teams.find(t => t.id === selectedTeam);
    const teamGames = viewedSeason.schedule.filter(g => g.home === team.name || g.away === team.name);

    return (
      <div className="max-w-6xl mx-auto">
        <button onClick={() => { setSelectedTeam(null); setActiveTab('teams'); }}
          className="mb-8 text-blue-400 flex items-center gap-2 hover:text-white text-lg">
          <ChevronLeft size={24} /> Back
        </button>

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-black text-white">{team.name}</h1>
          <SeasonDropdown />
        </div>

        {/* Games Table */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Games – {selectedSeason}</h2>
          <div className="bg-white bg-opacity-10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-white bg-opacity-20">
                <tr>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-left">Opponent</th>
                  <th className="px-6 py-4 text-center">Result</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {teamGames.map((game, i) => {
                  const isHome = game.home === team.name;
                  const opponent = isHome ? game.away : game.home;
                  const played = game.homeScore !== null;
                  const won = played && ((isHome && game.homeScore > game.awayScore) || (!isHome && game.awayScore > game.homeScore));
                  const tied = played && game.homeScore === game.awayScore;

                  return (
                    <tr key={i} className="border-t border-white border-opacity-10">
                      <td className="px-6 py-5 text-gray-300">
                        {new Date(game.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {game.time}
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-white font-semibold cursor-pointer hover:text-blue-400"
                              onClick={() => setSelectedTeam(getTeamByName(opponent).id)}>
                          {opponent}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center text-2xl font-black text-yellow-400">
                        {played ? (isHome ? `${game.homeScore}–${game.awayScore}` : `${game.awayScore}–${game.homeScore}`) : '–'}
                      </td>
                      <td className="px-6 py-5 text-center">
                        {played ? (
                          won ? <span className="px-5 py-2 bg-green-600 rounded-lg font-bold">W</span> :
                          tied ? <span className="px-5 py-2 bg-gray-600 rounded-lg font-bold">T</span> :
                          <span className="px-5 py-2 bg-red-600 rounded-lg font-bold">L</span>
                        ) : (
                          <span className="px-5 py-2 bg-yellow-600 text-black rounded-lg font-bold">Upcoming</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Roster */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-6">Roster</h2>
          <div className="bg-white bg-opacity-10 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-white bg-opacity-20">
                <tr>
                  <th className="px-8 py-5 text-left text-lg">Player</th>
                  <th className="px-8 py-5 text-center text-lg">Position</th>
                </tr>
              </thead>
              <tbody>
                {(rosters[team.name] || []).map((player, i) => {
                  const isGoalie = player.includes('(G)');
                  return (
                    <tr key={i} className="border-t border-white border-opacity-10">
                      <td className="px-8 py-6 text-white text-lg font-medium">{player.replace(' (G)', '')}</td>
                      <td className="px-8 py-6 text-center">
                        {isGoalie ? <span className="px-6 py-2 bg-yellow-500 text-black rounded-full font-bold">GOALIE</span>
                                  : <span className="text-gray-400 italic">Skater</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ================================================================
  // MAIN PAGES
  // ================================================================
  const HomePage = () => (
    <div className="text-center py-32">
      <h1 className="text-7xl md:text-9xl font-black text-white mb-6">UIHL</h1>
      <p className="text-3xl md:text-4xl text-blue-300 mb-4">Utah Inline Hockey League</p>
      <p className="text-2xl text-yellow-400">{selectedSeason} • 10 Teams</p>
    </div>
  );

  const SchedulePage = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Schedule & Results</h1>
        <SeasonDropdown />
      </div>
      <div className="bg-white bg-opacity-10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white bg-opacity-20">
            <tr>
              <th className="px-6 py-4 text-left">Date & Time</th>
              <th className="px-6 py-4 text-left">Home</th>
              <th className="px-6 py-4 text-center">Score</th>
              <th className="px-6 py-4 text-left">Away</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {viewedSeason.schedule.map((game, i) => {
              const played = game.homeScore !== null;
              return (
                <tr key={i} className="border-t border-white border-opacity-10">
                  <td className="px-6 py-4 text-gray-300">
                    {new Date(game.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} • {game.time}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white cursor-pointer hover:text-blue-400"
                      onClick={() => { setSelectedTeam(getTeamByName(game.home).id); setActiveTab('teams'); }}>
                    {game.home}
                  </td>
                  <td className="px-6 py-4 text-center text-2xl font-black text-yellow-400">
                    {played ? `${game.homeScore}–${game.awayScore}` : '–'}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white cursor-pointer hover:text-blue-400"
                      onClick={() => { setSelectedTeam(getTeamByName(game.away).id); setActiveTab('teams'); }}>
                    {game.away}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {played ? <span className="px-4 py-2 bg-green-600 rounded-lg font-bold">FINAL</span>
                           : <span className="px-4 py-2 bg-yellow-600 text-black rounded-lg font-bold">UPCOMING</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const StandingsPage = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">League Standings</h1>
        <SeasonDropdown />
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
            </tr>
          </thead>
          <tbody>
            {standings.map((team, i) => (
              <tr key={team.id} className="border-t border-white border-opacity-10 hover:bg-white hover:bg-opacity-5 cursor-pointer"
                  onClick={() => { setSelectedTeam(team.id); setActiveTab('teams'); }}>
                <td className="px-6 py-4 text-xl font-bold text-yellow-400">{i + 1}</td>
                <td className="px-6 py-4 font-bold text-white text-lg hover:text-blue-400">{team.name}</td>
                <td className="px-6 py-4 text-center">{team.gp}</td>
                <td className="px-6 py-4 text-center"><span className="px-4 py-2 bg-green-600 rounded-lg font-bold">{team.wins}</span></td>
                <td className="px-6 py-4 text-center"><span className="px-4 py-2 bg-red-600 rounded-lg font-bold">{team.losses}</span></td>
                <td className="px-6 py-4 text-center"><span className="px-4 py-2 bg-gray-600 rounded-lg font-bold">{team.ties}</span></td>
                <td className="px-6 py-4 text-center"><span className="px-5 py-3 bg-yellow-500 text-black font-black text-xl rounded-lg">{team.points}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const TeamsListPage = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-white">All Teams</h1>
        <SeasonDropdown />
      </div>
      <div className="bg-white bg-opacity-10 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white bg-opacity-20">
            <tr>
              <th className="px-8 py-5 text-left">#</th>
              <th className="px-8 py-5 text-left text-lg">Team Name</th>
              <th className="px-8 py-5 text-center">View</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, i) => (
              <tr key={team.id} className="border-t border-white border-opacity-10 hover:bg-white hover:bg-opacity-5 cursor-pointer"
                  onClick={() => setSelectedTeam(team.id)}>
                <td className="px-8 py-6 text-yellow-400 font-bold text-xl">{i + 1}</td>
                <td className="px-8 py-6 text-white text-xl font-semibold hover:text-blue-400">{team.name}</td>
                <td className="px-8 py-6 text-center">
                  <span className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition">View Team</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // ================================================================
  // RENDER
  // ================================================================
  return (
<header className="bg-black bg-opacity-60 backdrop-blur-lg sticky top-0 z-50 border-b border-white border-opacity-10">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    <div className="flex items-center gap-4">
      {/* YOUR REAL UIHL LOGO */}
      <img 
        src="/uihl-logo.png" 
        alt="UIHL" 
        className="h-12 md:h-16 lg:h-20 object-contain drop-shadow-2xl"
      />
      <div className="text-3xl md:text-5xl font-black hidden lg:block">UIHL</div>
    </div>
    <div className="text-xl md:text-2xl font-bold text-yellow-400">{selectedSeason}</div>
  </div>
</header>

      <nav className="bg-black bg-opacity-50 backdrop-blur border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-3">
            {[
              { id: 'home',      label: 'Home',      icon: Home },
              { id: 'schedule',  label: 'Schedule',  icon: Calendar },
              { id: 'standings', label: 'Standings', icon: Trophy },
              { id: 'teams',     label: 'Teams',     icon: Users },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedTeam(null); setDropdownOpen(false); }}
                className={`flex items-center gap-3 px-8 py-4 rounded-t-xl font-bold text-lg transition ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <tab.icon size={24} />
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
        {activeTab === 'teams' && (selectedTeam ? <TeamPage /> : <TeamsListPage />)}
      </main>
    </div>
  );
}
