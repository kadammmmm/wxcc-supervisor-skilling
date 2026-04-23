# WxCC Supervisor Skilling Tool

A custom widget for the **Webex Contact Center Supervisor Desktop** that lets supervisors view and update agent skill profiles in real-time — individually or in bulk — with live skill coverage gap detection.

---

## Features

- **View all agents** across your org, filterable by team and searchable by name or email
- **See current skill profiles** for each agent, including typed skill definitions (proficiency levels, boolean, text values)
- **Change skill profiles** individually via an edit modal with a live skill preview
- **Customize skill levels** per agent using proficiency sliders (subject to org API permissions)
- **Bulk reassign** skill profiles — select multiple agents and apply a profile in one click
- **Team Skill Matrix** — toggle to a grid view with agents as rows and skills as columns, color-coded by proficiency level, showing coverage gaps at a glance
- **Skill Coverage Gaps** — on load, cross-references the Agent Statistics API to find skills with zero available agent coverage right now, surfaced as a dismissible warning banner
- **Real-time feedback** with toast notifications and per-row saving indicators
- **Refresh** data on demand without reloading the page

---

## Screenshots

> Widget embedded in the Supervisor Desktop navigation panel.

| Agent list with team filter | Edit modal with skill preview | Team Skill Matrix |
|---|---|---|
| Filter by team, search by name/email, see current profiles and skill definitions at a glance | Pick a new skill profile and preview its skills before saving | Color-coded grid of agents × skills showing coverage gaps instantly |

---

## How It Works

The widget uses the **Webex Contact Center Management API** and **Statistics API** to:

1. Fetch all teams, skill profiles, skills, and agents on load
2. Display agents with their currently assigned skill profile and typed skill definitions
3. Fetch real-time agent availability from the Statistics API and surface skills with zero available coverage as warnings
4. Write back skill profile changes via `PUT /organization/{orgId}/agent/{agentId}`

Authentication uses the access token already present in the WxCC Desktop session (`window.Desktop` global injected by the runtime).

---

## Project Structure

```
wxcc-supervisor-skilling/
├── src/
│   └── supervisor-skilling.js   # LitElement widget source
├── dist/
│   └── supervisor-skilling.js   # Built IIFE bundle (generated)
├── index.js                     # Copy of dist bundle (served by GitHub Pages)
├── layout-example.json          # Sample Supervisor Desktop layout config
├── rollup.config.js             # Rollup build config (IIFE format)
└── package.json
```

---

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Install & Build

```bash
npm install
npm run build
cp dist/supervisor-skilling.js index.js
```

