# Targets

0. Engineers hate tracking tasks, make it less of a pain.
1. Improve data quality. Misspelling, missing updates.
2. Bake-in input critical functionality e.g. value redaction.

# Feature 1

Create TypeScript compatible code to push an entity to the `dataLayer`.

**Steps**
1. Create a custom TypeScript language to allow for custom generator function rendering.
2. Create the new template `dataLayer.eta`.


# Feature 2

On our JSONSchema definitions, there can be an attribute for each property with the type of `"pii": boolean`. This signifies that this information is Personal Identifiable Information (_PII_) and should be redacted from our tracking tools.

**Steps**
1. Add the capability for the generator to discover schema attributes for each entity. Use the Quicktype metadata capabilities.
2. Create the template function to loop and redact the values.

# Feature 3

Create a new template that tracks the entity as a Mixpanel event.

**Steps**
1. Create the new template `mixpanel.eta`.
2. Add automatic imports for the generated file in the TypeScript renderer.
