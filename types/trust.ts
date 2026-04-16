export type TrustLogoCategory =
  | "academic"
  | "clinical"
  | "foundation"
  | "association"
  | "partner";

export type CredentialKind =
  | "affiliation"
  | "award"
  | "funding"
  | "milestone"
  | "publication";

export interface TrustLogoSeed {
  id: string;
  name: string;
  href?: string;
  category: TrustLogoCategory;
  position: number;
  logo: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}

export interface CredentialSignalSeed {
  id: string;
  label: string;
  supportingText?: string;
  href?: string;
  kind: CredentialKind;
  position: number;
}

export interface TrustSectionSeed {
  eyebrow: string;
  title: string;
  description: string;
  logos: TrustLogoSeed[];
  credentials: CredentialSignalSeed[];
}