The build uses [Rollup](https://rollupjs.org/) to produce a self-contained **IIFE bundle** — required because Webex Desktop loads widget scripts as regular `<script>` tags, not ES modules.

---

## Deployment (GitHub Pages)

1. Build the widget (see above)
2. Commit and push `index.js` and `dist/`:
   ```bash
   git add index.js dist/
   git commit -m "Build widget vX.Y.Z"
   git push
   ```
3. In GitHub: **Settings → Pages → Deploy from branch → `main` / `/ (root)`**
   > Use **Deploy from branch**, not GitHub Actions — the bundle is pre-built locally so no CI build step is needed.
4. Widget URL:
   ```
   https://kadammmmm.github.io/wxcc-supervisor-skilling/index.js
   ```

### Cache busting

GitHub Pages CDN caches `index.js` for up to 10 minutes. Append a version query string to the layout config URL so browsers and CDN edges treat each deploy as a new resource:

```
https://kadammmmm.github.io/wxcc-supervisor-skilling/index.js?v=1.6.0
```

Bump `?v=` to match the new version on every deploy.

### Verify the deployment

Run this in any browser console after GitHub Pages updates:

```javascript
fetch('https://kadammmmm.github.io/wxcc-supervisor-skilling/index.js')
  .then(r => r.text())
  .then(code => {
    try { new Function(code); console.log('✅ No syntax errors'); }
    catch(e) { console.log('❌ Syntax error:', e.message); }
  });
```

---

## Supervisor Desktop Layout Configuration

Add the following entries to your layout JSON in **Control Hub → Contact Center → Desktop Layouts**.

Merge the `nav` entry into your existing `nav` array, and add the `page` object to your `pages` array:

```json
{
  "nav": {
    "label": "Skilling",
    "icon": "icon-supervisor-1",
    "navigateTo": "skilling-page",
    "align": "top"
  },
  "page": {
    "id": "skilling-page",
    "widgets": {
      "skilling": {
        "comp": "supervisor-skilling-widget",
        "script": "https://kadammmmm.github.io/wxcc-supervisor-skilling/index.js?v=1.6.0",
        "properties": {
          "style": "width:100%;height:100%;overflow:hidden"
        }
      }
    },
    "layout": {
      "areas": [["skilling"]],
      "size": {
        "cols": [1],
        "rows": [1]
      }
    }
  }
}
```

> See [`layout-example.json`](layout-example.json) for the complete standalone example.

---

## API Reference

The widget calls the following **Webex Contact Center** endpoints:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/organization/{orgId}/v2/team` | List all teams |
| `GET` | `/organization/{orgId}/v2/skill` | List all skill definitions |
| `GET` | `/organization/{orgId}/v2/skill-profile` | List all skill profiles (includes `activeSkills`) |
| `GET` | `/organization/{orgId}/v2/agent` | List all agents |
| `GET` | `/organization/{orgId}/v2/agent/{id}` | Get agent details before update |
| `PUT` | `/organization/{orgId}/v2/agent/{id}` | Update agent skill profile |
| `GET` | `/v1/agents/statistics` | Real-time agent state for coverage gap detection |

**Base URL (US):** `https://api.wxcc-us1.cisco.com`

> If your org is on the EU or APJC data center, update `_apiBaseUrl` in `src/supervisor-skilling.js`:
> - EU: `https://api.wxcc-eu1.cisco.com`
> - APJC: `https://api.wxcc-anz1.cisco.com`

---

## Authentication

The widget resolves the auth token automatically using the WxCC Desktop session. It tries the following sources in order:

1. `Desktop.actions.getToken()` — SDK method
2. `localStorage` — keys: `access_token`, `accessToken`, `wxcc_token`, `id_token`
3. `sessionStorage` — same keys

The **org ID** is resolved from `window.wxcc.orgId`, the page URL, or extracted from `GET https://webexapis.com/v1/people/me`.

---

## Skill Coverage Gaps

On load (and every Refresh), the widget calls `GET /v1/agents/statistics` to identify agents currently in **Available** state. It cross-references their assigned skill profiles against all skills in use across the org. Any skill with zero available agents surfaces as a warning pill in an amber banner above the agent table.

The banner is **dismissible** and **resets on each Refresh**. If the Statistics API is unreachable (e.g. insufficient permissions), the banner is silently hidden — no error is shown.

---

## Team Skill Matrix

Toggle from **☰ List** to **⊞ Matrix** using the control in the toolbar. The matrix shows:

- Agents as rows, skill definitions as columns
- **Proficiency cells** color-coded: green (7–10), amber (4–6), red (1–3)
- **Boolean skills** shown as a ✓ chip
- **Text skills** shown inline
- **Missing skills** (not in the agent's profile) shown as `—`
- Agent name column and header row are **sticky** for large grids
- Team filter and search apply to the matrix view

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Widget shows "Could not retrieve an access token" | Running outside WxCC Desktop | Must be loaded inside Supervisor Desktop |
| API calls return 401 | Token expired or wrong scope | Re-login to Supervisor Desktop |
| API calls return 403 | User lacks supervisor/admin permissions | Check role in Control Hub |
| API calls return 404 | Wrong data center / org ID | Verify `_apiBaseUrl` and org ID |
| Widget still shows old version after deploy | GitHub Pages CDN cache | Add/bump `?v=X.Y.Z` query string in layout config URL |
| Coverage gap banner never appears | Statistics API unreachable or no available agents | Check `[skilling] agent-stats` console lines for details |
| Skills column shows `—` for all agents | Agents have no skill profile assigned | Assign profiles via the Edit button |
| Skill profile changes return 400 | Org restrictions on direct API writes | Contact your WxCC administrator |

---

## Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| [Lit](https://lit.dev) | 3.x | Web component framework |
| [@wxcc-desktop/sdk](https://www.npmjs.com/package/@wxcc-desktop/sdk) | 1.x | WxCC Desktop runtime integration |
| [Rollup](https://rollupjs.org) | 4.x | IIFE bundle build |

---

## License

MIT
