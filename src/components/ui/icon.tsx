import type { ComponentType } from "react";
import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { SiteIconName } from "@/content/icon-catalog";

type IconComponent = ComponentType<LucideProps>;

/**
 * Tu podmieniasz stockowe ikony na własne komponenty SVG.
 * Przykład:
 *   customIconRegistry.Phone = BrandPhoneIcon;
 */
export const customIconRegistry: Partial<Record<SiteIconName, IconComponent>> = {};

const lucideRegistry = LucideIcons as unknown as Record<string, IconComponent>;

export type IconProps = LucideProps & {
  name: SiteIconName;
  fallbackToLucide?: boolean;
};

export function Icon({ name, fallbackToLucide = true, ...props }: IconProps) {
  const CustomIcon = customIconRegistry[name];
  if (CustomIcon) return <CustomIcon {...props} />;

  if (!fallbackToLucide) return null;

  const LucideIcon = lucideRegistry[name];
  if (!LucideIcon) return null;
  return <LucideIcon {...props} />;
}
