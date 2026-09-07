import type { Metadata } from "next";

import { Homepage } from "../../content/homepage";
import { getHomePage } from "../../content/utils";
import { JsonLd } from "../../lib/metadata/json-ld";
import { defaultMetadata } from "../../lib/metadata/shared-metadata";
import {
  createJsonLDGraph,
  getJsonLDFAQPage,
  getJsonLDHowTo,
  getJsonLDOrganization,
  getJsonLDProduct,
  getJsonLDSoftwareApplication,
  getJsonLDWebPage,
} from "../../lib/metadata/structured-data";

export const metadata: Metadata = defaultMetadata;

export default function Page() {
  const homePage = getHomePage();

  const jsonLDGraph = createJsonLDGraph([
    getJsonLDOrganization(),
    getJsonLDProduct(),
    getJsonLDSoftwareApplication(),
    getJsonLDWebPage(homePage),
    getJsonLDHowTo(homePage),
    getJsonLDFAQPage(homePage),
  ]);

  return (
    <>
      <JsonLd graph={jsonLDGraph} />
      <Homepage metadata={homePage.metadata} />
    </>
  );
}
