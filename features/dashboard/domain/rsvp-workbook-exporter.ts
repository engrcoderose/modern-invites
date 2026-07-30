import type {
  AssignedDashboardEvent,
  DashboardGuest,
} from "./client-dashboard";

export interface RsvpWorkbook {
  data: Uint8Array;
  filename: string;
  contentType: string;
}

export interface RsvpWorkbookExporter {
  create(
    event: AssignedDashboardEvent,
    guests: DashboardGuest[],
  ): Promise<RsvpWorkbook>;
}
