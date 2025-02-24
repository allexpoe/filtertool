# Allex filter tool

## Setup and configuration

Install all packages with
```bash
npm install
```

The FILTER_PATH environment variable needs to be set in a `.env` file in the root directory and should point to the Path of Exile filter folder (or the folder which you want the filter to be exported to).

```filename=".env"
FILTER_PATH="C:\Users\user\Documents\My Games\Path of Exile"
```

## Exporting filters

Filters are kept in `src/filters` and export a `getFilter()` function from their index file. Filters can be exported using the `export` npm script like so:

```bash
npm run export filtername
```