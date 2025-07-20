import { RecordModel } from "pocketbase";

export interface Task extends RecordModel {
  task: string;
  is_completed: boolean;
}
