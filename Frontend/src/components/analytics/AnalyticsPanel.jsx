import { PERIODS } from "../../constants/analytics";
import { Panel } from "../ui/Panel";
import { SegmentedControl } from "../ui/SegmentedControl";
import { PieChart } from "./PieChart";
import { StatsList } from "./StatsList";

export function AnalyticsPanel({ period, stats, onPeriodChange }) {
  return (
    <Panel eyebrow="Analytics" title="Completion">
      <SegmentedControl label="Analytics period" options={PERIODS} value={period} onChange={onPeriodChange} />
      <PieChart stats={stats} />
      <StatsList stats={stats} />
    </Panel>
  );
}
