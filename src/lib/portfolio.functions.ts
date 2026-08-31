import { restSelect } from "@/lib/public-supabase";

export type PortfolioRow = {
  id: string;
  title: string;
  location: string | null;
  year: string | null;
  category: string;
  ratio: string;
  image_path: string | null;
  sort_order: number;
};

export async function getPortfolioProjects() {
  return restSelect<PortfolioRow>(
    "portfolio",
    "portfolio_projects?select=id,title,location,year,category,ratio,image_path,sort_order&order=sort_order.asc",
  );
}
