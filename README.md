[![Payload CMS](https://camo.githubusercontent.com/4b3ec65b23ca3888b43a57bc72a63066ed4051ca0c0d2eddd39ea8d440d51119/68747470733a2f2f636d732e7061796c6f6164636d732e636f6d2f6d656469612f7061796c6f61642d6769746875622d6865616465722e6a7067)](https://payloadcms.com/)

# Backend powered by Payload CMS

### Local development

- `npm install` to install the needed dependencies.
- Install and configure the [Railway CLI](https://docs.railway.app/develop/cli)
- `railway run npm run dev` will start up your application and reload on any changes.
- `pnpm` might work, untested yet.

### To do

- Fix [duplicate post](https://github.com/payloadcms/payload/issues/1243) issue
- White label branding
- [Dashboard analytics](https://github.com/NouanceLabs/payload-dashboard-analytics)

### Recommended infrastructure

- Railway: DB, front end, and CMS _or_ Payload Cloud
- Cloudflare DNS
- Sendgrid
- Google or Plausible analytics
- Uptimerobot monitoring
