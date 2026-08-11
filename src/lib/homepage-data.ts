import { queryOptions } from "@tanstack/react-query";
import { getHomepageContent } from "./homepage.functions";

export const homepageContentQueryOptions = () =>
  queryOptions({
    queryKey: ["homepage-content"],
    queryFn: () => getHomepageContent(),
  });
