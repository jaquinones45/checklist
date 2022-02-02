import { NoticesManaged } from "./notices-managed";

export interface ResponseNoticesManaged {
  noticesManaged: NoticesManaged[];
  totalNoticesCreated: number;
  totalNoticesManagement: number;
  totalPercentage: number;
}
