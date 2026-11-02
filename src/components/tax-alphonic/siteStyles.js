// Stylesheets of the CMS block renderers, in the same order as the admin's Live Preview
// (taxalphonic-cms-admin src/site-preview/website/styles.js), so pages look the same in both.
// Imported once by app/layout.jsx; servicesplus-theme.css comes last and puts the Services Plus
// look on top. The components import their own sheets too: each file is still loaded only once.
import "./ta-base.css";
import "./forms/math-captcha.css";
import "./home/home-page.css";
import "./blocks/blocks.css";
import "./tools/tools-page.css";
import "./service-page.css";
import "./journey/journey-page.css";
import "./forms/form-popup.css";
import "./landing/landing.css";
import "./landing/landing-themes.css";
import "./blog/blog.css";
import "./explore/explore.css";
import "./blocks/extra-blocks.css";
import "./servicesplus-theme.css";
