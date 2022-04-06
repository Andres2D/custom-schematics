// import { Rule, Tree, SchematicContext, apply, url, move, mergeWith } from '@angular-devkit/schematics';
// // import { execSync } from 'child_process';

// export function storybooksEvaluation(option: boolean): Rule {
//     // const sourceTemplatesStorybook = url('./storybook');

//     return (tree: Tree, _context: SchematicContext): Tree => {
//         const sourceTemplatesSB = url('./storybook');
//         if(option) {
//             _context.logger.info('Generating storybooks :art:');
//             const sourceStorybookTemplates = apply(sourceTemplatesSB, [
//                 move('./'),
//             ]);

//             const merge = mergeWith(sourceStorybookTemplates)(tree, _context) as Rule; 

//             return merge;
//             // execSync('npx sb init');
//         }
//         return tree;
//     };
// }
