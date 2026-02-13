"use client";

import { motion } from "framer-motion";

interface Row {
  label: string;
  chatbot: string;
  copilot: string;
  agent: string;
}

const rows: Row[] = [
  {
    label: "Autonomy",
    chatbot: "None",
    copilot: "Suggests",
    agent: "Acts",
  },
  {
    label: "Memory",
    chatbot: "Stateless",
    copilot: "Session",
    agent: "Persistent",
  },
  {
    label: "Tool Use",
    chatbot: "None",
    copilot: "None",
    agent: "APIs, DBs, Services",
  },
  {
    label: "Planning",
    chatbot: "None",
    copilot: "None",
    agent: "Multi-step",
  },
  {
    label: "Decisions",
    chatbot: "None",
    copilot: "Human decides",
    agent: "Agent decides",
  },
  {
    label: "Risk Profile",
    chatbot: "Low",
    copilot: "Low",
    agent: "Medium–High",
  },
  {
    label: "Governance Need",
    chatbot: "Minimal",
    copilot: "Moderate",
    agent: "Critical",
  },
];

export default function ComparisonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-light">
            <th className="py-3 pr-4 text-left font-mono text-xs text-muted-dark font-normal">
              Dimension
            </th>
            <th className="py-3 px-4 text-left font-mono text-xs font-normal">
              <span className="text-chatbot">Chatbot</span>
            </th>
            <th className="py-3 px-4 text-left font-mono text-xs font-normal">
              <span className="text-copilot">Copilot</span>
            </th>
            <th className="py-3 pl-4 text-left font-mono text-xs font-normal">
              <span className="text-agent">Agent</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-20px" }}
              className="border-b border-surface-light/50"
            >
              <td className="py-3 pr-4 text-muted font-medium">
                {row.label}
              </td>
              <td className="py-3 px-4 text-muted-dark">{row.chatbot}</td>
              <td className="py-3 px-4 text-muted">{row.copilot}</td>
              <td className="py-3 pl-4 text-foreground font-medium">
                {row.agent}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
