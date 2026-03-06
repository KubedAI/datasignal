import type { Framework } from "../types";

export const kafka: Framework = {
  id: "kafka",
  name: "Apache Kafka",
  short: "Kafka",
  category: "Ingestion",
  color: "#3DBEFF",
  tagline: "High-throughput event streaming at massive scale",
  signals: [
    {
      id: 1,
      tag: "Strimzi",
      headline: "Strimzi Operator: production Kafka on EKS without the Kafka ops burden",
      detail: "Strimzi manages the full Kafka lifecycle on Kubernetes: rolling upgrades, certificate rotation, config changes — all via Kubernetes CRDs. Use KafkaNodePool to separate controllers and brokers onto different node types. Brokers on NVMe storage nodes, controllers on smaller On-Demand nodes.",
      metric: "Zero manual",
      metricLabel: "Kafka broker ops",
    },
    {
      id: 2,
      tag: "Storage",
      headline: "Local NVMe for Kafka brokers: 10x throughput vs EBS at same cost",
      detail: "Kafka is I/O-bound. NVMe instance store (i3en.2xlarge or i4i.2xlarge) delivers 1M+ IOPS at <200μs latency vs EBS gp3's 16,000 IOPS at 1ms+. For high-throughput topics (>500MB/s), NVMe brokers handle 10x the load at equivalent cost. Use replication factor 3 across 3 AZs to mitigate ephemeral storage risk.",
      metric: "10×",
      metricLabel: "throughput vs EBS brokers",
    },
    {
      id: 3,
      tag: "Partitioning",
      headline: "Partition count determines your maximum parallelism — choose carefully",
      detail: "Topic partition count is immutable after creation (without complex repartitioning). Each partition can only be consumed by one consumer in a group. Set partition count = max expected consumers × 2 for headroom. For Flink sources: partition count = Flink source parallelism. Over-partitioning has metadata overhead; under-partitioning caps throughput.",
      metric: "Immutable",
      metricLabel: "after topic creation",
    },
    {
      id: 4,
      tag: "Consumers",
      headline: "Consumer lag is the only Kafka SLO metric that matters",
      detail: "Consumer lag (records behind head) is your real Kafka health signal. Producer throughput and broker metrics are secondary. Monitor lag per consumer group per partition. Alert when lag grows consistently — not on spikes. Use KEDA with Kafka trigger to auto-scale consumers when lag exceeds threshold.",
      metric: "Lag = 0",
      metricLabel: "is the target SLO",
    },
    {
      id: 5,
      tag: "Retention",
      headline: "Size-based retention protects brokers from runaway producers",
      detail: "Time-based retention (log.retention.hours=168) lets a high-throughput producer fill disks in hours during a consumer outage. Add size-based retention (log.retention.bytes) as a safety net. Set it to 70% of broker disk capacity. Both limits apply — whichever triggers first wins. Prevents broker disk pressure from cascading.",
      metric: "0 disk",
      metricLabel: "overflow incidents",
    },
  ],
};
