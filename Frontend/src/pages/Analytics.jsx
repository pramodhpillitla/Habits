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
    <div className="space-y-6 px-4 md:px-0 mt-4 md:mt-0">
      <div className="md:hidden text-center mb-6">
        <h2 className="text-white text-2xl font-bold">Analytics</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <AnalyticsPanel period={period} stats={stats} onPeriodChange={changePeriod} />
          <ConsistencyPanel consistency={consistency} />
        </div>
        <div>
          <HistoryPanel history={history} />
        </div>
      </div>
    </div>
  );
}
