import { cache } from "react";
import { getSiteMenu } from "@/service/menuService";

/*
 * The site footer (components/layout/Footer.jsx) from this website's footer menu (admin: Menus &
 * Navigation → "Services Plus Footer", see service/menuService.js). Three levels, like the Tax
 * Alphonic footer: main heading → column heading → links.
 * - Columns titled like "Follow us" / "Social" → the social buttons in the bottom bar.
 * - The columns of the FIRST main heading (e.g. "Services") → the numbered link columns.
 * - Every other column, and items with links directly under them → the bottom-bar links.
 * - A column heading with a URL makes its title a link.
 */

const SOCIAL_TITLE = /follow|social/i;

const link = (item) => ({ id: item.id, label: item.label, href: item.url, target: item.target });

const EMPTY = { columns: [], links: [], socials: [] };

/** { columns: [{ id, title, href, links }], links, socials } for the Footer. Never throws. */
export const getFooterNavigation = cache(async function getFooterNavigation() {
  try {
    const menu = await getSiteMenu("footer");
    if (!menu) return EMPTY;

    const columns = [];
    const links = [];
    const socials = [];
    const addLinks = (heading, items) => (SOCIAL_TITLE.test(heading) ? socials : links).push(...items.map(link));

    menu.items.forEach((top, index) => {
      if (!top.children.length) {
        links.push(link(top));
        return;
      }
      const nested = top.children.some((child) => child.children.length);
      if (!nested) {
        addLinks(top.label, top.children);
        return;
      }
      top.children.forEach((column) => {
        if (SOCIAL_TITLE.test(column.label) || index > 0) addLinks(column.label, column.children.length ? column.children : [column]);
        else columns.push({ id: column.id, title: column.label, href: column.url !== "#" ? column.url : "", links: column.children.map(link) });
      });
    });

    return { columns, links, socials };
  } catch (error) {
    console.error("Unable to load the footer menu.", error);
    return EMPTY;
  }
});
