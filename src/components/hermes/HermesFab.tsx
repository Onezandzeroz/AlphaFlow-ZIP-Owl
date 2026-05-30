'use client';

import { motion } from 'framer-motion';

interface HermesFabProps {
  onClick: () => void;
  hasNotifications: boolean;
  isTyping: boolean;
}

export function HermesFab({ onClick, hasNotifications, isTyping }: HermesFabProps) {
  return (
    <div className="relative flex h-48 w-48 items-center justify-center" style={{ background: 'transparent' }}>
      <motion.div
        className="relative pointer-events-auto cursor-pointer"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label="Open Hermes AI assistant"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        animate={
          isTyping
            ? { y: [0, -3, 0] }
            : {}
        }
        transition={
          isTyping
            ? { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
            : {}
        }
      >
        <img
          src="/hermes-owl.webp"
          alt=""
          className="h-42 w-auto object-contain drop-shadow-lg"
          draggable={false}
        />

        {/* Typing indicator dots (shown below the owl) */}
        {isTyping && (
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-2 w-2 rounded-full bg-amber-400"
                animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
              />
            ))}
          </div>
        )}

        {/* Notification badge */}
        {hasNotifications && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white shadow-sm ring-2 ring-white dark:ring-gray-900"
          >
            !
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
