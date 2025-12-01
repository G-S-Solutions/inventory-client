
export interface Iloged {
  data: {
    authValidateToken: boolean | null;
  };
}

interface ContextCompany {
  id: string;
  name: string;
}

interface ContextMenu {
  id: string;
  name: string;
  code: string;
  path: string;
  type: string;
  position: string;
  order: number;
  icon?: string;
  description?: string;
  subMenu?: ContextMenu[];
}

interface ContextRole {
  id: string;
  name: string;
  slug: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
}

export interface ContextUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  company: ContextCompany;
  role: ContextRole;
  menus?: ContextMenu[];
}
