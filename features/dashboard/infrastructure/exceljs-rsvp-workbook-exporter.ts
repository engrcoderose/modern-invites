import "server-only";

import ExcelJS from "exceljs";

import type {
  AssignedDashboardEvent,
  DashboardGuest,
} from "@/features/dashboard/domain/client-dashboard";
import type { RsvpWorkbookExporter } from "@/features/dashboard/domain/rsvp-workbook-exporter";

const contentType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

const statusLabels = {
  attending: "Attending",
  declined: "Declined",
  pending: "Awaiting reply",
} as const;

function safeFilename(value: string) {
  const normalized = value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

  return normalized || "wedding";
}

function applyHeaderStyle(row: ExcelJS.Row) {
  row.height = 24;
  row.eachCell((cell) => {
    cell.font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF173D32" },
    };
    cell.alignment = {
      vertical: "middle",
      horizontal: "left",
    };
  });
}

export function createExcelJsRsvpWorkbookExporter(): RsvpWorkbookExporter {
  return {
    async create(
      event: AssignedDashboardEvent,
      guests: DashboardGuest[],
    ) {
      const workbook = new ExcelJS.Workbook();
      workbook.creator = "Modern Invites";
      workbook.created = new Date();
      workbook.modified = new Date();
      workbook.subject = `${event.name} RSVP guest list`;
      workbook.title = `${event.name} RSVP Export`;

      const summarySheet = workbook.addWorksheet("Summary", {
        views: [{ showGridLines: false }],
      });
      summarySheet.columns = [
        { key: "label", width: 28 },
        { key: "value", width: 24 },
      ];
      summarySheet.addRow(["Modern Invites RSVP Export", ""]);
      summarySheet.mergeCells("A1:B1");
      summarySheet.getCell("A1").font = {
        bold: true,
        size: 18,
        color: { argb: "FF173D32" },
      };
      summarySheet.getCell("A1").alignment = { vertical: "middle" };
      summarySheet.getRow(1).height = 34;
      summarySheet.addRow(["Wedding", event.name]);
      summarySheet.addRow([
        "Exported",
        new Intl.DateTimeFormat("en-PH", {
          dateStyle: "long",
          timeStyle: "short",
          timeZone: "Asia/Manila",
        }).format(new Date()),
      ]);
      summarySheet.addRow(["Total guests", guests.length]);
      summarySheet.addRow([
        "Attending",
        guests.filter(
          (guest) => guest.attendanceStatus === "attending",
        ).length,
      ]);
      summarySheet.addRow([
        "Declined",
        guests.filter(
          (guest) => guest.attendanceStatus === "declined",
        ).length,
      ]);
      summarySheet.addRow([
        "Awaiting reply",
        guests.filter((guest) => guest.attendanceStatus === "pending")
          .length,
      ]);

      for (let rowNumber = 2; rowNumber <= 7; rowNumber += 1) {
        summarySheet.getCell(`A${rowNumber}`).font = {
          bold: true,
          color: { argb: "FF527362" },
        };
      }

      const guestSheet = workbook.addWorksheet("Guest List", {
        views: [{ state: "frozen", ySplit: 1 }],
      });
      guestSheet.columns = [
        { header: "Guest name", key: "fullName", width: 28 },
        { header: "Household", key: "householdName", width: 28 },
        { header: "Guest type", key: "guestType", width: 14 },
        { header: "RSVP status", key: "status", width: 18 },
        { header: "Email", key: "email", width: 30 },
        { header: "Phone", key: "phone", width: 20 },
        {
          header: "Dietary restrictions",
          key: "dietaryRestrictions",
          width: 32,
        },
        { header: "Message", key: "message", width: 42 },
        { header: "Submitted at", key: "submittedAt", width: 22 },
      ];
      applyHeaderStyle(guestSheet.getRow(1));

      for (const guest of guests) {
        guestSheet.addRow({
          fullName: guest.fullName,
          householdName: guest.householdName,
          guestType:
            guest.guestType === "child" ? "Child" : "Adult",
          status: statusLabels[guest.attendanceStatus],
          email: guest.email ?? "",
          phone: guest.phone ?? "",
          dietaryRestrictions: guest.dietaryRestrictions ?? "",
          message: guest.message ?? "",
          submittedAt: guest.submittedAt
            ? new Date(guest.submittedAt)
            : "",
        });
      }

      guestSheet.autoFilter = {
        from: "A1",
        to: "I1",
      };

      guestSheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
          return;
        }

        row.alignment = {
          vertical: "top",
          wrapText: true,
        };

        if (rowNumber % 2 === 0) {
          row.eachCell((cell) => {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFF8F5EF" },
            };
          });
        }
      });

      guestSheet.getColumn("submittedAt").numFmt =
        "mmm d, yyyy h:mm AM/PM";

      const data = await workbook.xlsx.writeBuffer();

      return {
        data: new Uint8Array(data),
        filename: `${safeFilename(event.name)}-rsvp-export.xlsx`,
        contentType,
      };
    },
  };
}
