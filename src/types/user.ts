
export interface Iloged {
  data: {
    authValidateToken: boolean | null;
  };
}

export interface ContextCompany {
  id: string;
  name: string;
}

export interface ContextMenu {
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

export interface ContextRole {
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
