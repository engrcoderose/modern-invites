"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { calculateTimeRemaining, TimeRemaining } from "../utils/countdown";
import lightLineDecoration from "../assets/lines/line-grey.png";
import Image from "next/image";

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      setTimeRemaining(calculateTimeRemaining(targetDate));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeRemaining.days },
    { label: "Hours", value: timeRemaining.hours },
    { label: "Minutes", value: timeRemaining.minutes },
    { label: "Seconds", value: timeRemaining.seconds },
  ];

  return (
    <section className="py-20 px-4 bg-[#eae4cc]">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-meaCulpa tracking-wide text-[#4e2a0d] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Counting Down to Forever
        </motion.h2>
        <motion.p
          className="text-[#4e2a0d] mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The big day is approaching!
        </motion.p>

        <div className="flex justify-center items-start gap-2 md:gap-6 lg:gap-8">
          {timeUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className={`text-5xl md:text-8xl lg:text-9xl font-serif text-[#4e2a0d] leading-none mb-4 ${unit.label === "Seconds" ? "opacity-50" : ""}`}
                >
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="text-xs md:text-sm lg:text-base text-[#4e2a0d] uppercase tracking-widest font-serif">
                  {unit.label}
                </div>
              </motion.div>
              {index < timeUnits.length - 1 && (
                <div className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#4e2a0d] leading-none pt-2 md:pt-4 lg:pt-6">
                  :
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
