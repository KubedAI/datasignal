import type { Framework } from "../types";

export const superset: Framework = {
  id: "superset",
  name: "Apache Superset",
  short: "Superset",
  category: "Visualization",
  color: "#20A7C9",
  tagline: "Open-source BI and data exploration at scale",
  signals: [
    {
      id: 1,
      tag: "Caching",
      headline: "Redis cache layer: identical dashboard queries return in milliseconds",
      detail: "Superset's query results cache uses Redis. Enable CACHE_CONFIG with REDIS_URL and set CACHE_DEFAULT_TIMEOUT=300. Identical queries from multiple dashboard users return from cache — the underlying database (Trino, StarRocks) only gets queried once per TTL window. Reduces database query load by 80% for popular dashboards.",
      metric: "<50ms",
      metricLabel: "cache-hit dashboard queries",
    },
    {
      id: 2,
      tag: "Async",
      headline: "Async query execution prevents Superset timeout on slow databases",
      detail: "By default Superset queries are synchronous — browser waits, times out on long queries. Enable async execution: GLOBAL_ASYNC_QUERIES=True with a Celery worker + Redis result backend. Users get a spinner instead of a timeout. Celery workers run the query independently; browser polls for results. Essential for Trino/Spark SQL queries.",
      metric: "0 timeouts",
      metricLabel: "with async query enabled",
    },
    {
      id: 3,
      tag: "Kubernetes",
      headline: "Helm deploy Superset on EKS: web + workers + beat as separate pods",
      detail: "The official Superset Helm chart deploys web servers, Celery workers, and Celery beat (scheduler) as separate Deployments. Scale web and workers independently. Workers on Spot instances handle async query load. Web servers on On-Demand for consistent availability. Beat scheduler needs only 1 replica.",
      metric: "3 tiers",
      metricLabel: "scaled independently on EKS",
    },
    {
      id: 4,
      tag: "RBAC",
      headline: "Row-level security filters enable true multi-tenant dashboards",
      detail: "Superset Row Level Security adds WHERE clauses automatically based on the logged-in user's role. A single dashboard serves 50 customers — each only sees their own data. RLS filters apply at query execution time, not at the data level. Combine with database-level IRSA for defense-in-depth.",
      metric: "1 dashboard",
      metricLabel: "serves N tenants securely",
    },
    {
      id: 5,
      tag: "Performance",
      headline: "Pre-warm dashboards with THUMBNAIL_CACHE to avoid cold starts",
      detail: "Superset can pre-generate dashboard thumbnails and cache full dashboard query results on a schedule. Configure THUMBNAIL_CACHE_CONFIG and set up a Celery beat job to warm caches before business hours. First load of the day for executives hits cache, not Trino at 8AM peak load.",
      metric: "Warm cache",
      metricLabel: "before 8AM dashboard rush",
    },
  ],
};
