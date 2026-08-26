import { queryOptions } from "@tanstack/react-query";
import { getSiteSettings } from "./site-settings.functions";
import { degradeOnFailure } from "./degrade";

export const siteSettingsQueryOptions = () =>
  queryOptions({
    queryKey: ["site-settings"],
    // Footer settings are non-critical: fall back to defaults rather than
    // blocking or failing the whole render.
    queryFn: () => degradeOnFailure("site-settings", () => getSiteSettings(), null),
  });
