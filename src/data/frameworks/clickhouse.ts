import type { Framework } from "../types";

export const clickhouse: Framework = {
  id: "clickhouse",
  name: "ClickHouse",
  short: "ClickHouse",
  category: "Query Engines",
  color: "#FFCC00",
  tagline: "Column-oriented OLAP for real-time analytics at petabyte scale",
  signals: [
    {
      id: 1,
      tag: "MergeTree",
      headline: "Choose the right MergeTree variant — this decision is irreversible",
      detail: "MergeTree: general purpose. ReplacingMergeTree: deduplication via version column. AggregatingMergeTree: pre-aggregation. CollapsingMergeTree: CDC with sign column. The engine is set at table creation and cannot be changed without full data reload. For CDC from Kafka: ReplacingMergeTree. For rollups: AggregatingMergeTree.",
      metric: "Irreversible",
      metricLabel: "engine choice at creation",
    },
    {
      id: 2,
      tag: "Sharding",
      headline: "Shard key determines data distribution — wrong choice causes hot shards",
      detail: "ClickHouse Distributed tables spread data across shards based on a hash function. A low-cardinality shard key (e.g., country with 3 values) creates hot shards. Use high-cardinality keys (user_id, order_id) for even distribution. Shard count should equal the number of physical shard replicas, not the number of nodes.",
      metric: "Even",
      metricLabel: "distribution = fast queries",
    },
    {
      id: 3,
      tag: "Kafka",
      headline: "ClickHouse Kafka table engine ingests streams without a pipeline",
      detail: "ClickHouse has a native Kafka table engine: define a Kafka table as the source, a MergeTree table as the destination, and a Materialized View as the transform. No Flink, no Kafka Connect, no extra infrastructure. Achieves 300MB/s+ ingestion. Use ReplicatedMergeTree as the destination for HA.",
      metric: "300MB/s+",
      metricLabel: "native Kafka ingestion per node",
    },
    {
      id: 4,
      tag: "Operator",
      headline: "ClickHouse Operator on EKS: declarative cluster management via CRDs",
      detail: "The ClickHouse Operator manages ClickHouseInstallation CRDs — shards, replicas, ZooKeeper integration, PVC management. Rolling upgrades without downtime. Use Karpenter with r6g instances (Graviton) for ClickHouse nodes — ARM64 ClickHouse builds are fully production-supported and 15% cheaper.",
      metric: "Zero downtime",
      metricLabel: "rolling cluster upgrades",
    },
    {
      id: 5,
      tag: "S3",
      headline: "ClickHouse S3 table function: ad-hoc queries on data lake without ETL",
      detail: "SELECT * FROM s3('s3://bucket/path/*.parquet', 'Parquet') — ClickHouse reads S3 directly, no ingestion needed. Use for audit queries, backfills, or exploring data lake files. For repeated queries, create a S3-backed table with cold storage: hot data on local SSD, cold on S3 via tiered storage.",
      metric: "0 ETL",
      metricLabel: "for S3 ad-hoc queries",
    },
  ],
};
