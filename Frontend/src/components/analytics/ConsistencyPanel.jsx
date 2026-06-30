import { Panel } from "../ui/Panel";
import { ContributionGrid } from "./ContributionGrid";

export function ConsistencyPanel({ consistency }) {
  return (
    <Panel eyebrow="Consistency" title="Last 120 days">
      <ContributionGrid days={consistency} />
    </Panel>
  );
}
