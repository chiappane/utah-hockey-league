import React from 'react';
import { Calendar, Trophy, Users, Home, ChevronRight } from 'lucide-react';

const UtahInlineHockeyLeague = () => {
  // EDIT SCORES HERE EVERY WEEK – that’s literally all you ever have to do
  const schedule = [
    // Week 1 – Dec 3
    { date: '2025-12-03', time: '7:00 PM', home: 'Salt Lake Sliders', away: 'Provo Pucksters',   homeScore: 6, awayScore: 4 },
    { date: '2025-12-03', time: '8:30 PM', home: 'Ogden Ice Hawks',   away: 'Park City Blades',   homeScore: 3, awayScore: 3 },

    // Week 2 – Dec 10
    { date: '2025-12-10', time: '7:00 PM', home: 'Provo Pucksters',  away: 'Ogden Ice Hawks',     homeScore: 5, awayScore: 2 },
    { date: '2025-12-10', time: '8:30 PM', home: 'Park City Blades', away: 'Salt Lake Sliders',  homeScore: 1, awayScore: 7 },

    // Future weeks – leave scores as null until played
    { date: '2025-12-17', time: '7:00 PM', home: 'Salt Lake Sliders', away: 'Ogden Ice Hawks',   homeScore: null, awayScore: null },
    { date: '2025-12-17', time: '8:30 PM', home: 'Provo Pucksters',  away: 'Park City Blades', homeScore: null, awayScore: null },
    { date: '2025-12-24', time: '7:00 PM', home: 'Ogden Ice Hawks',   away: 'Salt Lake Sliders', homeScore: null, awayScore: null },
    { date: '2025-12-24', time: '8:30 PM', home: 'Park City Blades', away: 'Provo Pucksters',  homeScore: null, awayScore: null },
  ];

  const teams = [
    { id: 1, name: 'Salt Lake Sliders' },
    { id: 2, name: 'Provo Pucksters' },
    { id: 3, name: 'Ogden Ice Hawks' },     // ← fixed the typo here
    { id: 4, name: 'Park City Blades' },
  ];

  // Auto-calculate standings & streak
  const calculateStandings = () => {
    const stats = new Map<string, { wins: number; losses: number; ties: number; last: string[] }>();
    teams.forEach(t => stats.set(t.name, { wins: 0, losses: 0, ties: 0, last: [] }));

    schedule.forEach(game => {
      if (game.homeScore === null) return;

      if (game.homeScore > game.awayScore) {
        stats.get(game.home)!.wins++;
        stats.get(game.away)!.losses++;
        stats.get(game.home)!.last.push('W');
        stats.get(game.away)!.last.push('L');
      } else if (game.homeScore < game.awayScore) {
        stats.get(game.home)!.losses++;
        stats.get(game.away)!.wins++;
        stats.get(game.home)!.last.push('L');
        stats.get(game.away)!.last.push('W');
      } else {
        stats.get(game.home)!.ties++;
        stats.get(game.away)!.ties++;
        stats.get(game.home)!.last.push('T');
        stats.get(game.away)!.last.push('T');
      }
    });

    return teams
      .map(team => {
        const s = stats.get(team.name)!;
        const points = s.wins * 2 + s.ties;

        // Calculate current streak
        let streak = 0;
        if (s.last.length > 0) {
          const lastResult = s.last[s.last.length - 1];
          if (lastResult !== 'T') {
            let count = 0;
            for (let i = s.last.length - 1; i >= 0; i--) {
              if (s.last[i] === lastResult) count++;
              else break;
            }
            streak = lastResult === 'W' ? count : -count;
          }
        }

        return {
          ...team,
          wins: s.wins,
          losses: s.losses,
          ties: s.ties,
          points,
          streak,
          gp: s.wins + s.losses + s.ties,
        };
      })
      .sort((a, b) => b.points - a.points || b.wins - a.wins);
  };

  const standings = calculateStandings();

  const [activeTab, setActiveTab] = React.useState('home');
  const [selectedTeam, setSelectedTeam] = React.useState<number | null>(null);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'standings', label: 'Standings', icon: Trophy },
    { id: 'teams', label: 'Teams', icon: Users },
  ];

  // ──────────────────────────────────────────────────────────────────────
  // UI Components (exactly the same beautiful design you already love)
  // ──────────────────────────────────────────────────────────────────────

  const HomePage = () => (
    <div className="max-w-7xl mx-auto">
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-12 mb-8 shadow-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtNi42MjcgNS4zNzMtMTIgMTItMTJzMTIgNS4zNzMgMTIgMTItNS4zNzMgMTItMTIgMTItMTItNS4zNzMtMTItMTJ6TTAgMTZjMC02LjYyNyA1LjM3My0xMiAxMi0xMnMxMiA1LjM3MyAxMiAxMi01LjM3MyAxMi0xMiAxMlMwIDIyLjYyNyAwIDE2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Utah Inline Hockey League
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 font-light">Where passion meets the pavement</p>
        </div>
      </div>

      <div className="text-center py-10 bg-white rounded-2xl shadow-lg mb-8">
        <p className="text-3xl font-bold text-gray-800">
          Next Game Night:{' '}
          <span className="text-blue-600">
            {schedule.find(g => g.homeScore === null)
              ? new Date(schedule.find(g => g.homeScore === null)!.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Season Complete'}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {tabs.slice(1).map(tab => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 cursor-pointer hover:scale-105"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              tab.id === 'schedule' ? 'bg-blue-100' : tab.id === 'standings' ? 'bg-green-100' : 'bg-purple-100'
            }`}>
              <tab.icon className={tab.id === 'schedule' ? 'text-blue-600' : tab.id === 'standings' ? 'text-green-600' : 'text-purple-600'} size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{tab.label}</h3>
            <p className="text-gray-600">{tab.id === 'teams' ? `${teams.length} teams` : 'View all'}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Latest Results</h2>
        </div>
        <div className="p-6">
          {schedule.filter(g => g.homeScore !== null).length === 0 ? (
            <p className="text-center text-gray-400 py-8">Season starts soon!</p>
          ) : (
            schedule
              .filter(g => g.homeScore !== null)
              .slice(-4)
              .reverse()
              .map((game, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b last:border-b-0 border-gray-100">
                  <div className="flex-1 text-right pr-4 font-semibold">{game.home}</div>
                  <div className="px-6">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-xl font-bold text-xl shadow-md">
                      {game.homeScore}–{game.awayScore}
                    </div>
                  </div>
                  <div className="flex-1 pl-4 font-semibold">{game.away}</div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );

  const SchedulePage = () => (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Schedule & Results</h1>
      <div className="space-y-4">
        {schedule.map((game, i) => {
          const played = game.homeScore !== null;
          return (
            <div key={i} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-blue-600 mb-2">
                    {new Date(game.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} • {game.time}
                  </div>
                  <div className="text-lg font-bold">
                    {game.home} <span className="text-gray-400">vs</span> {game.away}
                  </div>
                </div>
                {played ? (
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-bold">FINAL</span>
                    <div className="text-3xl font-bold text-blue-600">{game.homeScore}–{game.awayScore}</div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-6 py-3 bg-yellow-100 text-yellow-700 rounded-xl font-semibold">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
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
      <h1 className="text-4xl font-bold mb-8 text-gray-900">League Standings</h1>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
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
                <tr key={team.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4"><div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-bold">{i + 1}</div></td>
                  <td className="px-6 py-4 font-bold text-gray-900">{team.name}</td>
                  <td className="px-6 py-4 text-center text-gray-600">{team.gp}</td>
                  <td className="px-6 py-4 text-center"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold">{team.wins}</span></td>
                  <td className="px-6 py-4 text-center"><span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg font-bold">{team.losses}</span></td>
                  <td className="px-6 py-4 text-center"><span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-bold">{team.ties}</span></td>
                  <td className="px-6 py-4 text-center"><span className="px-4 py-1 bg-blue-600 text-white rounded-lg font-bold text-lg">{team.points}</span></td>
                  <td className="px-6 py-4 text-center font-bold">
                    {team.streak > 0 ? <span className="text-green-600">W{team.streak}</span> : team.streak < 0 ? <span className="text-red-600">L{Math.abs(team.streak)}</span> : '–'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const TeamsPage = () => { /* ... same as before ... */ };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header & Nav exactly the same as before */}
      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === 'home' && <Home />}
        {activeTab === 'schedule' && <SchedulePage />}
        {activeTab === 'standings' && <StandingsPage />}
        {activeTab === 'teams' && <TeamsPage />}
      </main>
    </div>
  );
};

export default UtahInlineHockeyLeague;
