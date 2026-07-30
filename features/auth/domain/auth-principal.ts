export interface AuthenticatedIdentity {
  userId: string;
  email: string | null;
}

export interface AdminPrincipal extends AuthenticatedIdentity {
  kind: "administrator";
}

export interface ClientPrincipal extends AuthenticatedIdentity {
  kind: "client";
  displayName: string;
}

export type AdminAccessResult =
  | {
      status: "authorized";
      principal: AdminPrincipal;
    }
  | {
      status: "unauthenticated";
    }
  | {
      status: "forbidden";
      identity: AuthenticatedIdentity;
    };

export type ClientAccessResult =
  | {
      status: "authorized";
      principal: ClientPrincipal;
    }
  | {
      status: "unauthenticated";
    }
  | {
      status: "forbidden";
      identity: AuthenticatedIdentity;
    };
