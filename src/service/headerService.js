import { cache } from "react";
import { getSiteMenu } from "@/service/menuService";
import { menuSlug } from "@/lib/menuSlug";

/*
 * The site header (components/layout/TopNav.jsx) from this website's header menu (admin: Menus &
 * Navigation → "Services Plus Header", see service/menuService.js). Top-level items become:
 * - an item titled Login / Account / Sign in with links under it → the account dropdown;
 * - the LAST item, when it has no links under it and is titled like "Get Started" / "Register" /
 *   "Sign up" → the primary button on the right;
 * - any other item with links under it → a mega menu category (its links = the services; with
 *   column headings, the links of every column), the first link is the featured one;
 * - any other item → a plain link in the nav row (Blogs, Contact, ...).
 */

const ACCOUNT_TITLE = /^(login|log in|account|my account|sign in|client login)$/i;
const CTA_TITLE = /get started|register|sign ?up|start now|enquire|consult/i;

const link = (item) => ({ id: item.id, label: item.label, href: item.url, target: item.target, icon: item.icon });

/** Every link under an item (column headings are flattened). */
const leafLinks = (item) => item.children.flatMap((child) => (child.children.length ? child.children.map(link) : [link(child)]));

function toCategory(item) {
  const services = leafLinks(item).filter((s) => s.href && s.href !== "#");
  return {
    id: item.id,
    slug: menuSlug(item.label),
    title: item.label,
    href: item.url !== "#" ? item.url : services[0]?.href || "#",
    icon: item.icon,
    topServices: services,
    featured: services[0] || null,
  };
}

const EMPTY = { categories: [], links: [], account: null, cta: null };

/** { categories, links, account, cta } for TopNav. Never throws (an empty header on error). */
export const getHeaderNavigation = cache(async function getHeaderNavigation() {
  try {
    const menu = await getSiteMenu("header");
    if (!menu) return EMPTY;
    const items = [...menu.items];

    const last = items.at(-1);
    const cta = last && !last.children.length && CTA_TITLE.test(last.label) ? link(items.pop()) : null;
    const accountIndex = items.findIndex((item) => item.children.length && ACCOUNT_TITLE.test(item.label));
    const account = accountIndex >= 0 ? (({ label, url, children }) => ({ label, href: url, items: children.map(link) }))(items.splice(accountIndex, 1)[0]) : null;

    return {
      categories: items.filter((item) => item.children.length).map(toCategory),
      links: items.filter((item) => !item.children.length).map(link),
      account,
      cta,
    };
  } catch (error) {
    console.error("Unable to load the header menu.", error);
    return EMPTY;
  }
});
