import { getClientAccess } from "@/features/auth/application/get-client-access";
import { createSupabaseClientAuthRepository } from "@/features/auth/infrastructure/supabase-client-auth-repository";
import { exportEventRsvpWorkbook } from "@/features/dashboard/application/export-event-rsvp-workbook";
import { createSupabaseClientDashboardRepository } from "@/features/dashboard/infrastructure/supabase-client-dashboard-repository";
import { createExcelJsRsvpWorkbookExporter } from "@/features/dashboard/infrastructure/exceljs-rsvp-workbook-exporter";

interface ExportRouteContext {
  params: Promise<{
    eventId: string;
  }>;
}

export async function GET(
  _request: Request,
  context: ExportRouteContext,
) {
  const { eventId: rawEventId } = await context.params;
  const eventId = Number(rawEventId);

  if (!Number.isSafeInteger(eventId) || eventId <= 0) {
    return Response.json(
      { error: "The event identifier is invalid." },
      { status: 400 },
    );
  }

  try {
    const authRepository =
      await createSupabaseClientAuthRepository();
    const access = await getClientAccess(authRepository);

    if (access.status !== "authorized") {
      return Response.json(
        { error: "Authentication is required." },
        { status: 401 },
      );
    }

    const dashboardRepository =
      await createSupabaseClientDashboardRepository();
    const workbook = await exportEventRsvpWorkbook(
      dashboardRepository,
      createExcelJsRsvpWorkbookExporter(),
      access.principal.userId,
      eventId,
    );

    if (!workbook) {
      return Response.json(
        { error: "The requested event was not found." },
        { status: 404 },
      );
    }

    const responseBody = new ArrayBuffer(workbook.data.byteLength);
    new Uint8Array(responseBody).set(workbook.data);

    return new Response(responseBody, {
      status: 200,
      headers: {
        "Content-Type": workbook.contentType,
        "Content-Disposition": `attachment; filename="${workbook.filename}"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("RSVP workbook export failed:", error);
    return Response.json(
      { error: "The RSVP export could not be generated." },
      { status: 500 },
    );
  }
}
