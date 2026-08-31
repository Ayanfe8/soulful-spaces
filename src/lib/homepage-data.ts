import { queryOptions } from "@tanstack/react-query";
import { getHomepageContent } from "./homepage.functions";
import { degradeOnFailure } from "./degrade";

type HomepageContent = Omit<Awaited<ReturnType<typeof getHomepageContent>>, "settings"> & {
  settings: Awaited<ReturnType<typeof getHomepageContent>>["settings"] | null;
};
export type HomepageResult = HomepageContent & { degraded: boolean };

const FALLBACK: HomepageResult = {
  packages: [],
  testimonials: [],
  faqs: [],
  settings: null,
  degraded: true,
};

export const homepageContentQueryOptions = () =>
  queryOptions({
    queryKey: ["homepage-content"],
    queryFn: (): Promise<HomepageResult> =>
      degradeOnFailure(
        "homepage",
        async () => ({ ...(await getHomepageContent()), degraded: false }),
        FALLBACK,
      ),
  });
