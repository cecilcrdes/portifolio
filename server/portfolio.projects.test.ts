import { beforeEach, describe, expect, it, vi } from "vitest";
import type { TrpcContext } from "./_core/context";

const getPublishedPortfolioProjects = vi.fn();

vi.mock("./db", () => ({
  getPublishedPortfolioProjects,
}));

const { appRouter } = await import("./routers");

describe("portfolio.projects", () => {
  beforeEach(() => {
    getPublishedPortfolioProjects.mockReset();
  });

  it("returns published projects for the requested language", async () => {
    const projects = [{
      id: 1,
      slug: "glitchcast-pt",
      language: "pt" as const,
      category: "grafico",
      label: "Identidade visual",
      title: "Glitchcast",
      description: "Identidade visual para um podcast.",
      year: "2021",
      imageUrl: "/manus-storage/glitchcast.png",
      accentColor: "#a45bea",
      sortOrder: 1,
      isPublished: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }];
    getPublishedPortfolioProjects.mockResolvedValue(projects);

    const ctx: TrpcContext = {
      user: null,
      req: {} as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };
    const result = await appRouter.createCaller(ctx).portfolio.projects({ language: "pt" });

    expect(getPublishedPortfolioProjects).toHaveBeenCalledWith("pt");
    expect(result).toEqual(projects);
  });
});
