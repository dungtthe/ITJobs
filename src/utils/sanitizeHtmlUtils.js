import DOMPurify from "dompurify";
export const sanitizeHtml = (html) => {
  const clean = DOMPurify.sanitize(html, {
    ADD_ATTR: ["width", "height", "style", "align", "alt", "border", "src"],
    ADD_TAGS: ["img"],
    FORBID_ATTR: {},
    FORBID_TAGS: [],
    ALLOW_DATA_ATTR: true,
    WHOLE_DOCUMENT: false,
    SANITIZE_DOM: true,
    KEEP_CONTENT: true,
  });
  return clean;
};
