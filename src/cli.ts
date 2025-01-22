// cli.ts
/**
 * Command-line interface for the Place Finder application
 * Provides a user-friendly way to search for places using Google Maps API
 * 
 * @module cli
 */

import { Command } from 'commander';
import { findPlace } from './placeFinder';
import chalk from 'chalk';

const program = new Command();

program
    .name('place-finder')
    .description('CLI to find information about places using Google Maps API')
    .version('1.0.0')
    .argument('<place>', 'Name of the place to search for (e.g., "Paris, France")')
    .option('-j, --json', 'Output results in JSON format instead of human-readable text')
    .action(async (place: string, options: { json: boolean }) => {
        try {
            const result = await findPlace(place);

            if (options.json) {
                console.log(JSON.stringify(result, null, 2));
                return;
            }

            if (!result.found) {
                console.error(chalk.red(result.message));
                process.exit(1);
            }

            console.log(chalk.bold('\nPlace Information:'));
            console.log(chalk.cyan('Place:'), result.place);
            console.log(chalk.cyan('Type:'), result.locationType);
            if (result.city) console.log(chalk.cyan('City:'), result.city);
            console.log(chalk.cyan('Country:'), `${result.country} (${result.countryCode})`);
            console.log(chalk.cyan('Coordinates:'), `${result.coordinates?.lat}, ${result.coordinates?.lng}`);
        } catch (error) {
            console.error(chalk.red('Error:'), error instanceof Error ? error.message : 'Unknown error occurred');
            process.exit(1);
        }
    });

    program.parse();
