import type { ComponentType } from "react";
import type { MotifKind } from "../../../data/projects";
import { AnalyticsMotif } from "./AnalyticsMotif";
import { MemoryMotif } from "./MemoryMotif";
import { NetworkMotif } from "./NetworkMotif";
import { PipelineMotif } from "./PipelineMotif";

export const motifs: Record<MotifKind, ComponentType> = {
  pipeline: PipelineMotif,
  memory: MemoryMotif,
  analytics: AnalyticsMotif,
  network: NetworkMotif,
};
