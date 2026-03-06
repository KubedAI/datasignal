import type { Framework } from "../types";

export const sparkrapids: Framework = {
  id: "sparkrapids",
  name: "Spark RAPIDS",
  short: "RAPIDS",
  category: "Compute",
  color: "#76B900",
  tagline: "GPU-accelerated Spark with NVIDIA RAPIDS",
  signals: [
    {
      id: 1,
      tag: "Plugin",
      headline: "RAPIDS Accelerator is a drop-in Spark plugin — zero code changes",
      detail: "Add spark.plugins=com.nvidia.spark.SQLPlugin and spark.rapids.sql.enabled=true. That's it. RAPIDS intercepts supported Spark SQL operators and runs them on GPU via cuDF. Unsupported operators fall back to CPU silently. Check spark.rapids.sql.explain=NOT_ON_GPU to see exactly what runs on GPU vs CPU.",
      metric: "0 code changes",
      metricLabel: "to Spark SQL or DataFrames",
    },
    {
      id: 2,
      tag: "ETL",
      headline: "7x faster ETL: Parquet scan + aggregation + join runs on GPU SIMD",
      detail: "GPU SIMD executes columnar operations (filter, project, aggregate, join) on thousands of rows in parallel. For TPC-DS-style ETL: scan Parquet → filter → aggregate → join chains achieve 7x speedup vs CPU Spark. Workloads that are I/O-bound see less gain; compute-bound transformations see the most.",
      metric: "7×",
      metricLabel: "faster on compute-heavy ETL",
    },
    {
      id: 3,
      tag: "EKS",
      headline: "NVIDIA device plugin + time-slicing shares one GPU across Spark executors",
      detail: "Deploy nvidia-device-plugin DaemonSet on GPU nodes. Enable GPU time-slicing (replicas=4 in ConfigMap) to share one physical GPU among 4 executor pods — each sees a virtual GPU. For non-memory-intensive transformations, time-sliced GPUs cost the same as dedicated but handle 4x the executor count.",
      metric: "4× executor density",
      metricLabel: "per GPU with time-slicing",
    },
    {
      id: 4,
      tag: "Cost",
      headline: "G5 Spot + RAPIDS undercuts CPU On-Demand cluster costs",
      detail: "A g5.4xlarge Spot (~$0.40/hr) with RAPIDS completes the same ETL job as 4× r6i.2xlarge On-Demand ($1.20/hr total). Total cost: $0.40 vs $1.20 for identical throughput. Combined with Karpenter Spot management and RAPIDS GPU utilization, GPU jobs become cost-competitive with large CPU clusters.",
      metric: "3× cheaper",
      metricLabel: "GPU Spot vs CPU On-Demand",
    },
    {
      id: 5,
      tag: "Memory",
      headline: "GPU memory is the bottleneck — tune spark.rapids.memory.gpu.allocFraction",
      detail: "RAPIDS allocates a pool of GPU memory at executor startup (default: 90% of GPU VRAM). If two executors share a GPU via time-slicing, each grabs 90% — causing OOM. Set spark.rapids.memory.gpu.allocFraction=0.45 for 2-way sharing, 0.22 for 4-way. Monitor GPU memory usage with nvidia-smi or DCGM.",
      metric: "0.45",
      metricLabel: "allocFraction for 2-way sharing",
    },
  ],
};
