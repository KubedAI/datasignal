import type { Framework } from "../types";

export const datafusion: Framework = {
  id: "datafusion",
  name: "Apache DataFusion",
  short: "DataFusion",
  category: "Query Engines",
  color: "#EF4444",
  tagline: "Embeddable Rust query engine with Apache Arrow",
  signals: [
    {
      id: 1,
      tag: "Architecture",
      headline: "DataFusion embeds directly into Rust or Python apps — no server process",
      detail: "Unlike Trino or StarRocks, DataFusion is a library, not a service. Embed it in a Rust or Python process: SessionContext::new() and you have a full SQL engine. No network hop, no coordinator, no port to open. Ideal for building custom query tools, data lake scanners, or lightweight analytics inside microservices.",
      metric: "0 servers",
      metricLabel: "to deploy a SQL engine",
    },
    {
      id: 2,
      tag: "Arrow",
      headline: "Arrow columnar format eliminates serialization between pipeline stages",
      detail: "DataFusion operates natively on Apache Arrow RecordBatches in memory. Data flows between operators as zero-copy Arrow buffers — no serialization, no deserialization. Integrate with Polars, pandas (via PyArrow), or Spark (Arrow-based Pandas UDFs) without format conversion. The shared memory model is the performance advantage.",
      metric: "Zero copy",
      metricLabel: "between pipeline stages",
    },
    {
      id: 3,
      tag: "Performance",
      headline: "DataFusion matches JVM engines on TPC-H at 10% of the memory",
      detail: "DataFusion achieves near-parity with Spark SQL on TPC-H benchmarks using a fraction of the memory — Rust's ownership model eliminates the JVM overhead. For single-node or small cluster analytics workloads (up to 1TB), DataFusion outperforms DuckDB at multi-core scale and matches Presto on memory efficiency.",
      metric: "10%",
      metricLabel: "of JVM memory for same query",
    },
    {
      id: 4,
      tag: "S3",
      headline: "Read Parquet/Iceberg directly from S3 with predicate pushdown",
      detail: "DataFusion's object_store crate reads S3, GCS, and Azure Blob natively. For Parquet: row group pruning and column projection happen before data transfer — only the needed bytes leave S3. For Iceberg: snapshot metadata → manifest → data file chain is respected. No local copy needed.",
      metric: "Row group",
      metricLabel: "pruning at S3 read time",
    },
    {
      id: 5,
      tag: "Custom Engines",
      headline: "Build a custom query engine on DataFusion in weeks, not years",
      detail: "DataFusion's modular design lets you replace individual components: custom storage (TableProvider trait), custom functions (ScalarUDF), custom physical plans. Projects like Ballista (distributed DataFusion), Delta-RS (Delta Lake on DataFusion), and LanceDB build on DataFusion's core. The trait system makes extension first-class.",
      metric: "Weeks",
      metricLabel: "to a production query engine",
    },
  ],
};
