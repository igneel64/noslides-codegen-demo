import path from "node:path";
import { Eta } from "eta";
import { TemplateVariables } from "./generator";

export const createTemplateOutput = (templateVariables: TemplateVariables) => {
  const eta = new Eta({
    views: path.join(__dirname, "templates"),
    varName: "data",
  });

  const templateOutput = eta.render("./mixpanel", {
    ...templateVariables,
    helpers: {
      startLow: (str: string) => {
        if (str && typeof str === "string") {
          return str.charAt(0).toLowerCase().concat(str.slice(1));
        }
        return "";
      },
      rawStringArray: (arr: string[]) => {
        return `["${arr.join('","')}"]`;
      },
    },
  });

  return templateOutput;
};
