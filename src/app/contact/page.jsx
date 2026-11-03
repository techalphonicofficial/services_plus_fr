import LegacyContactPage, { metadata } from "@/features/legacy/LegacyContactPage";
import { cmsFirstRoute } from "@/features/legacy/cmsFirstRoute";

// /contact: the CMS page / service with this slug (admin), else the old hardcoded page.
const route = cmsFirstRoute("/contact", LegacyContactPage, metadata);

export const generateMetadata = route.generateMetadata;
export default route.Page;
