import { StringMap } from "quicktype-core/dist/support/Support";

export function findSchemaPii(jsonSchema: StringMap | undefined) {
  if (typeof jsonSchema === "undefined") {
    return [];
  }
  return Object.entries(jsonSchema.properties as StringMap).reduce<string[]>(
    (piiArray, [key, properties]) => {
      if (Object.hasOwn(properties, "pii") && properties.pii === true) {
        piiArray.push(key);
      }
      return piiArray;
    },
    []
  );
}
