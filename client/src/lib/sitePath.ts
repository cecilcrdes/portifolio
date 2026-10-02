export function sitePath(path: string) {
  if (path.startsWith("#")) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}${path || "/"}`;
}
