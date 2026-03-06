import type { Framework } from "../types";

export const gluten: Framework = {
  id: "gluten",
  name: "Apache Gluten",
  short: "Gluten",
  category: "Compute",
  color: "#F97316",
  tagline: "Native Velox execution engine as a Spark plugin",
  signals: [
    {
      id: 1,
      tag: "Performance",
      headline: "Gluten replaces Spark JVM operators with native Velox execution",
      detail: "Apache Gluten intercepts Spark physical plan operators and executes them via Velox (Meta's native C++ execution engine) instead of the JVM. For scan-heavy, aggregation-heavy TPC-H workloads: 2–5x speedup. No Spark SQL or DataFrame API changes needed. Works transparently as a Spark plugin JAR.",
      metric: "2–5×",
      metricLabel: "speedup vs JVM Spark",
    },
    {
      id: 2,
      tag: "Memory",
      headline: "Gluten uses off-heap memory — GC pauses disappear on large datasets",
      detail: "JVM Spark operators allocate data on-heap, triggering GC pauses at high memory pressure. Gluten/Velox operates entirely off-heap using its own memory allocator. No GC pauses on large aggregations. Set spark.gluten.memory.offHeap.size explicitly. Reduce spark.executor.memory proportionally since less JVM heap is needed.",
      metric: "0 GC pauses",
      metricLabel: "on large aggregations",
    },
    {
      id: 3,
      tag: "Iceberg",
      headline: "Gluten + Iceberg: vectorized Parquet reads unlock full Velox throughput",
      detail: "Gluten's Velox backend includes a vectorized Parquet/ORC reader that bypasses the JVM entirely. With Iceberg tables on S3, Gluten achieves 2–3x higher scan throughput than Spark's native Parquet reader. Column pruning and predicate pushdown happen in native code before any data reaches the JVM.",
      metric: "2–3×",
      metricLabel: "higher scan throughput",
    },
    {
      id: 4,
      tag: "Compatibility",
      headline: "Gluten is 100% API-compatible — enable with two Spark config lines",
      detail: "spark.plugins=io.glutenproject.GlutenPlugin and spark.memory.offHeap.enabled=true. That's the entire migration. Gluten falls back to JVM execution for any unsupported operators automatically — no crashes, no silent failures. Check spark.gluten.sql.fallback.verbose=true to monitor fallback rate.",
      metric: "2 config lines",
      metricLabel: "to enable native execution",
    },
    {
      id: 5,
      tag: "EKS",
      headline: "Build custom Spark+Gluten Docker images once — deploy everywhere",
      detail: "Gluten requires native libraries pre-compiled for the target OS. Build a base Docker image: Spark + Gluten JAR + Velox native libs compiled for AL2/x86_64 or ARM64. Publish to ECR. All Spark jobs on EKS reference this image. For Graviton (ARM64) workers, build a separate Gluten image — performance gains are even higher.",
      metric: "1 image",
      metricLabel: "per architecture in ECR",
    },
  ],
};
