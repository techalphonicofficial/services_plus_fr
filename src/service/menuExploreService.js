import { cache } from "react";
import { normalizeAssetUrl } from "@/service/servicePageService";
import { getSiteMenuRecord } from "@/service/menuService";
import { explorePath, menuSlug } from "@/lib/menuSlug";

/*
 * Explore pages: everything under one header menu item (Menus & Navigation, location "header"),
 * e.g. /explore/startup lists the Startup services, /explore/products/tools-calculators one
 * column of Products. Homepage category cards and old links (/category/startup, /advisory,
 * /taxpedia, ...) reach them through resolveMenuAlias (app/[...slug]/page.jsx).
 */

// Same rule as service/headerService.js.
const ACCOUNT_TITLE = /^(login|log in|account|my account|sign in|client login)$/i;
const byOrder = (items = []) => [...items].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
const realUrl = (url) => {
  const value = String(url || "").trim();
  return value && value !== "#" && !/^javascript:/i.test(value) ? value : "";
};
const icon = (value) => {
  const v = String(value || "").trim();
  if (!v) return "";
  return /^(\/|uploads\/)/i.test(v) || /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i.test(v) ? normalizeAssetUrl(v) : v;
};

function toNode(item, parents = []) {
  const title = String(item.title || "").trim() || "Untitled";
  const children = byOrder(Array.isArray(item.children) ? item.children : []).map((child) => toNode(child, [...parents, title]));
  return {
    id: item.id,
    title,
    slug: menuSlug(title),
    url: realUrl(item.url),
    target: item.target || "_self",
    icon: icon(item.icon),
    children,
    explore: explorePath(...parents, title),
  };
}

/** This website's header menu (service/menuService.js) as a tree (top items → columns / links → links). */
export const getHeaderMenuTree = cache(async function getHeaderMenuTree() {
  try {
    const header = await getSiteMenuRecord("header");
    // The account menu (Login → Client Login, Payment, ...) is not a service section.
    return byOrder(header?.items || []).map((item) => toNode(item)).filter((node) => !ACCOUNT_TITLE.test(node.title));
  } catch (error) {
    console.error("Unable to load the header menu for explore pages.", error);
    return [];
  }
});

/** Links a page shows: a node's leaf links (with a real URL), counted through all levels. */
export const leafCount = (node) => node.children.reduce((n, child) => n + (child.children.length ? leafCount(child) : child.url ? 1 : 0), 0);

/** The top header item that links to this path (e.g. /service-by-categories/startup) and has links under it, or null. */
export async function findMenuNodeByUrl(path) {
  const wanted = String(path || "").replace(/\/+$/, "").toLowerCase();
  const tree = await getHeaderMenuTree();
  return tree.find((node) => node.children.length && node.url.replace(/\/+$/, "").toLowerCase() === wanted) || null;
}

/** The menu node for /explore/<a>/<b>, with its parent, or null. */
export async function findMenuNode(segments) {
  const tree = await getHeaderMenuTree();
  let level = tree;
  let node = null;
  let parent = null;
  for (const segment of segments) {
    parent = node;
    node = level.find((item) => item.slug === segment);
    if (!node) return null;
    level = node.children;
  }
  return node && node.children.length ? { node, parent } : null;
}

const STOP = new Set(["services", "service", "and", "the", "for", "of", "online", "category", "explore"]);
const words = (slug) => slug.split("-").filter((w) => w && !STOP.has(w));

/**
 * An explore page for a URL nothing else answers: /category/startup → /explore/startup,
 * /advisory → /explore/business-advisory, /taxpedia (header item linking to itself) → /explore/taxpedia.
 * Matches top items first, then columns, by exact slug, then by shared words. Returns the path or null.
 */
export async function resolveMenuAlias(pathname) {
  const segments = String(pathname || "").split("/").filter(Boolean).map((s) => s.toLowerCase());
  if (!segments.length || segments.length > 2 || segments[0] === "explore") return null;
  const wanted = menuSlug(segments.at(-1));
  if (!wanted) return null;
  const tree = await getHeaderMenuTree();
  const candidates = [
    ...tree.filter((n) => n.children.length).map((n) => ({ node: n, rank: 0 })),
    ...tree.flatMap((n) => n.children.filter((c) => c.children.length).map((c) => ({ node: c, rank: 1 }))),
  ];
  const path = `/${segments.join("/")}`;
  const exact = candidates.find(({ node }) => node.slug === wanted || node.url.replace(/\/+$/, "") === path);
  if (exact) return exact.node.explore;

  // Each wanted word: 2 points when it is in the section's own title, 1 when it is in the title of
  // something inside it ("drafting" → Lawyer Services, which holds "Contract Drafting"). Columns
  // lose half a point so a top item wins a tie.
  const want = words(wanted);
  if (!want.length) return null;
  const titleWords = (node) => new Set(words(node.slug));
  const insideWords = (node) => new Set(node.children.flatMap((c) => [...words(c.slug), ...insideWords(c)]));
  let best = null;
  candidates.forEach(({ node, rank }) => {
    const own = titleWords(node);
    const inside = insideWords(node);
    const score = want.reduce((n, w) => n + (own.has(w) ? 2 : inside.has(w) ? 1 : 0), 0) - rank * 0.5;
    if (score >= 2 && (!best || score > best.score)) best = { score, node };
  });
  return best ? best.node.explore : null;
}
