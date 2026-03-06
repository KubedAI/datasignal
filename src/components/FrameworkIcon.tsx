/** Real SVG logo paths for each data framework */
type IconProps = { size?: number; className?: string };

export function SparkIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Apache Spark flame/lightning bolt logo */}
      <path
        d="M62 8L28 52h22L38 92l42-52H58L62 8z"
        fill="#E25A1C"
      />
      <path
        d="M62 8L28 52h22L38 92l42-52H58L62 8z"
        fill="url(#spark-grad)"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="spark-grad" x1="38" y1="8" x2="80" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF8C42" />
          <stop offset="1" stopColor="#C0390A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FlinkIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Apache Flink squirrel-inspired abstract mark */}
      <ellipse cx="50" cy="38" rx="26" ry="26" fill="#00C9FF" opacity="0.15" />
      <circle cx="50" cy="38" r="18" fill="none" stroke="#00C9FF" strokeWidth="5" />
      {/* tail curve */}
      <path
        d="M68 44 Q88 30 80 16 Q72 4 58 10"
        stroke="#00C9FF"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* eye */}
      <circle cx="44" cy="34" r="3.5" fill="#00C9FF" />
      {/* body mark */}
      <path
        d="M36 48 Q50 56 64 48"
        stroke="#00C9FF"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* legs */}
      <path d="M42 62 L38 78M58 62 L62 78" stroke="#00C9FF" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function TrinoIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Trino rabbit-ear inspired logo mark */}
      {/* Left ear */}
      <path
        d="M32 52 Q28 20 38 12 Q46 6 46 28"
        stroke="#C751EE"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right ear */}
      <path
        d="M68 52 Q72 20 62 12 Q54 6 54 28"
        stroke="#C751EE"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Head */}
      <ellipse cx="50" cy="56" rx="22" ry="20" fill="none" stroke="#C751EE" strokeWidth="5" />
      {/* Eyes */}
      <circle cx="43" cy="52" r="3" fill="#C751EE" />
      <circle cx="57" cy="52" r="3" fill="#C751EE" />
      {/* Nose */}
      <path d="M47 60 L50 63 L53 60" stroke="#C751EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Mouth */}
      <path d="M44 65 Q50 70 56 65" stroke="#C751EE" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function StarRocksIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* StarRocks bold star */}
      <path
        d="M50 8l10.5 22.5L86 34.5 67 53l4.5 25.5L50 67 28.5 78.5 33 53 14 34.5l25.5-4z"
        fill="#F5C400"
      />
      {/* Inner star highlight */}
      <path
        d="M50 22l6 13.5L70 38l-12 11.5 3 15L50 58l-11 6.5 3-15L30 38l14-2.5z"
        fill="#FFE066"
        opacity="0.5"
      />
    </svg>
  );
}

export function AirflowIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Airflow windmill/pinwheel logo mark */}
      {/* Center hub */}
      <circle cx="50" cy="50" r="7" fill="#017CEE"/>
      {/* 4 blades arranged like a propeller */}
      <path d="M50 43 Q38 30 30 20 Q44 24 50 36z" fill="#017CEE" opacity="0.9"/>
      <path d="M57 50 Q72 40 84 34 Q80 48 68 52z" fill="#017CEE" opacity="0.7"/>
      <path d="M50 57 Q62 70 70 80 Q56 76 50 64z" fill="#017CEE" opacity="0.9"/>
      <path d="M43 50 Q28 60 16 66 Q20 52 32 48z" fill="#017CEE" opacity="0.7"/>
    </svg>
  );
}

export function KafkaIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Kafka node-graph logo */}
      {/* Central broker node */}
      <circle cx="50" cy="50" r="10" fill="#3DBEFF"/>
      {/* Producer nodes */}
      <circle cx="20" cy="30" r="7" fill="#3DBEFF" opacity="0.7"/>
      <circle cx="20" cy="70" r="7" fill="#3DBEFF" opacity="0.7"/>
      {/* Consumer nodes */}
      <circle cx="80" cy="25" r="7" fill="#3DBEFF" opacity="0.7"/>
      <circle cx="80" cy="50" r="7" fill="#3DBEFF" opacity="0.7"/>
      <circle cx="80" cy="75" r="7" fill="#3DBEFF" opacity="0.7"/>
      {/* Producer → broker lines */}
      <line x1="27" y1="33" x2="41" y2="44" stroke="#3DBEFF" strokeWidth="2" strokeOpacity="0.5"/>
      <line x1="27" y1="67" x2="41" y2="56" stroke="#3DBEFF" strokeWidth="2" strokeOpacity="0.5"/>
      {/* Broker → consumer lines */}
      <line x1="60" y1="46" x2="73" y2="30" stroke="#3DBEFF" strokeWidth="2" strokeOpacity="0.5"/>
      <line x1="60" y1="50" x2="73" y2="50" stroke="#3DBEFF" strokeWidth="2" strokeOpacity="0.5"/>
      <line x1="60" y1="54" x2="73" y2="70" stroke="#3DBEFF" strokeWidth="2" strokeOpacity="0.5"/>
    </svg>
  );
}

