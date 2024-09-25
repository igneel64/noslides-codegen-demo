import { ClassType, ConvenienceRenderer, EnumType, Name } from "quicktype-core";
import { eventMetadataAttributeKind } from "./metadata";
import { findSchemaPii } from "./utils";
import { createTemplateOutput } from "./templating";

export type TemplateVariables = {
  types: TypeDescription[];
};

type TypeDescription = {
  typeName: string;
  description: string;
  piiAttributes: string[];
};

export function generator(renderer: ConvenienceRenderer) {
  const templateVariables: TemplateVariables = { types: [] };

  // @ts-expect-error Protected
  renderer.forEachNamedType(
    "leading-and-interposing",
    (type: ClassType, name: Name) => {
      const attributes = type.getAttributes().get(eventMetadataAttributeKind);
      const piiAttributes = findSchemaPii(attributes.raw);

      // @ts-expect-error Protected
      const typeName = renderer.sourcelikeToString(name);
      // @ts-expect-error Protected
      const description = renderer.descriptionForType(type)?.join(" ") || "";
      templateVariables.types.push({ typeName, description, piiAttributes });
    },
    (e: EnumType, enumName: Name) => {}
  );

  const templateOutput = createTemplateOutput(templateVariables)

  // @ts-expect-error Protected
  return renderer.emitMultiline(templateOutput);
}
