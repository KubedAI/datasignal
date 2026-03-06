# Cloudflare Setup for datasignal.dev → GitHub Pages

## Overview
GitHub Pages hosts the site. Cloudflare sits in front as CDN + DNS + SSL.

---

## Step 1 — Push to GitHub Pages first

In your repo settings (github.com/vara-bonthu/datalink → Settings → Pages):
- Source: **GitHub Actions** (uses the `deploy.yml` workflow)
- Custom domain: `datasignal.dev`

GitHub will create a `CNAME` file in your repo root — this is already done (`public/CNAME`).

---

## Step 2 — Add your domain to Cloudflare

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Add a Site**
2. Enter `datasignal.dev`
3. Select the **Free** plan
4. Cloudflare will scan existing DNS records — you can skip or import them

---

## Step 3 — Set DNS records in Cloudflare

Delete any existing A/CNAME records for `datasignal.dev`, then add:

| Type  | Name           | Value                      | Proxy  |
|-------|---------------|----------------------------|--------|
| A     | @             | 185.199.108.153             | ON     |
| A     | @             | 185.199.109.153             | ON     |
| A     | @             | 185.199.110.153             | ON     |
| A     | @             | 185.199.111.153             | ON     |
| CNAME | www           | vara-bonthu.github.io       | ON     |

> These are GitHub Pages' IP addresses. All 4 A records are needed for redundancy.
> The CNAME for `www` redirects to the apex.

---

## Step 4 — Update your domain registrar's nameservers

Cloudflare will give you two nameservers like:
```
aria.ns.cloudflare.com
beau.ns.cloudflare.com
```

Go to wherever you bought `datasignal.dev` (Google Domains, Namecheap, etc.) and replace the nameservers with the Cloudflare ones. DNS propagation takes 5–30 minutes.

---

## Step 5 — SSL/TLS settings in Cloudflare

**SSL/TLS → Overview**: Set to **Full (strict)**

> - "Flexible" encrypts browser→Cloudflare only. Don't use it.
> - "Full (strict)" encrypts browser→Cloudflare→GitHub Pages end-to-end.

**SSL/TLS → Edge Certificates**:
- Always Use HTTPS: **ON**
- Minimum TLS Version: **TLS 1.2**
- Opportunistic Encryption: **ON**
- HTTP Strict Transport Security (HSTS): Enable with `max-age=31536000`

---

## Step 6 — Performance settings in Cloudflare

**Speed → Optimization**:
- Auto Minify: CSS ✓, JavaScript ✓, HTML ✓
- Brotli: **ON**

**Caching → Configuration**:
- Caching Level: **Standard**
- Browser Cache TTL: **4 hours** (Cloudflare respects Astro's asset hashing)

**Cache Rules** (Caching → Cache Rules → Create Rule):

Rule 1 — Long-cache for hashed assets:
```
Field: URI Path
Operator: starts with
Value: /_astro/
→ Cache TTL: 1 year (browser + edge)
```

Rule 2 — Short-cache for HTML:
```
Field: URI Extension
Operator: does not contain
Value: (leave empty — match all HTML)
→ Edge Cache TTL: 10 minutes
→ Browser Cache TTL: 2 minutes
```

---

## Step 7 — Security settings

**Security → Settings**:
- Security Level: **Medium**
- Bot Fight Mode: **ON**

**Security → WAF**: No rules needed for a static site.

---

## Step 8 — Verify

```bash
# Check DNS propagation
dig datasignal.dev +short

# Should return GitHub Pages IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153

# Check SSL
curl -I https://datasignal.dev

# Should show:
# HTTP/2 200
# server: cloudflare
```

---

## Troubleshooting

**GitHub Pages shows "Domain not verified":**
- Add the TXT record GitHub shows you in Cloudflare DNS
- Wait 5 minutes, click Verify again

**Cloudflare shows "DNS_PROBE_FINISHED_NXDOMAIN":**
- Nameserver change hasn't propagated yet — wait up to 24h

**"Too many redirects" error:**
- Your SSL/TLS is set to "Flexible" while GitHub also redirects to HTTPS
- Fix: Set SSL/TLS to **Full** or **Full (strict)**

**Site shows old content after deploy:**
- Cloudflare is serving cached version
- Purge cache: dash.cloudflare.com → Caching → Purge Everything
- Or add a Cache Rule to bypass cache for HTML pages

---

## Optional: Cloudflare Workers for dynamic OG images

To generate per-signal OG images (so LinkedIn previews show the actual signal card), you can use a Cloudflare Worker:

1. Worker intercepts requests to `/?fw=spark&s=3`
2. Generates an OG image using [Satori](https://github.com/vercel/satori) or a template
3. Returns it as `og:image` in a custom HTML wrapper

This requires Cloudflare Workers (free tier: 100k req/day). File a request if you want this set up.
