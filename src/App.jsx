import React from 'react';
import { Calendar, Trophy, Users, Home, ChevronLeft, ChevronDown } from 'lucide-react';

export default function App() {
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

  const teams = [
    { id: 1, name: 'Salt Lake Sliders' }, { id: 2, name: 'Provo Pucksters' },
    { id: 3, name: 'Ogden Ice Hawks' },   { id: 4, name: 'Park City Blades' },
    { id: 5, name: 'Lehi Lightning' },    { id: 6, name: 'Layton Lancers' },
    { id: 7, name: 'Orem Outlaws' },      { id: 8, name: 'Logan Wolves' },
    { id: 9, name: 'St. George Scorchers' }, { id: 10, name: 'Cedar City Crushers' },
  ];

  const rosters = {
    'Salt Lake Sliders': ['Jake Thompson', 'Mike Rivera', 'Alex Chen', 'Sarah Kim', 'Tyler Brooks (G)'],
    'Provo Pucksters': ['Connor Davis', 'Liam Wright', 'Noah Patel', 'Emma Johnson', 'Carter Hayes (G)'],
    'Ogden Ice Hawks': ['Mason Lee', 'Ethan Clark', 'Lucas Young', 'Ava Martinez', 'Owen Reed (G)'],
    'Park City Blades': ['Caleb Hill', 'Ryan King', 'Dylan Scott', 'Mia Lopez', 'Gavin Ward (G)'],
    'Lehi Lightning': ['Hunter Bell', 'Jordan Gray', 'Blake Adams', 'Zoe Nelson', 'Cole Foster (G)'],
    'Layton Lancers': ['Bryce Turner', 'Eli Russell', 'Kayla Perez', 'Nate Coleman', 'Drew Murphy (G)'],
    'Orem Outlaws': ['Tanner Cook', 'Jace Evans', 'Lilly Flores', 'Brady Long', 'Grant Price (G)'],
    'Logan Wolves': ['Kaden Ross', 'Seth Bailey', 'Grace Howard', 'Wyatt Cox', 'Ian Fletcher (G)'],
    'St. George Scorchers': ['Jett Ortiz', 'Knox Rivera', 'Hazel Diaz', 'Milo Grant', 'Beckett Shaw (G)'],
    'Cedar City Crushers': ['Rhett Vargas', 'Soren Hale', 'Luna Rose', 'Tate Beck', 'Knox Pierce (G)'],
  };

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
      if (game.homeScore > game.awayScore) { stats.get(game.home).wins++; stats.get(game.away).losses++; stats.get(game.home).last.push('W'); stats.get(game.away).last.push('L'); }
      else if (game.homeScore < game.awayScore) { stats.get(game.home).losses++; stats.get(game.away).wins++; stats.get(game.home).last.push('L'); stats.get(game.away).last.push('W'); }
      else { stats.get(game.home).ties++; stats.get(game.away).ties++; stats.get(game.home).last.push('T'); stats.get(game.away).last.push('T'); }
    });
    return teams.map(team => {
      const s = stats.get(team.name);
      const points = s.wins * 2 + s.ties;
      return { ...team, wins: s.wins, losses: s.losses, ties: s.ties, points, gp: s.wins + s.losses + s.ties };
    }).sort((a, b) => b.points - a.points || b.wins - a.wins);
  }

  const getTeamByName = (name) => teams.find(t => t.name === name);

  const SeasonDropdown = () => {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const handle = (e) => { if (ref.current && !ref.current.contains(e.target)) setDropdownOpen(false); };
      document.addEventListener('mousedown', handle);
      return () => document.removeEventListener('mousedown', handle);
    }, []);
    return (
      <div ref={ref} className="relative">
        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl font-bold transition">
          {selectedSeason}
          <ChevronDown size={20} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        {dropdownOpen && (
          <div className="absolute top-full mt-2 left-0 w-full bg-black bg-opacity-95 rounded-xl shadow-2xl border border-white border-opacity-20 z-50">
            {seasonNames.map(season => (
              <button key={season} onClick={() => { setSelectedSeason(season); setDropdownOpen(false); }}
                className={`block w-full text-left px-6 py-3 hover:bg-white hover:bg-opacity-20 ${season === selectedSeason ? 'bg-blue-600' : ''}`}>
                {season} {seasons[season].current && '← Current'}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const TeamPage = () => { /* ... same as before – unchanged ... */ };
  const HomePage = () => ( /* ... unchanged ... */ );
  const SchedulePage = () => ( /* ... unchanged ... */ );
  const StandingsPage = () => ( /* ... unchanged ... */ );
  const TeamsListPage = () => ( /* ... unchanged ... */ );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white">
      {/* FIXED HEADER WITH YOUR REAL LOGO */}
      <header className="bg-black bg-opacity-60 backdrop-blur-lg sticky top-0 z-50 border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/uihl-logo.png" alt="UIHL" className="h-12 md:h-16 lg:h-20 object-contain drop-shadow-2xl" />
            <div className="text-3xl md:text-5xl font-black hidden lg:block">UIHL</div>
          </div>
          <div className="text-xl md:text-2xl font-bold text-yellow-400">{selectedSeason}</div>
        </div>
      </header>

      <nav className="bg-black bg-opacity-50 backdrop-blur border-b border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-3">
            {[{id:'home',label:'Home',icon:Home},{id:'schedule',label:'Schedule',icon:Calendar},{id:'standings',label:'Standings',icon:Trophy},{id:'teams',label:'Teams',icon:Users}].map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSelectedTeam(null); setDropdownOpen(false); }}
                className={`flex items-center gap-3 px-8 py-4 rounded-t-xl font-bold text-lg transition ${activeTab===tab.id?'bg-blue-600 text-white':'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'}`}>
                <tab.icon size={24} /> {tab.label}
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