export function CelebornIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Celeborn: shuffle/exchange arrows representing the remote shuffle service */}
      {/* Top arrow: left to right */}
      <path d="M10 35 L60 35 L50 25 M60 35 L50 45" stroke="#FF6B6B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Bottom arrow: right to left */}
      <path d="M90 65 L40 65 L50 55 M40 65 L50 75" stroke="#FF6B6B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Center storage cylinder */}
      <ellipse cx="75" cy="35" rx="12" ry="5" fill="none" stroke="#FF6B6B" strokeWidth="3"/>
      <rect x="63" y="35" width="24" height="14" fill="#FF6B6B" opacity="0.15"/>
      <line x1="63" y1="49" x2="87" y2="49" stroke="#FF6B6B" strokeWidth="3"/>
      <line x1="63" y1="35" x2="63" y2="49" stroke="#FF6B6B" strokeWidth="3"/>
      <line x1="87" y1="35" x2="87" y2="49" stroke="#FF6B6B" strokeWidth="3"/>
    </svg>
  );
}

export function RayIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ray: radiating lines from center point — "rays" */}
      <circle cx="50" cy="50" r="8" fill="#6366F1"/>
      {/* 8 rays emanating outward */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x2 = 50 + Math.cos(rad) * 32;
        const y2 = 50 + Math.sin(rad) * 32;
        return (
          <line key={i} x1="50" y1="50" x2={x2} y2={y2}
            stroke="#6366F1" strokeWidth={i % 2 === 0 ? 3.5 : 2}
            strokeLinecap="round" opacity={i % 2 === 0 ? 1 : 0.5}/>
        );
      })}
    </svg>
  );
}

export function ClickHouseIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ClickHouse: vertical bar chart (column-oriented = vertical bars) */}
      <rect x="10" y="60" width="14" height="30" rx="3" fill="#FFCC00"/>
      <rect x="30" y="35" width="14" height="55" rx="3" fill="#FFCC00"/>
      <rect x="50" y="20" width="14" height="70" rx="3" fill="#FFCC00"/>
      <rect x="70" y="45" width="14" height="45" rx="3" fill="#FFCC00"/>
      {/* X-axis line */}
      <line x1="8" y1="92" x2="92" y2="92" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
    </svg>
  );
}

export function SupersetIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Superset: pie chart + data point = BI/visualization */}
      {/* Pie chart */}
      <path d="M50 50 L50 15 A35 35 0 0 1 85 50 Z" fill="#20A7C9"/>
      <path d="M50 50 L85 50 A35 35 0 0 1 50 85 Z" fill="#20A7C9" opacity="0.6"/>
      <path d="M50 50 L50 85 A35 35 0 0 1 15 50 Z" fill="#20A7C9" opacity="0.4"/>
      <path d="M50 50 L15 50 A35 35 0 0 1 50 15 Z" fill="#20A7C9" opacity="0.25"/>
      {/* Center hub */}
      <circle cx="50" cy="50" r="10" fill="#050810"/>
      <circle cx="50" cy="50" r="6" fill="#20A7C9" opacity="0.8"/>
    </svg>
  );
}

