import fs from "node:fs";
import path from "node:path";

import {
  quicktype,
  InputData,
  JSONSchemaInput,
} from "quicktype-core";
import { CustomTypeScriptLanguage } from "./CustomTypeScript";
import { generator } from "./generator";
import { eventAttributesProducer } from "./metadata";

/* More info for all the boilerplate and how it works at http://blog.quicktype.io/customizing-quicktype/ */
async function main(): Promise<void> {
  const inputData = new InputData();
  const schema = fs.readFileSync(path.join(__dirname, "../json-inputs/player.json"), "utf8");
  const name = JSON.parse(schema).title;
  const source = { name, schema };
  await inputData.addSource(
    "schema",
    source,
    () => new JSONSchemaInput(undefined, [eventAttributesProducer])
  );

  const lang = new CustomTypeScriptLanguage(generator)

  console.log(lang.optionDefinitions)

  // What we get back from running "quicktype" is the source code as an array of lines.
  const { lines } = await quicktype({
    lang,
    inputData,
    rendererOptions: {
      "just-types": true,
      "prefer-unions": true,
      "prefer-types": true,
    },
  });

  for (const line of lines) {
    console.log(line);
  }

  fs.writeFileSync("tracking.ts", lines.join("\n"));
}

main();
