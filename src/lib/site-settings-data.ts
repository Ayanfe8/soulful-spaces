import { queryOptions } from "@tanstack/react-query";
import { getSiteSettings } from "./site-settings.functions";

export const siteSettingsQueryOptions = () =>
  queryOptions({
    queryKey: ["site-settings"],
    queryFn: () => getSiteSettings(),
  });
