import { Label } from "@/components/ui/label";
import {
  CLIENT_SERVICES,
  SERVICE_LABELS,
  type ClientServices,
} from "../domain/client-services";

export function ClientServicesField({
  value,
  onChange,
  error,
  servicesAvailable = true,
}: {
  value: ClientServices;
  onChange(value: ClientServices): void;
  error?: string;
  servicesAvailable?: boolean;
}) {
  return (
    <div className="space-y-2 sm:col-span-2">
      <Label htmlFor="client-services">Client Services</Label>
      <select
        id="client-services"
        name="clientServices"
        value={value}
        onChange={(event) => onChange(event.target.value as ClientServices)}
        className="h-11 w-full rounded-md border border-input bg-white px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        aria-invalid={!!error}
        aria-describedby="client-services-help client-services-error"
      >
        {CLIENT_SERVICES.map((service) => (
          <option
            key={service}
            value={service}
            disabled={!servicesAvailable && service !== "rsvp"}
          >
            {SERVICE_LABELS[service]}
          </option>
        ))}
      </select>
      <p id="client-services-help" className="text-xs leading-5 text-ink-muted">
        {servicesAvailable
          ? "Choose the tools included in this event. The client uses one login and a shared guest list."
          : "Seat Finder database setup is pending. Existing RSVP tools remain available. Run the Client Services and Seat Finder migration, then reload this page to enable the other services."}
      </p>
      <p id="client-services-error" className="text-sm text-destructive">
        {error}
      </p>
    </div>
  );
}
