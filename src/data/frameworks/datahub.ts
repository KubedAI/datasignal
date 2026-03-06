import type { Framework } from "../types";

export const datahub: Framework = {
  id: "datahub",
  name: "DataHub",
  short: "DataHub",
  category: "Governance",
  color: "#5B8DEF",
  tagline: "Data catalog, lineage, and governance for the modern data stack",
  signals: [
    {
      id: 1,
      tag: "Lineage",
      headline: "Automated lineage from Spark, Airflow, dbt — zero manual annotation",
      detail: "DataHub ingestion connectors automatically capture column-level lineage from Spark jobs (via SparkListener), Airflow DAGs (via plugin), and dbt models (via artifacts). No manual lineage annotation. When a Spark job reads table A and writes table B, DataHub records the full column mapping automatically.",
      metric: "Automatic",
      metricLabel: "column-level lineage",
    },
    {
      id: 2,
      tag: "EKS",
      headline: "DataHub on EKS: Kafka + Elasticsearch + MySQL all via Helm",
      detail: "DataHub's Helm chart deploys the full stack: GMS (backend), MCE/MAE consumers (Kafka), frontend, Elasticsearch (search), MySQL (storage), and Kafka (event bus). Use managed AWS services (MSK, OpenSearch, Aurora) in production instead of in-cluster Kafka/ES. Reduces operational burden significantly.",
      metric: "1 Helm chart",
      metricLabel: "deploys full DataHub stack",
    },
    {
      id: 3,
      tag: "Ingestion",
      headline: "CLI ingestion bootstraps your catalog from existing S3/Glue metadata",
      detail: "datahub ingest -c glue.yml — the DataHub CLI reads AWS Glue catalog and populates DataHub with all tables, schemas, and partition information. Run this as a scheduled Kubernetes Job (daily) to keep DataHub in sync. For Iceberg: use the iceberg ingestion source to capture snapshot metadata and schema evolution history.",
      metric: "100s of tables",
      metricLabel: "cataloged from Glue in minutes",
    },
    {
      id: 4,
      tag: "Governance",
      headline: "Tag-based data classification + ownership blocks ungoverned data growth",
      detail: "DataHub's tag system lets you classify datasets (PII, GDPR, SOC2) and assign ownership (team, on-call). Set up policies that block downstream consumption of unclassified tables. DataHub can emit events to Kafka when governance policies are violated — triggering Airflow DAG pauses or Slack alerts.",
      metric: "0 ungoverned",
      metricLabel: "datasets reach production",
    },
    {
      id: 5,
      tag: "Search",
      headline: "Size Elasticsearch correctly — DataHub search degrades at low heap",
      detail: "DataHub's search is backed by Elasticsearch. Undersized ES nodes cause search latency spikes and catalog slowdowns at scale. Production sizing: 3 ES nodes, 16GB heap each, 100GB SSD storage per node for up to 10M assets. On EKS, use gp3 volumes with 3000 IOPS provisioned. Monitor es_heap_used_percent.",
      metric: "16GB heap",
      metricLabel: "per ES node for 10M assets",
    },
  ],
};
