# WxCC Supervisor Skilling Tool

A custom widget for the **Webex Contact Center Supervisor Desktop** that lets supervisors view and update agent skill profiles in real-time — individually or in bulk.

---

## Features

- **View all agents** across your org, filterable by team and searchable by name or email
- **See current skill profiles** for each agent, including a preview of individual skills and proficiency levels
- **Change skill profiles** individually via an edit modal with a live skill preview
- **Customize skill levels** per agent using proficiency sliders (subject to org API permissions)
- **Bulk reassign** skill profiles — select multiple agents and apply a profile in one click
- **Real-time feedback** with toast notifications and per-row saving indicators
- **Refresh** data on demand without reloading the page

---

## Screenshots

> Widget embedded in the Supervisor Desktop navigation panel.

| Agent list with team filter | Edit modal with skill preview |
|---|---|
| Filter agents by team, search by name/email, see current profiles at a glance | Pick a new skill profile and preview its skills with proficiency bars before saving |

---

## How It Works

The widget uses the **Webex Contact Center Management API** to:

1. Fetch all teams, skill profiles, skills, and agents on load
2. Display agents with their currently assigned skill profile
3. Write back skill profile changes via `PUT /organization/{orgId}/agent/{agentId}`

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
   git commit -m "Build widget"
   git push
   ```
3. In GitHub: **Settings → Pages → Deploy from branch → `main` / `/ (root)`**
4. Widget URL:
   ```
   https://kadammmmm.github.io/wxcc-supervisor-skilling/index.js
   ```

### Verify the deployment

Run this in any browser console after GitHub Pages updates (~1–2 min after push):

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
        "script": "https://kadammmmm.github.io/wxcc-supervisor-skilling/index.js",
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

The widget calls the following **Webex Contact Center Management API** endpoints:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/organization/{orgId}/team` | List all teams |
| `GET` | `/organization/{orgId}/skill` | List all skills |
| `GET` | `/organization/{orgId}/skill-profile` | List all skill profiles |
| `GET` | `/organization/{orgId}/agent` | List all agents |
| `GET` | `/organization/{orgId}/agent/{id}` | Get agent details before update |
| `PUT` | `/organization/{orgId}/agent/{id}` | Update agent skill profile |

**Base URL (US):** `https://api.wxcc-us1.cisco.com`

> If your org is on the EU or APJC data center, update `_apiBaseUrl` in `src/supervisor-skilling.js`:
> - EU: `https://api.wxcc-eu1.cisco.com`
> - APJC: `https://api.wxcc-anz1.cisco.com`

---

## Authentication

The widget resolves the auth token automatically using the WxCC Desktop session. It tries the following sources in order:

1. `Desktop.config.getToken()` — SDK method
2. `localStorage` — keys: `access_token`, `accessToken`, `wxcc_token`, `id_token`
3. `sessionStorage` — same keys

The **org ID** is resolved from `Desktop.config.orgId`, `Desktop.userInfo.orgId`, or extracted from the page URL.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Widget shows "Could not retrieve an access token" | Running outside WxCC Desktop | Must be loaded inside Supervisor Desktop |
| API calls return 401 | Token expired or wrong scope | Re-login to Supervisor Desktop |
| API calls return 403 | User lacks supervisor/admin permissions | Check role in Control Hub |
| API calls return 404 | Wrong data center / org ID | Verify `_apiBaseUrl` and org ID |
| "Element defined: false" in console | Script not loading | Check GitHub Pages URL and verify no syntax errors |
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
