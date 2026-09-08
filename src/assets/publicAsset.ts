export function publicAsset(path: string): string {
  const encodedPath = path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${import.meta.env.BASE_URL}${encodedPath}`;
}
