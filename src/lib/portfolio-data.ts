import { queryOptions } from "@tanstack/react-query";
import { getPortfolioProjects } from "./portfolio.functions";

export const portfolioQueryOptions = () =>
  queryOptions({
    queryKey: ["portfolio-projects"],
    queryFn: () => getPortfolioProjects(),
  });
