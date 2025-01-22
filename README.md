# Place Finder

A command-line tool that uses the Google Maps API to find and display information about places, cities, and countries.

## Features

- Search for any place, city, or country
- Get detailed information including:
  - Full formatted address
  - Location type (city/country)
  - Country information
  - Precise coordinates
- Output in human-readable format or JSON

## Prerequisites

- Node.js
- Google Maps API key

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up your Google Maps API key:
   ```bash
   export GOOGLE_MAPS_API_KEY='your-api-key-here'
   ```

## Usage

Basic search:
```bash
pnpm start "Paris, France"
```

JSON output:
```bash
pnpm start "Tokyo, Japan" --json
```

## API Response

The tool returns:
- Place name and formatted address
- Location type (city/country)
- City name (when applicable)
- Country name and code
- Latitude and longitude coordinates

## Error Handling

- Handles invalid API keys
- Manages places not found
- Provides clear error messages
