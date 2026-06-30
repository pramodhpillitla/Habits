import { Panel } from "../ui/Panel";
import { ContributionGrid } from "./ContributionGrid";

export function ConsistencyPanel({ consistency }) {
  return (
    <Panel eyebrow="Consistency" title="Past twelve months">
      <ContributionGrid days={consistency} />
    </Panel>
  );
}
