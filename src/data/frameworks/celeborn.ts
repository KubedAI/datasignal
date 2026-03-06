import type { Framework } from "../types";

export const celeborn: Framework = {
  id: "celeborn",
  name: "Apache Celeborn",
  short: "Celeborn",
  category: "Compute",
  color: "#FF6B6B",
  tagline: "Elastic remote shuffle service for Spark and Flink",
  signals: [
    {
      id: 1,
      tag: "Architecture",
      headline: "Celeborn decouples shuffle from compute — executors become truly stateless",
      detail: "Traditional Spark executors are stateful: local shuffle data dies with the pod. Celeborn externalizes shuffle to dedicated worker StatefulSets that outlive executors. Executors become truly stateless and bin-packable. Karpenter can consolidate compute nodes mid-job without recomputing shuffle.",
      metric: "Stateless",
      metricLabel: "executors with Celeborn",
    },
    {
      id: 2,
      tag: "Dynamic Allocation",
      headline: "Celeborn is the missing piece that makes Spark DRA production-safe",
      detail: "Spark Dynamic Resource Allocation without an external shuffle service loses shuffle data when executors scale down — requiring expensive recomputation. With Celeborn, DRA scales executors to zero between stages and back up instantly. Shuffle data persists on Celeborn workers regardless of executor count.",
      metric: "0 recompute",
      metricLabel: "on DRA scale-down events",
    },
    {
      id: 3,
      tag: "Storage",
      headline: "NVMe instance store for Celeborn workers: maximum shuffle IOPS",
      detail: "Celeborn performance is I/O-bound. NVMe instance store (i3en, i4i) delivers 1M+ IOPS vs EBS gp3's 16K. For jobs shuffling 500GB+, NVMe Celeborn workers saturate network bandwidth rather than disk. Use Local Static Provisioner to automate NVMe PV provisioning for Celeborn StatefulSets.",
      metric: "1M+ IOPS",
      metricLabel: "NVMe vs 16K gp3 EBS",
    },
    {
      id: 4,
      tag: "Blue-Green",
      headline: "Blue-green StatefulSet rotation via Celeborn decommission API",
      detail: "Celeborn StatefulSets have immutable volume templates — you can't update them in-place. The correct pattern: deploy a new StatefulSet (green), use Celeborn's decommission API to drain the old one (blue), old workers stop accepting new shuffle but serve existing data, delete blue when drained.",
      metric: "Zero downtime",
      metricLabel: "Celeborn cluster upgrades",
    },
    {
      id: 5,
      tag: "Karpenter",
      headline: "Set terminationGracePeriodSeconds=3600 for Karpenter node rotation",
      detail: "When Karpenter drains a Celeborn worker node, the preStop hook triggers Celeborn's graceful shutdown. Set terminationGracePeriodSeconds=3600 (or higher for large shuffle jobs). Configure Celeborn's internal grace period to ~30s less than the K8s termination period. Monitor decommission duration to tune.",
      metric: "3600s",
      metricLabel: "grace period for safe drain",
    },
  ],
};
