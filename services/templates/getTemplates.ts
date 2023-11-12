import type { Template } from "@/types/Templates.d";

export default async function getTemplates(): Promise<Template[]> {
  // this can connect to any database and return the data
  // for now we mock it
  const templates: Template[] = [
    {
      id: "1",
      name: "Vigo",
      alignment: "left",
    },
    {
      id: "2",
      name: "Madrid",
      alignment: "center",
    },
    {
      id: "3",
      name: "Barcelona",
      alignment: "right",
    },
  ];
  return templates;
}
