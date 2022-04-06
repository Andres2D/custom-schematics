import {
    Rule,
    Tree,
    SchematicContext,
    SchematicsException,
  } from '@angular-devkit/schematics';
  import { dependencies, scripts } from './constants/constants';
  
  export function updatePackageJsonSB(): Rule {
    return (tree: Tree, _context: SchematicContext): Tree => {
      const path = `/package.json`;
      if (tree.exists(path)) {
        const file = tree.read(path);
        const json = JSON.parse(file!.toString());
  
        // Update scripts
        json.scripts = {
          ...json.scripts,
          ...scripts
        };
  
        // Add new dependencies
        json.devDependencies = { ...json.devDependencies, ...dependencies };
  
        tree.overwrite(path, JSON.stringify(json, null, 2));
        return tree;
      }
      throw new SchematicsException(`Does not exist ${path}.`);
    };
  }
  