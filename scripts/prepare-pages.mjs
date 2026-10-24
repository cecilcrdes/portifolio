import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));

export async function preparePages(outputDirectory = path.join(root, "dist/public")) {
  const index = path.join(outputDirectory, "index.html");
  const source = await readFile(path.join(root, "client/src/pages/CasePage.tsx"), "utf8");
  const slugs = [...new Set([...source.matchAll(/\bslug:\s*"([a-z0-9-]+)"/g)].map((match) => match[1]))];
  if (!slugs.length) throw new Error("No project case routes found.");

  const routes = [
    "en",
    "projetos/grafico", "projetos/ux", "projetos/ilustracao", "projetos/marketing",
    "projetos/ux/glitchcast-app",
    "en/projects/graphic", "en/projects/ux", "en/projects/illustration", "en/projects/marketing",
    "en/projects/ux/glitchcast-app",
    ...slugs.flatMap((slug) => [`cases/${slug}`, `en/cases/${slug}`]),
  ];

  await copyFile(index, path.join(outputDirectory, "404.html"));
  await writeFile(path.join(outputDirectory, ".nojekyll"), "");
  for (const route of routes) {
    const directory = path.join(outputDirectory, route);
    await mkdir(directory, { recursive: true });
    await copyFile(index, path.join(directory, "index.html"));
  }
  return routes;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const routes = await preparePages();
  console.log(`Prepared ${routes.length} routes and the GitHub Pages fallback.`);
}