export function DataHubIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* DataHub: hub + spoke network representing data catalog/lineage */}
      {/* Center hub */}
      <circle cx="50" cy="50" r="10" fill="#5B8DEF"/>
      {/* Spoke nodes at 5 positions */}
      <circle cx="50" cy="18" r="7" fill="#5B8DEF" opacity="0.8"/>
      <circle cx="80" cy="36" r="7" fill="#5B8DEF" opacity="0.8"/>
      <circle cx="68" cy="76" r="7" fill="#5B8DEF" opacity="0.8"/>
      <circle cx="32" cy="76" r="7" fill="#5B8DEF" opacity="0.8"/>
      <circle cx="20" cy="36" r="7" fill="#5B8DEF" opacity="0.8"/>
      {/* Connecting lines */}
      <line x1="50" y1="40" x2="50" y2="25" stroke="#5B8DEF" strokeWidth="2.5" strokeOpacity="0.5"/>
      <line x1="59" y1="44" x2="74" y2="40" stroke="#5B8DEF" strokeWidth="2.5" strokeOpacity="0.5"/>
      <line x1="56" y1="58" x2="64" y2="70" stroke="#5B8DEF" strokeWidth="2.5" strokeOpacity="0.5"/>
      <line x1="44" y1="58" x2="36" y2="70" stroke="#5B8DEF" strokeWidth="2.5" strokeOpacity="0.5"/>
      <line x1="41" y1="44" x2="26" y2="40" stroke="#5B8DEF" strokeWidth="2.5" strokeOpacity="0.5"/>
    </svg>
  );
}

export function GlutenIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gluten/Velox: lightning bolt + native execution = power symbol */}
      {/* Outer arrow representing acceleration/native speed */}
      <path d="M55 10 L20 55 H42 L38 90 L80 45 H58 L62 10Z"
        fill="none" stroke="#F97316" strokeWidth="4" strokeLinejoin="round"/>
      {/* Inner fill — native core */}
      <path d="M55 22 L30 55 H46 L43 78 L70 45 H54 L57 22Z"
        fill="#F97316" opacity="0.3"/>
    </svg>
  );
}

export function DataFusionIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* DataFusion: Rust crab claw / arrow fusion — two arrows converging */}
      {/* Left arrow coming in */}
      <path d="M5 30 L45 50 L5 70" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Right arrow coming in */}
      <path d="M95 30 L55 50 L95 70" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Center fusion point */}
      <circle cx="50" cy="50" r="8" fill="#EF4444"/>
      {/* Output arrow */}
      <path d="M50 58 L50 88 L44 82 M50 88 L56 82" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function SparkRAPIDSIcon({ size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Spark RAPIDS: GPU chip + acceleration lines */}
      {/* GPU chip body */}
      <rect x="24" y="24" width="52" height="52" rx="6" fill="none" stroke="#76B900" strokeWidth="3.5"/>
      {/* Chip pins top/bottom */}
      <line x1="35" y1="24" x2="35" y2="14" stroke="#76B900" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="50" y1="24" x2="50" y2="14" stroke="#76B900" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="65" y1="24" x2="65" y2="14" stroke="#76B900" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="35" y1="76" x2="35" y2="86" stroke="#76B900" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="50" y1="76" x2="50" y2="86" stroke="#76B900" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="65" y1="76" x2="65" y2="86" stroke="#76B900" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Chip pins left/right */}
      <line x1="24" y1="38" x2="14" y2="38" stroke="#76B900" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="24" y1="62" x2="14" y2="62" stroke="#76B900" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="76" y1="38" x2="86" y2="38" stroke="#76B900" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="76" y1="62" x2="86" y2="62" stroke="#76B900" strokeWidth="2.5" strokeLinecap="round"/>
      {/* Inner GPU core: speed lines */}
      <path d="M38 52 L44 44 L54 44 L48 52 L54 60 L44 60Z" fill="#76B900" opacity="0.9"/>
      <line x1="54" y1="50" x2="62" y2="50" stroke="#76B900" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function getFrameworkIcon(id: string, size = 32) {
  switch (id) {
    case "spark":       return <SparkIcon size={size} />;
    case "flink":       return <FlinkIcon size={size} />;
    case "trino":       return <TrinoIcon size={size} />;
    case "starrocks":   return <StarRocksIcon size={size} />;
    case "airflow":     return <AirflowIcon size={size} />;
    case "kafka":       return <KafkaIcon size={size} />;
    case "celeborn":    return <CelebornIcon size={size} />;
    case "ray":         return <RayIcon size={size} />;
    case "clickhouse":  return <ClickHouseIcon size={size} />;
    case "superset":    return <SupersetIcon size={size} />;
    case "datahub":     return <DataHubIcon size={size} />;
    case "gluten":      return <GlutenIcon size={size} />;
    case "datafusion":  return <DataFusionIcon size={size} />;
    case "sparkrapids": return <SparkRAPIDSIcon size={size} />;
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="#444" strokeWidth="2" />
        </svg>
      );
  }
}
