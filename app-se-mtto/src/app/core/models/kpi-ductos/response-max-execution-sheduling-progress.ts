import { CountMaxExecutionShedulingProgress } from "./conut-max-execution-sheduling-progress";
import { MaxExecutionShedulingProgress } from "./max-execution-sheduling-progress";
import { Works } from "./works";

export interface ResponseMaxExecutionShedulingProgress {
  maxExecutionShedulingProgress: MaxExecutionShedulingProgress;
  count: CountMaxExecutionShedulingProgress;
  works: Works[];
}
