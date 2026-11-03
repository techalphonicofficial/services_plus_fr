import LegacyPrivacyPolicyPage, { metadata } from "@/features/legacy/LegacyPrivacyPolicyPage";
import { cmsFirstRoute } from "@/features/legacy/cmsFirstRoute";

// /policy/privacy-policy: the CMS page / service with this slug (admin), else the old hardcoded page.
const route = cmsFirstRoute("/policy/privacy-policy", LegacyPrivacyPolicyPage, metadata);

export const generateMetadata = route.generateMetadata;
export default route.Page;
