export type SiteConfigType = {
  id: number;
  name: string;
  description?: string;
  address?: string;
  logo?: string;
  phone?: string;
  owner?: string;
  pib?: string;
  maticni_broj?: string;
};

export type SiteConfigPatch = {
  id: number;
  name?: string;
  description?: string;
  address?: string;
  logo?: string;
  phone?: string;
  owner?: string;
  pib?: string;
  maticni_broj?: string;
};
