import data from "../data/mockPortfolio.json";
import type { PortfolioData } from "../types/dashboard";

const portfolioData = data as PortfolioData;

export const usePortfolioData = (): PortfolioData => {
  return portfolioData;
};
