import LegacyNotificationPage, { metadata } from "@/features/legacy/LegacyNotificationPage";
import { cmsFirstRoute } from "@/features/legacy/cmsFirstRoute";

// /notification: the CMS page / service with this slug (admin), else the old hardcoded page.
const route = cmsFirstRoute("/notification", LegacyNotificationPage, metadata);

export const generateMetadata = route.generateMetadata;
export default route.Page;
