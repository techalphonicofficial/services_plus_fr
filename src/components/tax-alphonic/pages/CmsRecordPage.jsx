import ApiPage from "./ApiPage";
import ApiServicePage from "./ApiServicePage";
import JourneySections from "../journey/JourneySections";
import { isJourneySection } from "../journey/journeyBlockTypes";
import ToolSections from "../tools/ToolSections";
import { isToolSection } from "../tools/toolBlockTypes";
import JsonLd from "@/components/seo/JsonLd";
import { getJourneyStages } from "@/service/journeyService";
import { getTools } from "@/service/toolsService";

/**
 * Renders a CMS record from service/recordService.js (server component):
 * Journey Stage pages and free tool pages have their own full-width layouts, other CMS pages go
 * through ApiPage, services and pSEO pages through the service page layout (ApiServicePage).
 */
export default async function CmsRecordPage({ resolved }) {
  const { kind, record } = resolved;

  if (kind === "page" && record.sections?.some(isJourneySection)) {
    const stages = await getJourneyStages();
    return (
      <>
        <JsonLd value={record.schemaMarkup} />
        <JourneySections sections={record.sections} stages={stages} page={record} />
      </>
    );
  }
  if (kind === "page" && record.sections?.some(isToolSection)) {
    const tools = await getTools();
    return (
      <>
        <JsonLd value={record.schemaMarkup} />
        <ToolSections sections={record.sections} tools={tools} page={record} />
      </>
    );
  }
  if (kind === "page") return <ApiPage page={record} />;
  return <ApiServicePage service={record} />;
}
