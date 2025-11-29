import React from 'react';
import { Calendar, Trophy, Users, Home, ChevronLeft, ChevronDown, Mail, Phone, MapPin } from 'lucide-react';

// Constants
const POINTS_PER_WIN = 2;
const POINTS_PER_TIE = 1;

// Navigation configuration
const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'standings', label: 'Standings', icon: Trophy },
  { id: 'teams', label: 'Teams', icon: Users },
  { id: 'contact', label: 'Contact', icon: Mail }
];

export default function App() {
  const seasons = {
    "Summer '25": {
      current: false,
      schedule: [
        { date: '2025-06-03', time: '8:00 PM', home: 'Salt Lake Sliders', away: 'Provo Pucksters', homeScore: 5, awayScore: 3 },
        { date: '2025-06-03', time: '8:50 PM', home: 'Ogden Ice Hawks', away: 'Park City Blades', homeScore: 4, awayScore: 4 },
        { date: '2025-06-03', time: '9:40 PM', home: 'Lehi Lightning', away: 'Logan Wolves', homeScore: 7, awayScore: 2 },
        { date: '2025-06-03', time: '10:20 PM', home: 'Orem Outlaws', away: 'Cedar City Crushers', homeScore: 1, awayScore: 6 },
        { date: '2025-06-10', time: '8:00 PM', home: 'St. George Scorchers', away: 'Layton Lancers', homeScore: 8, awayScore: 5 },
        { date: '2025-06-10', time: '8:50 PM', home: 'Provo Pucksters', away: 'Ogden Ice Hawks', homeScore: 3, awayScore: 3 },
        { date: '2025-06-10', time: '9:40 PM', home: 'Park City Blades', away: 'Salt Lake Sliders', homeScore: 2, awayScore: 9 },
        { date: '2025-06-10', time: '10:20 PM', home: 'Cedar City Crushers', away: 'Lehi Lightning', homeScore: 4, awayScore: 5 },
      ],
    },
    "Winter '25": {
      current: true,
      schedule: [
        // December 2, 2025 (Tuesday)
        { date: '2025-12-02', time: '8:00 PM', home: 'Salt Lake Sliders', away: 'Provo Pucksters', homeScore: 6, awayScore: 4 },
        { date: '2025-12-02', time: '8:50 PM', home: 'Ogden Ice Hawks', away: 'Park City Blades', homeScore: 3, awayScore: 3 },
        { date: '2025-12-02', time: '9:40 PM', home: 'Lehi Lightning', away: 'Layton Lancers', homeScore: 5, awayScore: 2 },
        { date: '2025-12-02', time: '10:20 PM', home: 'Orem Outlaws', away: 'Logan Wolves', homeScore: 4, awayScore: 3 },
        // December 9, 2025 (Tuesday)
        { date: '2025-12-09', time: '8:00 PM', home: 'St. George Scorchers', away: 'Cedar City Crushers', homeScore: null, awayScore: null },
        { date: '2025-12-09', time: '8:50 PM', home: 'Provo Pucksters', away: 'Ogden Ice Hawks', homeScore: null, awayScore: null },
        { date: '2025-12-09', time: '9:40 PM', home: 'Park City Blades', away: 'Salt Lake Sliders', homeScore: null, awayScore: null },
        { date: '2025-12-09', time: '10:20 PM', home: 'Layton Lancers', away: 'Orem Outlaws', homeScore: null, awayScore: null },
        // December 16, 2025 (Tuesday)
        { date: '2025-12-16', time: '8:00 PM', home: 'Logan Wolves', away: 'Lehi Lightning', homeScore: null, awayScore: null },
        { date: '2025-12-16', time: '8:50 PM', home: 'Cedar City Crushers', away: 'St. George Scorchers', homeScore: null, awayScore: null },
        { date: '2025-12-16', time: '9:40 PM', home: 'Salt Lake Sliders', away: 'Ogden Ice Hawks', homeScore: null, awayScore: null },
        { date: '2025-12-16', time: '10:20 PM', home: 'Provo Pucksters', away: 'Park City Blades', homeScore: null, awayScore: null },
        // December 23, 2025 (Tuesday)
        { date: '2025-12-23', time: '8:00 PM', home: 'Orem Outlaws', away: 'Logan Wolves', homeScore: null, awayScore: null },
        { date: '2025-12-23', time: '8:50 PM', home: 'Layton Lancers', away: 'Lehi Lightning', homeScore: null, awayScore: null },
        { date: '2025-12-23', time: '9:40 PM', home: 'Ogden Ice Hawks', away: 'Salt Lake Sliders', homeScore: null, awayScore: null },
        { date: '2025-12-23', time: '10:20 PM', home: 'Park City Blades', away: 'Provo Pucksters', homeScore: null, awayScore: null },
        // December 30, 2025 (Tuesday)
        { date: '2025-12-30', time: '8:00 PM', home: 'St. George Scorchers', away: 'Cedar City Crushers', homeScore: null, awayScore: null },
        { date: '2025-12-30', time: '8:50 PM', home: 'Lehi Lightning', away: 'Orem Outlaws', homeScore: null, awayScore: null },
        { date: '2025-12-30', time: '9:40 PM', home: 'Salt Lake Sliders', away: 'Park City Blades', homeScore: null, awayScore: null },
        { date: '2025-12-30', time: '10:20 PM', home: 'Provo Pucksters', away: 'Ogden Ice Hawks', homeScore: null, awayScore: null },
        // January 6, 2026 (Tuesday)
        { date: '2026-01-06', time: '8:00 PM', home: 'Logan Wolves', away: 'Layton Lancers', homeScore: null, awayScore: null },
        { date: '2026-01-06', time: '8:50 PM', home: 'Cedar City Crushers', away: 'St. George Scorchers', homeScore: null, awayScore: null },
        { date: '2026-01-06', time: '9:40 PM', home: 'Park City Blades', away: 'Ogden Ice Hawks', homeScore: null, awayScore: null },
        { date: '2026-01-06', time: '10:20 PM', home: 'Salt Lake Sliders', away: 'Provo Pucksters', homeScore: null, awayScore: null },
        // January 13, 2026 (Tuesday)
        { date: '2026-01-13', time: '8:00 PM', home: 'Lehi Lightning', away: 'Logan Wolves', homeScore: null, awayScore: null },
        { date: '2026-01-13', time: '8:50 PM', home: 'Orem Outlaws', away: 'Layton Lancers', homeScore: null, awayScore: null },
        { date: '2026-01-13', time: '9:40 PM', home: 'Ogden Ice Hawks', away: 'Provo Pucksters', homeScore: null, awayScore: null },
        { date: '2026-01-13', time: '10:20 PM', home: 'Park City Blades', away: 'Salt Lake Sliders', homeScore: null, awayScore: null },
        // January 20, 2026 (Tuesday)
        { date: '2026-01-20', time: '8:00 PM', home: 'St. George Scorchers', away: 'Cedar City Crushers', homeScore: null, awayScore: null },
        { date: '2026-01-20', time: '8:50 PM', home: 'Layton Lancers', away: 'Lehi Lightning', homeScore: null, awayScore: null },
        { date: '2026-01-20', time: '9:40 PM', home: 'Provo Pucksters', away: 'Salt Lake Sliders', homeScore: null, awayScore: null },
        { date: '2026-01-20', time: '10:20 PM', home: 'Ogden Ice Hawks', away: 'Park City Blades', homeScore: null, awayScore: null },
      ],
    },
  };

  const seasonNames = Object.keys(seasons);
  const currentSeasonName = seasonNames.find(key => seasons[key].current) || seasonNames[0];

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

  const calculateStandings = React.useCallback((data) => {
    const stats = {};
    teams.forEach(team => {
      stats[team.name] = { w: 0, l: 0, t: 0, gf: 0, ga: 0 };
    });
    
    data.schedule.forEach(game => {
      if (game.homeScore === null) return;
      
      const homeStats = stats[game.home];
      const awayStats = stats[game.away];
      
      homeStats.gf += game.homeScore;
      homeStats.ga += game.awayScore;
      awayStats.gf += game.awayScore;
      awayStats.ga += game.homeScore;
      
      if (game.homeScore > game.awayScore) {
        homeStats.w++;
        awayStats.l++;
      } else if (game.homeScore < game.awayScore) {
        homeStats.l++;
        awayStats.w++;
      } else {
        homeStats.t++;
        awayStats.t++;
      }
    });
    
    return teams.map(team => {
      const s = stats[team.name];
      return {
        ...team,
        w: s.w,
        l: s.l,
        t: s.t,
        gf: s.gf,
        ga: s.ga,
        gd: s.gf - s.ga,
        pts: s.w * POINTS_PER_WIN + s.t * POINTS_PER_TIE,
        gp: s.w + s.l + s.t
      };
    }).sort((a, b) => b.pts - a.pts || b.w - a.w || b.gd - a.gd);
  }, [teams]);

  const standings = React.useMemo(() => calculateStandings(viewedSeason), [viewedSeason, calculateStandings]);
  const getTeamByName = React.useCallback(teamName => teams.find(team => team.name === teamName), [teams]);

  const SeasonDropdown = () => {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const close = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener('mousedown', close);
      return () => document.removeEventListener('mousedown', close);
    }, []);
    
    return (
      <div ref={ref} className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setDropdownOpen(!dropdownOpen);
            }
          }}
          aria-label="Select season"
          aria-expanded={dropdownOpen}
          className="flex items-center gap-2 px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-bold text-sm md:text-base transition"
        >
          {selectedSeason}
          <ChevronDown size={18} className={`transition ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        {dropdownOpen && (
          <div className="absolute top-full mt-2 left-0 right-0 bg-black/95 rounded-lg shadow-2xl border border-white/20 z-50">
            {seasonNames.map(season => (
              <button
                key={season}
                onClick={() => {
                  setSelectedSeason(season);
                  setDropdownOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedSeason(season);
                    setDropdownOpen(false);
                  }
                }}
                className={`block w-full text-left px-5 py-3 hover:bg-white/20 text-sm md:text-base ${
                  season === selectedSeason ? 'bg-blue-600' : ''
                }`}
              >
                {season} {seasons[season].current && '(Current)'}
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
    if (!team) {
      return (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">Team not found</p>
        </div>
      );
    }
    
    const teamGames = viewedSeason.schedule.filter(game => 
      game.home === team.name || game.away === team.name
    );

    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => {
            setSelectedTeam(null);
            setActiveTab('teams');
          }}
          className="mb-6 text-blue-400 flex items-center gap-2 text-lg hover:text-blue-300 transition"
        >
          <ChevronLeft size={24} /> Back to Teams
        </button>
        <div className="flex justify-between items-start mb-8 flex-col sm:flex-row gap-4">
          <h1 className="text-4xl md:text-5xl font-black">{team.name}</h1>
          <SeasonDropdown />
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Games – {selectedSeason}</h2>
            {teamGames.length === 0 ? (
              <div className="bg-white/10 rounded-xl p-8 text-center">
                <p className="text-gray-400">No games scheduled for this season</p>
              </div>
            ) : (
              <div className="bg-white/10 rounded-xl overflow-hidden">
                <div className="grid grid-cols-1 gap-3 p-4">
                  {teamGames.map((game, index) => {
                    const isHome = game.home === team.name;
                    const opponent = isHome ? game.away : game.home;
                    const played = game.homeScore !== null;
                    const teamScore = isHome ? game.homeScore : game.awayScore;
                    const oppScore = isHome ? game.awayScore : game.homeScore;
                    const won = played && teamScore > oppScore;
                    const tied = played && teamScore === oppScore;
                    
                    return (
                      <div key={index} className="bg-black/30 rounded-lg p-4 text-sm">
                        <div className="flex justify-between items-center">
                          <div className="text-gray-400">
                            {new Date(game.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })} • {game.time}
                          </div>
                          <div
                            className={`font-bold ${
                              won
                                ? 'text-green-400'
                                : tied
                                ? 'text-gray-400'
                                : played
                                ? 'text-red-400'
                                : 'text-yellow-400'
                            }`}
                          >
                            {played ? (won ? 'W' : tied ? 'T' : 'L') : 'Upcoming'}
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span
                            className="cursor-pointer hover:text-blue-400 transition"
                            onClick={() => {
                              const oppTeam = getTeamByName(opponent);
                              if (oppTeam) setSelectedTeam(oppTeam.id);
                            }}
                          >
                            {isHome ? 'vs' : '@'} {opponent}
                          </span>
                          <span className="text-xl font-black text-yellow-400">
                            {played ? `${teamScore}–${oppScore}` : '–'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Roster</h2>
            <div className="bg-white/10 rounded-xl p-6">
              {!rosters[team.name] || rosters[team.name].length === 0 ? (
                <p className="text-gray-400 text-center">Roster not available</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rosters[team.name].map((player, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{player.replace(' (G)', '')}</span>
                      {player.includes('(G)') && (
                        <span className="px-3 py-1 bg-yellow-500 text-black text-xs rounded-full font-bold">
                          GOALIE
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
      {viewedSeason.schedule.length === 0 ? (
        <div className="bg-white/10 rounded-xl p-8 text-center">
          <p className="text-gray-400">No games scheduled for this season</p>
        </div>
      ) : (
        <div className="space-y-4">
          {viewedSeason.schedule.map((game, index) => {
            const played = game.homeScore !== null;
            return (
              <div key={index} className="bg-white/10 rounded-xl p-5">
                <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                  <span>
                    {new Date(game.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span>{game.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className="font-bold cursor-pointer hover:text-blue-400 transition"
                    onClick={() => {
                      const team = getTeamByName(game.home);
                      if (team) {
                        setSelectedTeam(team.id);
                        setActiveTab('teams');
                      }
                    }}
                  >
                    {game.home}
                  </span>
                  <span className="text-2xl font-black text-yellow-400 mx-4">
                    {played ? `${game.homeScore}–${game.awayScore}` : 'vs'}
                  </span>
                  <span
                    className="font-bold cursor-pointer hover:text-blue-400 transition"
                    onClick={() => {
                      const team = getTeamByName(game.away);
                      if (team) {
                        setSelectedTeam(team.id);
                        setActiveTab('teams');
                      }
                    }}
                  >
                    {game.away}
                  </span>
                </div>
                {played && (
                  <div className="text-center mt-2">
                    <span className="px-4 py-1 bg-green-600 rounded-full text-sm font-bold">
                      FINAL
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const StandingsPage = () => (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 flex-col sm:flex-row gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">League Standings</h1>
        <SeasonDropdown />
      </div>
      <div className="bg-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/20">
              <tr>
                <th className="px-4 py-3 text-left text-sm">#</th>
                <th className="px-4 py-3 text-left">Team</th>
                <th className="px-4 py-3 text-center text-sm" title="Games Played">GP</th>
                <th className="px-4 py-3 text-center text-sm" title="Wins">W</th>
                <th className="px-4 py-3 text-center text-sm" title="Losses">L</th>
                <th className="px-4 py-3 text-center text-sm" title="Ties">T</th>
                <th className="px-4 py-3 text-center text-sm" title="Points">PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((team, index) => (
                <tr
                  key={team.id}
                  className="border-t border-white/10 cursor-pointer hover:bg-white/5 transition"
                  onClick={() => {
                    setSelectedTeam(team.id);
                    setActiveTab('teams');
                  }}
                >
                  <td className="px-4 py-4 font-bold text-yellow-400">{index + 1}</td>
                  <td className="px-4 py-4 font-bold">{team.name}</td>
                  <td className="px-4 py-4 text-center">{team.gp}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="px-3 py-1 bg-green-600 rounded">{team.w}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="px-3 py-1 bg-red-600 rounded">{team.l}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="px-3 py-1 bg-gray-600 rounded">{team.t}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="px-4 py-2 bg-yellow-500 text-black font-black rounded">
                      {team.pts}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        {teams.map((team, index) => (
          <button
            key={team.id}
            onClick={() => setSelectedTeam(team.id)}
            className="bg-white/10 hover:bg-white/20 rounded-xl p-6 text-left transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-2xl font-black">{team.name}</div>
                <div className="text-gray-400 text-sm">Team #{index + 1}</div>
              </div>
              <span className="text-3xl">→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Contact Us</h1>
      <div className="bg-white/10 rounded-xl p-8 space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-blue-300">League Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Address</h3>
                <p className="text-gray-300">550 N 200 W</p>
                <p className="text-gray-300">Bountiful, UT 84010</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <a 
                  href="mailto:info@uihl.org" 
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  info@uihl.org
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Phone</h3>
                <a 
                  href="tel:+18015551234" 
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  (801) 555-1234
                </a>
              </div>
            </div>
          </div>
        </div>

                  <div className="border-t border-white/20 pt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-300">League Hours</h2>
          <div className="space-y-2 text-gray-300">
            <p><span className="font-bold">Office Hours:</span> Monday - Friday, 9:00 AM - 5:00 PM</p>
            <p><span className="font-bold">Game Nights:</span> Every Tuesday</p>
            <p className="ml-4">• 8:00 PM</p>
            <p className="ml-4">• 8:50 PM</p>
            <p className="ml-4">• 9:40 PM</p>
            <p className="ml-4">• 10:20 PM</p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-300">Get Involved</h2>
          <p className="text-gray-300 mb-4">
            Interested in joining the league or volunteering? Reach out to us for information about 
            registration, team formation, and upcoming events.
          </p>
          <a 
            href="mailto:info@uihl.org?subject=League Inquiry" 
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition"
          >
            Send Us a Message
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* SUBTLE LOGO BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <img 
          src="uihl-logo.png" 
          alt="" 
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      <div className="fixed inset-0 bg-gradient-to-br from-black via-blue-950/90 to-black z-0" />

      <div className="relative z-10">
 border-white/10 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="h-10 md:h-14 w-10 md:w-14 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-black">U</span>
              </div>
              <span className="text-2xl md:text-4xl font-black hidden sm:block">UIHL</span>
            </div>
            <div className="text-lg md:text-2xl font-bold text-yellow-400">{selectedSeason}</div>
          </div>
        </header>

        <nav className="bg-black/60 backdrop-blur border-b border-white/10 sticky top-16 z-30">
          <div className="flex gap-2 overflow-x-auto px-3 py-3 scrollbar-hide">
            {NAVIGATION_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSelectedTeam(null);
                  setDropdownOpen(false);
                }}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-bold text-sm whitespace-nowrap transition ${
                  activeTab === item.id
                    ? 'bg-blue-600'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <item.icon size={20} /> {item.label}
              </button>
            ))}
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
          {activeTab === 'home' && <HomePage />}
          {activeTab === 'schedule' && <SchedulePage />}
          {activeTab === 'standings' && <StandingsPage />}
          {activeTab === 'teams' && (selectedTeam ? <TeamPage /> : <TeamsListPage />)}
          {activeTab === 'contact' && <ContactPage />}
        </main>
      </div>
    </div>
  );
}
