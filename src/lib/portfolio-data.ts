import { queryOptions } from "@tanstack/react-query";
import { getPortfolioProjects } from "./portfolio.functions";
import { degradeOnFailure } from "./degrade";

type PortfolioRows = Awaited<ReturnType<typeof getPortfolioProjects>>;
export type PortfolioResult = { projects: PortfolioRows; degraded: boolean };

export const portfolioQueryOptions = () =>
  queryOptions({
    queryKey: ["portfolio-projects"],
    queryFn: (): Promise<PortfolioResult> =>
      degradeOnFailure(
        "portfolio",
        async () => ({ projects: await getPortfolioProjects(), degraded: false }),
        { projects: [], degraded: true },
      ),
  });
