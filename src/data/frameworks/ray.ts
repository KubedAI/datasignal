import type { Framework } from "../types";

export const ray: Framework = {
  id: "ray",
  name: "Ray (Ray Data)",
  short: "Ray",
  category: "AI & ML",
  color: "#6366F1",
  tagline: "Distributed AI and data processing for ML workloads",
  signals: [
    {
      id: 1,
      tag: "KubeRay",
      headline: "KubeRay Operator: Ray clusters as Kubernetes-native CRDs",
      detail: "KubeRay manages RayClusters, RayJobs, and RayServices as Kubernetes custom resources. Each Ray job gets its own cluster that provisions and deprovisions automatically. Integrate with Karpenter for node provisioning — Ray head node on On-Demand, worker nodes on Spot. RayJob auto-submits and cleans up on completion.",
      metric: "1 CRD",
      metricLabel: "per Ray job, fully managed",
    },
    {
      id: 2,
      tag: "Ray Data",
      headline: "Ray Data streaming execution processes datasets larger than memory",
      detail: "Ray Data uses streaming execution — datasets are processed as a pipeline of operators, never fully materialized in memory. A 10TB dataset pipelines through Map → Filter → Write without loading more than one batch per node into RAM. Configure block_size to tune memory vs parallelism trade-off.",
      metric: "10TB+",
      metricLabel: "datasets without OOM",
    },
    {
      id: 3,
      tag: "GPU",
      headline: "Fractional GPU allocation with Ray: pack more workers per GPU node",
      detail: "Ray supports fractional GPU allocation: num_gpus=0.5 lets two Ray tasks share one physical GPU. On g5.12xlarge (4× A10G GPUs), run 8 tasks simultaneously. Pair with NVIDIA MIG (Multi-Instance GPU) for true hardware-level isolation on A100/H100. Reduces GPU waste on inference-heavy pipelines.",
      metric: "8 tasks",
      metricLabel: "on 4-GPU node with 0.5 alloc",
    },
    {
      id: 4,
      tag: "Autoscaling",
      headline: "Ray Autoscaler + Karpenter: zero idle GPU nodes between jobs",
      detail: "Ray's built-in Autoscaler requests nodes from Kubernetes when tasks are queued. Karpenter fulfills these requests in <60s. When Ray scales down, Karpenter terminates the nodes. For GPU clusters (g4dn, g5), this eliminates idle GPU costs — expensive nodes provision only during active training or inference.",
      metric: "0 idle GPU",
      metricLabel: "nodes between batch jobs",
    },
    {
      id: 5,
      tag: "Training",
      headline: "Ray Train bridges the data processing ↔ model training gap",
      detail: "Ray Data preprocesses training data (tokenization, augmentation, normalization). Ray Train distributes the training loop across multiple GPU workers. Both run on the same Ray cluster — no data serialization between pipeline stages. Eliminates the Spark→S3→PyTorch→GPU data handoff latency.",
      metric: "Zero",
      metricLabel: "pipeline stage serialization",
    },
  ],
};
