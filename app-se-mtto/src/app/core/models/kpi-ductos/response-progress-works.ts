import { ProgressWorks } from "./progress-works";

export interface ResponseProgressWorks {
  percentage: number;
  progressWorks: ProgressWorks[];
  tt_executed: number;
  tt_program: number;
}
