import { motion } from "motion/react";
import type { Certificate } from "../../data/credentials";
import { ease, inViewOnce } from "../../lib/motion";

export function CertificationCard({ certificate, delay }: { certificate: Certificate; delay: number }) {
  return (
    <motion.li
      className="group relative grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 border-b border-line py-5 transition-colors duration-300 hover:bg-ink-2/60 sm:grid-cols-[minmax(0,1fr)_15rem_5.5rem] sm:px-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inViewOnce}
      transition={{ duration: 0.6, ease, delay }}
    >
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-0 h-0 w-px -translate-y-1/2 bg-accent transition-[height] duration-300 group-hover:h-8"
      />
      <span className="text-[15.5px] text-fg">{certificate.name}</span>
      <span className="col-start-1 row-start-2 font-mono text-xs text-fg-faint sm:col-start-auto sm:row-start-auto">
        {certificate.issuer}
        {certificate.platform && ` · ${certificate.platform}`}
      </span>
      <time
        dateTime={certificate.iso}
        className="col-start-2 row-start-1 text-right font-mono text-xs text-fg-muted sm:col-start-auto sm:row-start-auto"
      >
        {certificate.date}
      </time>
    </motion.li>
  );
}
