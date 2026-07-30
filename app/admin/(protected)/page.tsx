import Link from "next/link";
import { ArrowRight, Database, ShieldCheck, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const readinessItems = [
  {
    title: "Authentication",
    description: "Administrator identity and cookie sessions are active.",
    icon: ShieldCheck,
  },
  {
    title: "Data isolation",
    description: "Client event access is protected by Row Level Security.",
    icon: Database,
  },
  {
    title: "Client provisioning",
    description: "Create client access and assign a wedding from one place.",
    icon: Users,
  },
] as const;

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-eucalyptus-dark">
            Admin overview
          </p>
          <h1 className="mt-2 font-elegant text-4xl font-medium text-forest">
            Welcome back
          </h1>
          <p className="mt-2 max-w-2xl text-ink-muted">
            Manage client access and prepare each event dashboard from
            this private workspace.
          </p>
        </div>

        <Button asChild className="bg-forest text-white hover:bg-forest-light">
          <Link href="/admin/clients">
            Manage clients
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {readinessItems.map(({ title, description, icon: Icon }) => (
          <Card key={title} className="border-black/10 bg-white shadow-sm">
            <CardHeader>
              <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-eucalyptus/10 text-forest">
                <Icon aria-hidden="true" className="size-5" />
              </div>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="leading-6">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    </div>
  );
}
