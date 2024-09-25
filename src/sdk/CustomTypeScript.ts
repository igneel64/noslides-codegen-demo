import {
  getOptionValues,
  OptionValues,
  RenderContext,
  TargetLanguage,
  tsFlowOptions,
  TypeScriptRenderer,
  TypeScriptTargetLanguage,
} from "quicktype-core";

export class CustomTypescriptRenderer extends TypeScriptRenderer {
  constructor(
    targetLanguage: TargetLanguage,
    renderContext: RenderContext,
    typescriptOptions: OptionValues<any>,
    protected readonly generatorFunction: (renderer: TypeScriptRenderer) => void
  ) {
    super(targetLanguage, renderContext, typescriptOptions);
  }

  emitRequiredImports() {
    this.emitLine("import mixpanel from 'mixpanel-browser';")
  }

  emitSource(givenOutputFilename: string): void {
    this.emitRequiredImports()
    super.emitSource(givenOutputFilename);
    this.ensureBlankLine();
    this.generatorFunction(this);
  }
}

/* The extension allows us to pass our own generator functions and customize the default Renderer */
export class CustomTypeScriptLanguage extends TypeScriptTargetLanguage {
  constructor(
    protected readonly generatorFunction: (renderer: TypeScriptRenderer) => void
  ) {
    super();
  }

  protected makeRenderer(
    renderContext: RenderContext,
    untypedOptionValues: { [name: string]: any }
  ): CustomTypescriptRenderer {
    return new CustomTypescriptRenderer(
      this,
      renderContext,
      getOptionValues(tsFlowOptions, untypedOptionValues),
      this.generatorFunction
    );
  }
}
