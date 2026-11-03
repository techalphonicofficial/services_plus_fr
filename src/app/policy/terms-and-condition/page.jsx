import LegacyTermsPage, { metadata } from "@/features/legacy/LegacyTermsPage";
import { cmsFirstRoute } from "@/features/legacy/cmsFirstRoute";

// /policy/terms-and-condition: the CMS page / service with this slug (admin), else the old hardcoded page.
const route = cmsFirstRoute("/policy/terms-and-condition", LegacyTermsPage, metadata);

export const generateMetadata = route.generateMetadata;
export default route.Page;
