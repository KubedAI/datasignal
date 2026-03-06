// Re-export types for backward compatibility
export type { Signal, Framework, FrameworkCategory } from "./types";
export { CATEGORIES } from "./types";

// Individual framework imports — add new frameworks here
import { spark } from "./frameworks/spark";
import { flink } from "./frameworks/flink";
import { trino } from "./frameworks/trino";
import { starrocks } from "./frameworks/starrocks";
import { airflow } from "./frameworks/airflow";
import { kafka } from "./frameworks/kafka";
import { celeborn } from "./frameworks/celeborn";
import { ray } from "./frameworks/ray";
import { clickhouse } from "./frameworks/clickhouse";
import { superset } from "./frameworks/superset";
import { datahub } from "./frameworks/datahub";
import { gluten } from "./frameworks/gluten";
import { datafusion } from "./frameworks/datafusion";
import { sparkrapids } from "./frameworks/sparkrapids";

// Master list — order here controls sidebar display order
export const FRAMEWORKS = [
  spark,
  flink,
  trino,
  starrocks,
  airflow,
  kafka,
  celeborn,
  ray,
  clickhouse,
  superset,
  datahub,
  gluten,
  datafusion,
  sparkrapids,
];
