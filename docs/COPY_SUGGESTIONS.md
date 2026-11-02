# Copy & Content Suggestions (For Owner Approval)

Per project rules, **all existing SEO headings, H1s, meta descriptions, and crawled body copy have been preserved in the live DOM** without adding filler buzzwords. Below are recommended copy refinements for owner review and approval:

## 1. Homepage Headings (Currently Preserved As-Is)
- **Current H1**: `"Empower Your Business Compliance & Management Made Easy With Us"`
  - *Suggestion for future SEO test*: `"Company Registration, Tax & Legal Compliance in India"` (clearer primary keyword front-loading, 52 chars).
- **Current About H2**: `"Revolutionize Industry with Expert Solutions"`
  - *Suggestion*: `"Thirteen years of corporate legal and tax advisory"` (replaces generic "revolutionize" with concrete track record).
- **Current Process H2**: `"How Services Plus Delivers Excellence with Agile Process"`
  - *Suggestion*: `"Four steps from consultation to statutory approval"` (concrete, scannable).
- **Current Why Us H2**: `"Reasons Why Services Plus Is the Best Technology Partner"`
  - *Suggestion*: `"Why 42,800+ Indian businesses file through Services Plus"` (evidence-led).
- **Current CTA Band & FAQ #1 Heading**: `"Maximize your results while minimizing constraints with our solutions"`
  - *Note*: On the legacy Laravel site, this template heading was accidentally duplicated into the first FAQ item (`"Because good design makes great business"`).
  - *Suggestion*: Replace FAQ #1 with a real statutory question (e.g., `"How do I choose between a Private Limited Company, LLP, and OPC?"`) once approved by the SEO owner.

## 2. Service Page Scraped Artifacts (`private-limited-company` & peers)
- Several scraped service JSON records contain legacy template strings from the old site such as:
  - `"Discover why our customers love our jewellery collection and shopping experience."` (under `"What Our Customers Say"`).
  - Generic section headings (`"Section 7"`, `"Section 8"`, `"Section 14"`).
- *Recommendation*: Approve a content-cleaning migration pass on `src/content/services/items/*.json` to replace `"Section N"` with semantic subheadings and remove the stray jewellery template subtitle while keeping customer testimonials intact.

