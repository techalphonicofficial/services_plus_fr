import { cache } from "react";
import { apiClient } from "@/service/apiClient";
import { normalizeAssetUrl } from "@/service/servicePageService";

/*
 * CMS menus (admin: Menus & Navigation, GET /api/v1/menus). The same CMS can hold the menus of
 * several websites, so this site picks its own by name: SITE_HEADER_MENU / SITE_FOOTER_MENU (.env,
 * default "Services Plus Header" / "Services Plus Footer", seeded by the backend's
 * scripts/seed-servicesplus-menus.js). A missing name falls back to the active menu of that location.
 */
const MENUS_PATH = "/api/v1/menus?page=1&limit=100&sortBy=createdAt&sortOrder=ASC";
const MENU_NAMES = {
  header: process.env.SITE_HEADER_MENU || "Services Plus Header",
  footer: process.env.SITE_FOOTER_MENU || "Services Plus Footer",
};

const byOrder = (items = []) => [...items].sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));

export function cleanMenuUrl(url) {
  const value = String(url || "").trim();
  return !value || /^javascript:/i.test(value) ? "#" : value;
}

/** Menu item icon (admin: emoji or Media image); image paths become absolute URLs. */
export function menuIcon(value) {
  const icon = String(value || "").trim();
  if (!icon) return "";
  return /^(\/|uploads\/)/i.test(icon) || /\.(png|jpe?g|webp|gif|svg|avif)(\?.*)?$/i.test(icon) ? normalizeAssetUrl(icon) : icon;
}

/** A menu item and everything under it: { id, label, url, target, icon, children }. */
function toItem(item) {
  return {
    id: item.id,
    label: String(item.title || "").trim() || "Untitled",
    url: cleanMenuUrl(item.url),
    target: item.target || "_self",
    icon: menuIcon(item.icon),
    children: byOrder(Array.isArray(item.children) ? item.children : []).map(toItem),
  };
}

function parseSettings(value) {
  if (value && typeof value === "object") return value;
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

const loadMenus = cache(async function loadMenus() {
  const payload = await apiClient(MENUS_PATH, { cache: "no-store" });
  return Array.isArray(payload?.data?.data) ? payload.data.data : [];
});

/** This website's menu record for a location, as the API returns it, or null. */
export async function getSiteMenuRecord(location) {
  const menus = (await loadMenus()).filter((menu) => menu.location === location && !menu.deletedAt);
  return menus.find((m) => m.name === MENU_NAMES[location]) || menus.find((m) => m.status === "active") || null;
}

/**
 * This website's menu for a location ("header" | "footer") as { name, items, settings }, or null
 * when the CMS has none. Throws when the API cannot be reached (callers fall back).
 */
export async function getSiteMenu(location) {
  const menu = await getSiteMenuRecord(location);
  if (!menu) return null;
  return { name: menu.name, items: byOrder(menu.items || []).map(toItem), settings: parseSettings(menu.settings) };
}
