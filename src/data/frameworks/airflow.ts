import type { Framework } from "../types";

export const airflow: Framework = {
  id: "airflow",
  name: "Apache Airflow",
  short: "Airflow",
  category: "Orchestration",
  color: "#017CEE",
  tagline: "Python-first workflow orchestration at scale",
  signals: [
    {
      id: 1,
      tag: "KubernetesExecutor",
      headline: "KubernetesExecutor: each task gets its own pod, no shared worker state",
      detail: "With KubernetesExecutor, every Airflow task launches its own Kubernetes pod and terminates when done. Zero shared state between tasks, perfect isolation, and horizontal scaling with Karpenter. No Celery cluster to manage. Spot instances for task pods reduce compute costs 60–70% vs On-Demand workers.",
      metric: "1 pod",
      metricLabel: "per task, zero shared state",
    },
    {
      id: 2,
      tag: "DAG Design",
      headline: "Small atomic tasks beat monolithic operators for retries",
      detail: "Monolithic tasks that download, transform, and upload in one step restart from scratch on failure. Split into atomic tasks: Extract → Validate → Transform → Load. Each stage writes to S3 as a checkpoint. Retrying only the failed stage saves hours of recompute on large datasets. Airflow's XCom handles intermediate S3 paths.",
      metric: "Stage-level",
      metricLabel: "retry, not full-pipeline",
    },
    {
      id: 3,
      tag: "GitSync",
      headline: "GitSync DAG deployment: DAG changes deploy in seconds, not minutes",
      detail: "Mount DAGs from a Git repository using the official GitSync sidecar rather than baking DAGs into the Airflow image. Changes push to Git → GitSync polls every 60s → DAGs appear in the UI without any pod restart. Enables DAG development without touching infrastructure.",
      metric: "60s",
      metricLabel: "DAG deployment lag from git push",
    },
    {
      id: 4,
      tag: "Scaling",
      headline: "KEDA on Airflow scheduler queue prevents cold-start queuing",
      detail: "Use KEDA to scale Airflow workers based on the number of queued tasks in the Celery or database queue. Without auto-scaling, a burst of DAG runs queues behind idle workers. KEDA scales workers up within seconds of task queue depth rising above threshold. Combine with Karpenter for node provisioning.",
      metric: "<30s",
      metricLabel: "from task queued to worker ready",
    },
    {
      id: 5,
      tag: "Observability",
      headline: "StatsD + Prometheus: every DAG metric without writing a line of code",
      detail: "Airflow ships built-in StatsD metrics: task duration, success/failure counts, scheduler heartbeat, pool slots used. Configure the StatsD exporter and scrape with Prometheus. Build Grafana dashboards for SLA tracking, DAG bottleneck identification, and worker utilization — all from native Airflow instrumentation.",
      metric: "60+ metrics",
      metricLabel: "from native Airflow StatsD",
    },
  ],
};
