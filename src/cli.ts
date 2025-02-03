#!/usr/bin/env ts-node

import { Command } from 'commander';
import { runReview } from './commands/review';

const program = new Command();

program
  .name('ai-review')
  .description('AI Code Review CLI Tool')
  .version('1.0.0');

program
  .command('review')
  .description('Run AI code review for the latest changes')
  .option('--from <commit>', 'Specify the starting commit for the diff', 'HEAD~1')
  .option('--to <commit>', 'Specify the ending commit for the diff', 'HEAD')
  .action((options) => {
    runReview(options);
  });

program.parse(process.argv);
