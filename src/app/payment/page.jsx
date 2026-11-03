import LegacyPaymentPage, { metadata } from "@/features/legacy/LegacyPaymentPage";
import { cmsFirstRoute } from "@/features/legacy/cmsFirstRoute";

// /payment: the CMS page / service with this slug (admin), else the old hardcoded page.
const route = cmsFirstRoute("/payment", LegacyPaymentPage, metadata);

export const generateMetadata = route.generateMetadata;
export default route.Page;
