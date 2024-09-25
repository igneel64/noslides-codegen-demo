import {
  JSONSchema,
  JSONSchemaAttributes,
  JSONSchemaType,
  Ref,
  TypeAttributeKind,
} from "quicktype-core";
import { StringMap } from "quicktype-core/dist/support/Support";

/**
 * Extracts and injects the raw schema into the attributes
 */
export function eventAttributesProducer(
  schema: JSONSchema,
  _canonicalRef: Ref | undefined,
  _types: Set<JSONSchemaType>
): JSONSchemaAttributes | undefined {
  if (typeof schema !== "object") return undefined;

  const metadata = eventMetadataAttributeKind.makeAttributes({
    raw: schema,
  });

  return { forType: metadata };
}

export interface EventMetadata {
  raw: StringMap;
}

class EventMetadataAttributeKind extends TypeAttributeKind<EventMetadata> {
  constructor() {
    super("eventMetadata");
  }

  combine(attrs: EventMetadata[]): EventMetadata | undefined {
    return attrs[0];
  }

  makeInferred(_: EventMetadata): undefined {
    return undefined;
  }
}

export const eventMetadataAttributeKind: TypeAttributeKind<EventMetadata> =
  new EventMetadataAttributeKind();
