"use client";

import React from "react";
import { motion } from "motion/react";
import { EntourageData } from "../types";
import { cn } from "@/lib/utils";

interface TheEntourageProps {
  data: EntourageData;
}

function NameGrid({
  names,
  columns = 2,
  className,
}: {
  names: { name: string }[];
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "grid gap-x-6 gap-y-1 text-sm text-[#4e2a0d] font-libreBaskerville",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        className,
      )}
    >
      {names.map((person) => (
        <li key={person.name} className="tracking-wide text-center">
          {person.name}
        </li>
      ))}
    </ul>
  );
}

function RoleColumn({
  label,
  names,
}: {
  label: string;
  names: { name: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-libreBaskerville font-semibold text-[#8c6b42] tracking-wider uppercase mb-2">
        {label}
      </h4>
      <NameGrid names={names} columns={1} />
    </div>
  );
}

function EntouragePanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-[#8c6b42]/10 px-6 py-5">
      <h3 className="text-lg md:text-xl font-libreBaskerville text-[#4e2a0d] mb-4 text-center">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function TheEntourage({ data }: TheEntourageProps) {
  return (
    <section className="py-20 px-4 bg-[#eae4cc]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-meaCulpa text-[#4e2a0d] mb-4">
            Entourage
          </h2>
          <p className="text-[#4e2a0d]/80 font-medium">
            The people standing with us on our special day
          </p>
          <div className="w-20 h-1 bg-[#8c6b42] mx-auto mt-6" />
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <EntouragePanel title="Parents">
              <p className="text-[#4e2a0d]/70 text-sm italic mb-4 text-center font-libreBaskerville">
                With the blessings of our parents
              </p>
              <NameGrid names={data.parents} columns={2} />
            </EntouragePanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <EntouragePanel title="Sponsors">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-libreBaskerville font-semibold text-[#8c6b42] tracking-wider uppercase mb-3 text-center">
                    Principal Sponsors
                  </h4>
                  <NameGrid names={data.principalSponsors} columns={2} />
                </div>
                <div>
                  <h4 className="text-sm font-libreBaskerville font-semibold text-[#8c6b42] tracking-wider uppercase mb-3 text-center">
                    Secondary Sponsors
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <RoleColumn
                      label="Veil"
                      names={data.secondarySponsors.veil}
                    />
                    <RoleColumn
                      label="Cord"
                      names={data.secondarySponsors.cord}
                    />
                    <RoleColumn
                      label="Candle"
                      names={data.secondarySponsors.candle}
                    />
                  </div>
                </div>
              </div>
            </EntouragePanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <EntouragePanel title="Wedding Party">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                  <RoleColumn label="Best Man" names={data.bestMan} />
                  <RoleColumn label="Maid of Honor" names={data.maidOfHonor} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                  <div>
                    <h4 className="text-sm font-libreBaskerville font-semibold text-[#8c6b42] tracking-wider uppercase mb-2">
                      Groomsmen
                    </h4>
                    <NameGrid names={data.groomsmen} columns={1} />
                  </div>
                  <div>
                    <h4 className="text-sm font-libreBaskerville font-semibold text-[#8c6b42] tracking-wider uppercase mb-2">
                      Bridesmaids
                    </h4>
                    <NameGrid names={data.bridesmaids} columns={1} />
                  </div>
                </div>
              </div>
            </EntouragePanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4"
          >
            <EntouragePanel title="Bearers & Flower Girls">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  <RoleColumn label="Ring Bearer" names={data.ringBearer} />
                  <RoleColumn label="Coin Bearer" names={data.coinBearer} />
                  <RoleColumn label="Bible Bearer" names={data.bibleBearer} />
                </div>
                <div>
                  <h4 className="text-sm font-libreBaskerville font-semibold text-[#8c6b42] tracking-wider uppercase mb-2 text-center">
                    Flower Girls
                  </h4>
                  <NameGrid names={data.flowerGirls} columns={2} />
                </div>
              </div>
            </EntouragePanel>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
