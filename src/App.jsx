import React from 'react';
import { Calendar, Trophy, Users, Home, ChevronLeft, ChevronDown } from 'lucide-react';

export default function App() {
  const seasons = {
    "Summer '25": {
      current: false,
      schedule: [
        { date: '2025-06-05', time: '7:00 PM', home: 'Salt Lake Sliders', away: 'Provo Pucksters', homeScore: 5, awayScore: 3 },
        { date: '2025-06-05', time: '8:30 PM', home: 'Ogden Ice Hawks', away: 'Park City Blades', homeScore: 4, awayScore: 4 },
        { date: '2025-06-12', time: '7:00 PM', home: 'Lehi Lightning', away: 'Logan Wolves', homeScore: 7, awayScore: 2 },
        { date: '2025-06-12', time: '8:30 PM', home: 'Orem Outlaws', away: 'Cedar City Crushers', homeScore: 1, awayScore: 6 },
        { date: '2025-06-19', time: '7:00 PM', home: 'St. George Scorchers', away: 'Layton Lancers', homeScore: 8, awayScore: 5 },
        { date: '2025-06-26', time: '7:00 PM', home: 'Provo Pucksters', away: 'Ogden Ice Hawks', homeScore: 3, awayScore: 3 },
        { date: '2025-07-03', time: '7:00 PM', home: 'Park City Blades', away: 'Salt Lake Sliders', homeScore: 2, awayScore: 9 },
      ],
    },
    "Winter '25": {
      current: true,
      schedule: [
        { date: '2025-12-03', time: '7:00 PM', home: 'Salt Lake Sliders', away: 'Provo Pucksters', homeScore: 6, awayScore: 4 },
        { date: '2025-12-03', time: '8:30 PM', home: 'Ogden Ice Hawks', away: 'Park City Blades', homeScore: 3, awayScore: 3 },
        { date: '2025-12-10', time: '7:00 PM', home: 'Provo Pucksters', away: 'Ogden Ice Hawks', homeScore: 5, awayScore: 2 },
        { date: '2025-12-10', time: '8:30 PM', home: 'Park City Blades', away: 'Salt Lake Sliders', homeScore: 1, awayScore: 7 },
        { date: '2025-12-17', time: '7:00 PM', home: 'Lehi Lightning', away: 'Layton Lancers', homeScore: null, awayScore: null },
        { date: '2025-12-17', time: '8:30 PM', home: 'Orem Outlaws', away: 'Logan Wolves', homeScore: null, awayScore: null },
        { date: '2025-12-24', time: '7:00 PM', home: 'St. George Scorchers', away: 'Cedar City Crushers', homeScore: null, awayScore: null },
      ],
    },
  };

  const seasonNames = Object.keys(seasons);
  const currentSeasonName = seasonNames.find(k => seasons[k].current) || seasonNames[0];

  const teams = [
    { id: 1, name: 'Salt Lake Sliders' }, { id: 2, name: 'Provo Pucksters' },
    { id: 3, name: 'Ogden Ice Hawks' }, { id: 4, name: 'Park City Blades' },
    { id: 5, name: 'Lehi Lightning' }, { id: 6, name: 'Layton Lancers' },
    { id: 7, name: 'Orem Outlaws' }, { id: 8, name: 'Logan Wolves' },
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

  const calculateStandings = (data) => {
    const stats = new Map();
    teams.forEach(t => stats.set(t.name, { w: 0, l: 0, t: 0 }));
    data.schedule.forEach(g => {
      if (g.homeScore === null) return;
      if (g.homeScore > g.awayScore) { stats.get(g.home).w++; stats.get(g.away).l++; }
      else if (g.homeScore < g.awayScore) { stats.get(g.home).l++; stats.get(g.away).w++; }
      else { stats.get(g.home).t++; stats.get(g.away).t++; }
    });
    return teams.map(t => {
      const s = stats.get(t.name);
      return { ...t, w: s.w, l: s.l, t: s.t, pts: s.w * 2 + s.t, gp: s.w + s.l + s.t };
    }).sort((a, b) => b.pts - a.pts || b.w - a.w);
  };

  const standings = calculateStandings(viewedSeason);
  const getTeamByName = n => teams.find(t => t.name === n);

  const SeasonDropdown = () => {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const close = e => { if (ref.current && !ref.current.contains(e.target)) setDropdownOpen(false); };
      document.addEventListener('mousedown', close);
      return () => document.removeEventListener('mousedown', close);
    }, []);
    return (
      <div ref={ref} className="relative">
        <button onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-bold text-sm md:text-base transition">
          {selectedSeason}
          <ChevronDown size={18} className={`transition ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        {dropdownOpen && (
          <div className="absolute top-full mt-2 left-0 right-0 bg-black/95 rounded-lg shadow-2xl border border-white/20 z-50">
            {seasonNames.map(s => (
              <button key={s} onClick={() => { setSelectedSeason(s); setDropdownOpen(false); }}
                className={`block w-full text-left px-5 py-3 hover:bg-white/20 text-sm md:text-base ${s === selectedSeason ? 'bg-blue-600' : ''}`}>
                {s} {seasons[s].current && 'Current'}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const TeamPage = () => {
    if (!selectedTeam) return null;
    const team = teams.find(t => t.id === selectedTeam);
    const teamGames = viewedSeason.schedule.filter(g => g.home === team.name || g.away === team.name);

    return (
      <div className="max-w-4xl mx-auto">
        <button onClick={() => { setSelectedTeam(null); setActiveTab('teams'); }}
          className="mb-6 text-blue-400 flex items-center gap-2 text-lg">
          <ChevronLeft size={24} /> Back
        </button>
        <div className="flex justify-between items-start mb-8 flex-col sm:flex-row gap-4">
          <h1 className="text-4xl md:text-5xl font-black">{team.name}</h1>
          <SeasonDropdown />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Games – {selectedSeason}</h2>
            <div className="bg-white/10 rounded-xl overflow-hidden">
              <div className="grid grid-cols-1 gap-3 p-4">
                {teamGames.map((g, i) => {
                  const isHome = g.home === team.name;
                  const opp = isHome ? g.away : g.home;
                  const played = g.homeScore !== null;
                  const won = played && ((isHome && g.homeScore > g.awayScore) || (!isHome && g.awayScore > g.homeScore));
                  const tied = played && g.homeScore === g.awayScore;
                  return (
                    <div key={i} className="bg-black/30 rounded-lg p-4 text-sm">
                      <div className="flex justify-between items-center">
                        <div className="text-gray-400">{new Date(g.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {g.time}</div>
                        <div className={`font-bold ${won ? 'text-green-400' : tied ? 'text-gray-400' : played ? 'text-red-400' : 'text-yellow-400'}`}>
                          {played ? (won ? 'W' : tied ? 'T' : 'L') : 'Upcoming'}
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="cursor-pointer hover:text-blue-400" onClick={() => setSelectedTeam(getTeamByName(opp).id)}>{opp}</span>
                        <span className="text-xl font-black text-yellow-400">
                          {played ? (isHome ? `${g.homeScore}–${g.awayScore}` : `${g.awayScore}–${g.homeScore}`) : '–'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Roster</h2>
            <div className="bg-white/10 rounded-xl p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(rosters[team.name] || []).map((p, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="font-medium">{p.replace(' (G)', '')}</span>
                    {p.includes('(G)') && <span className="px-3 py-1 bg-yellow-500 text-black text-xs rounded-full font-bold">GOALIE</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HomePage = () => (
    <div className="text-center py-24 md:py-32">
      <h1 className="text-6xl md:text-9xl font-black mb-4">UIHL</h1>
      <p className="text-2xl md:text-4xl text-blue-300 mb-3">Utah Inline Hockey League</p>
      <p className="text-xl md:text-2xl text-yellow-400">{selectedSeason} • 10 Teams</p>
    </div>
  );

  const SchedulePage = () => (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">Schedule & Results</h1>
        <SeasonDropdown />
      </div>
      <div className="space-y-4">
        {viewedSeason.schedule.map((g, i) => {
          const played = g.homeScore !== null;
          return (
            <div key={i} className="bg-white/10 rounded-xl p-5">
              <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                <span>{new Date(g.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                <span>{g.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold cursor-pointer hover:text-blue-400" onClick={() => { setSelectedTeam(getTeamByName(g.home).id); setActiveTab('teams'); }}>{g.home}</span>
                <span className="text-2xl font-black text-yellow-400 mx-4">{played ? `${g.homeScore}–${g.awayScore}` : 'vs'}</span>
                <span className="font-bold cursor-pointer hover:text-blue-400" onClick={() => { setSelectedTeam(getTeamByName(g.away).id); setActiveTab('teams'); }}>{g.away}</span>
              </div>
              {played && <div className="text-center mt-2"><span className="px-4 py-1 bg-green-600 rounded-full text-sm font-bold">FINAL</span></div>}
            </div>
          );
        })}
      </div>
    </div>
  );

  const StandingsPage = () => (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">League Standings</h1>
        <SeasonDropdown />
      </div>
      <div className="bg-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/20">
            <tr>
              <th className="px-4 py-3 text-left text-sm">#</th>
              <th className="px-4 py-3 text-left">Team</th>
              <th className="px-4 py-3 text-center text-sm">GP</th>
              <th className="px-4 py-3 text-center text-sm">W</th>
              <th className="px-4 py-3 text-center text-sm">L</th>
              <th className="px-4 py-3 text-center text-sm">T</th>
              <th className="px-4 py-3 text-center text-sm">PTS</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((t, i) => (
              <tr key={t.id} className="border-t border-white/10 cursor-pointer hover:bg-white/5" onClick={() => { setSelectedTeam(t.id); setActiveTab('teams'); }}>
                <td className="px-4 py-4 font-bold text-yellow-400">{i + 1}</td>
                <td className="px-4 py-4 font-bold">{t.name}</td>
                <td className="px-4 py-4 text-center">{t.gp}</td>
                <td className="px-4 py-4 text-center"><span className="px-3 py-1 bg-green-600 rounded">{t.w}</span></td>
                <td className="px-4 py-4 text-center"><span className="px-3 py-1 bg-red-600 rounded">{t.l}</span></td>
                <td className="px-4 py-4 text-center"><span className="px-3 py-1 bg-gray-600 rounded">{t.t}</span></td>
                <td className="px-4 py-4 text-center"><span className="px-4 py-2 bg-yellow-500 text-black font-black rounded">{t.pts}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const TeamsListPage = () => (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">All Teams</h1>
        <SeasonDropdown />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teams.map((t, i) => (
          <button key={t.id} onClick={() => setSelectedTeam(t.id)}
            className="bg-white/10 hover:bg-white/20 rounded-xl p-6 text-left transition">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-black">{t.name}</div>
                <div className="text-gray-400 text-sm">Team #{i + 1}</div>
              </div>
              <span className="text-3xl">View</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* SUBTLE LOGO BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <img src="/uihl-logo.png" alt="" className="w-full h-full object-cover object-center" />
      </div>
      <div className="fixed inset-0 bg-gradient-to-br from-black via-blue-950/90 to-black z-0" />

      <div className="relative z-10">
        <header className="bg-black/70 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/uihl-logo.png" alt="UIHL" className="h-10 md:h-14 object-contain drop-shadow-2xl" />
              <span className="text-2xl md:text-4xl font-black hidden sm:block">UIHL</span>
            </div>
            <div className="text-lg md:text-2xl font-bold text-yellow-400">{selectedSeason}</div>
          </div>
        </header>

        <nav className="bg-black/60 backdrop-blur border-b border-white/10 sticky top-16 z-30">
          <div className="flex gap-2 overflow-x-auto px-3 py-3 scrollbar-hide">
            {[{id:'home',label:'Home',icon:Home},{id:'schedule',label:'Schedule',icon:Calendar},{id:'standings',label:'Standings',icon:Trophy},{id:'teams',label:'Teams',icon:Users}].map(t => (
              <button key={t.id} onClick={() => { setActiveTab(t.id); setSelectedTeam(null); setDropdownOpen(false); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm whitespace-nowrap transition ${activeTab===t.id?'bg-blue-600':'text-gray-300 hover:bg-white/10'}`}>
                <t.icon size={20} /> {t.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'schedule' && <SchedulePage />}
          {activeTab === 'standings' && <StandingsPage />}
          {activeTab === 'teams' && (selectedTeam ? <TeamPage /> : <TeamsListPage />)}
        </main>
      </div>
    </div>
  );
}
