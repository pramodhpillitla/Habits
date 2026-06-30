import { useEffect, useState, useMemo } from "react";
import { apiRequest } from "../utils/api";
import { ConsistencyPanel } from "../components/analytics/ConsistencyPanel";
import { AnalyticsPanel } from "../components/analytics/AnalyticsPanel";
import { HistoryPanel } from "../components/analytics/HistoryPanel";

export function Analytics({ token }) {
  const [consistency, setConsistency] = useState([]);
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [period, setPeriod] = useState("today");
  const headers = useMemo(() => ({ token }), [token]);

  const loadData = async (selectedPeriod = period) => {
    try {
      const [consistencyData, statsData, historyData] = await Promise.all([
        apiRequest("/analytics/consistency?days=120", headers),
        apiRequest(`/analytics/stats?period=${selectedPeriod}`, headers),
        apiRequest("/analytics/history", headers),
      ]);
      setConsistency(consistencyData.days);
      setStats(statsData);
      setHistory(historyData.logs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { loadData(period); }, [headers, period]);

  const changePeriod = async (nextPeriod) => {
    setPeriod(nextPeriod);
    try {
      setStats(await apiRequest(`/analytics/stats?period=${nextPeriod}`, headers));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-full flex-1 w-full max-w-5xl mx-auto">
      {/* Header matching the Behance App style */}
      <div className="px-6 md:px-0 mb-8 mt-2 md:mt-4 shrink-0">
        <h2 className="text-white text-4xl md:text-5xl font-extrabold tracking-tight">
          Analytics
        </h2>
        <p className="text-blue-100 text-base md:text-lg font-medium tracking-wide ml-0.5 mt-0.5">
          Track your progress
        </p>
      </div>

      {/* Immersive white rounded panel taking up the rest of the height */}
      <div className="flex-1 bg-[#f8fafc] rounded-t-[40px] md:rounded-t-[48px] p-6 md:p-10 pb-24 md:pb-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          <div className="space-y-6 lg:space-y-10">
            <AnalyticsPanel period={period} stats={stats} onPeriodChange={changePeriod} />
            <ConsistencyPanel consistency={consistency} />
          </div>
          <div>
            <HistoryPanel history={history} />
          </div>
        </div>
      </div>
    </div>
  );
}
