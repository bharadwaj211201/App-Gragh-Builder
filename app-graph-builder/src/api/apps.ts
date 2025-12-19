export async function fetchApps() {
  const res = await fetch("/api/apps");
  if (!res.ok) throw new Error("Failed to load apps");
  return res.json();
}

export async function fetchAppGraph(appId: string) {
  const res = await fetch(`/api/apps/${appId}/graph`);
  if (!res.ok) throw new Error("Failed to load graph");
  return res.json();
}