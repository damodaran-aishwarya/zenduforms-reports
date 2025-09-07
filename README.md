# ZenduForms – All Reports

A small Angular 17 app (standalone components + signals) implementing an **All Reports** page that matches the given figma design.

## Features
- **Header** with icons and active tab
- **Search** (live filtering by name/owner/form)
- **Sort** dropdown (Newest/Oldest by _created date_, or by Name)
- **Paginated** “report cards” with perfectly aligned metadata columns  
  (Icon | Name | Created | Modified | Owner | Form | Actions)
- **Delete** with page-index clamping
- **Strict lint**: no `any`, DI via `inject()`

## Tech
- Angular 17 (standalone), Angular Material (icons/menu)
- Signals (`signal`, `computed`), TypeScript strict
- SCSS with a shared grid for card alignment

## Quickstart (local)
**Requirements**: Node.js LTS, npm

```bash
# install deps
npm ci

# run in dev
ng serve -o

# production build
ng build -c production

# lint
ng lint
