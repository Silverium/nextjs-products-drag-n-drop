import { Template } from "@/types/Templates";

export default function getTemplateStyle(template: Template) {
  switch (template.alignment) {
    case "left":
      return "justify-start";
    case "center":
      return "justify-center";
    case "right":
      return "justify-end";
    default:
      return "justify-center";
  }
}
