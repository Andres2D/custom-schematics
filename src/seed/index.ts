import { 
  Rule, 
  SchematicContext, 
  Tree, 
  apply, 
  mergeWith, 
  url, 
  SchematicsException, 
  move, 
  template,
  MergeStrategy
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { parseName } from '@schematics/angular/utility/parse-name';
import { buildDefaultPath } from '@schematics/angular/utility/project';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';

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
      move(path),
    ]);

    if(_options.storybooks) {
      _context.addTask(new RunSchematicTask('storybook', { storybook: _options.story }));
    }

    return mergeWith(sourceParametrizedTemplates, MergeStrategy.Overwrite) as Rule;
  };
}
