import { 
  Rule, 
  SchematicContext, 
  Tree, 
  apply, 
  mergeWith, 
  template, 
  url, 
  SchematicsException, 
  move 
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from '@schematics/angular/utility/project';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function seed(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workSpaceConfigBuffer = tree.read('angular.json');
    if(!workSpaceConfigBuffer) {
      throw new SchematicsException('Not an Angular CLI workspace');
    }

    const workspaceConfig = JSON.parse(workSpaceConfigBuffer.toString());
    const projectName = _options.project || workspaceConfig.defaultProject;
    const project = workspaceConfig.projects[projectName];

    const defaultProjectPath = buildDefaultPath(project);

    const parsedPath = parseName(defaultProjectPath, _options.name);

    const { name, path } = parsedPath;

    const sourceTemplates = url('./files');
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        name
      }),
      move(path)
    ]);

    return mergeWith(sourceParametrizedTemplates)(tree, _context);
  };
}
