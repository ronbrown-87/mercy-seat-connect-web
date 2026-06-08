import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  HandHeart,
  Image as ImageIcon,
  Info,
  Play,
  Sparkles,
  Trophy,
  Video,
  Wand2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type FeatureId = 'about' | 'media' | 'gallery' | 'quiz' | 'events' | 'giving';

interface FeatureNode {
  id: FeatureId;
  label: string;
  short: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const FEATURES: FeatureNode[] = [
  {
    id: 'about',
    label: 'About Our Ministry',
    short: 'About',
    description: 'Introduction & mission',
    icon: <Info className="h-6 w-6" />,
    path: '/learn-more',
  },
  {
    id: 'media',
    label: 'Media & Sermons',
    short: 'Sermons',
    description: 'Live stream, video & audio teaching',
    icon: <Video className="h-6 w-6" />,
    path: '/sermons',
  },
  {
    id: 'gallery',
    label: 'Church Gallery',
    short: 'Gallery',
    description: 'Photo highlights of church life',
    icon: <ImageIcon className="h-6 w-6" />,
    path: '/gallery',
  },
  {
    id: 'quiz',
    label: 'Interactive Bible Quiz',
    short: 'Bible Quiz',
    description: 'Engaging scripture challenge',
    icon: <Trophy className="h-6 w-6" />,
    path: '/bible-quiz',
  },
  {
    id: 'events',
    label: 'Events & Community',
    short: 'Events',
    description: 'Services, prayer & volunteering',
    icon: <CalendarDays className="h-6 w-6" />,
    path: '/events',
  },
  {
    id: 'giving',
    label: 'Secure Giving',
    short: 'Giving',
    description: 'Tithes, offerings & progress tracking',
    icon: <HandHeart className="h-6 w-6" />,
    path: '/give',
  },
];

// The order the tutorial walks through the nodes.
const TUTORIAL_ORDER: FeatureId[] = [
  'media',
  'quiz',
  'gallery',
  'events',
  'giving',
  'about',
];

// ---- Diagram geometry -------------------------------------------------------
// Each layout is defined as a viewBox (W x H) + angle per node around an ellipse.
interface Geometry {
  W: number;
  H: number;
  RX: number;
  RY: number;
  angles: Record<FeatureId, number>;
}

const DESKTOP_GEO: Geometry = {
  W: 1000,
  H: 640,
  RX: 360,
  RY: 250,
  angles: { about: -90, media: -30, gallery: 30, giving: 90, events: 150, quiz: 210 },
};

const MOBILE_GEO: Geometry = {
  W: 380,
  H: 460,
  RX: 138,
  RY: 175,
  angles: { about: -90, media: -30, gallery: 30, giving: 90, events: 150, quiz: 210 },
};

function pointFor(geo: Geometry, id: FeatureId) {
  const rad = (geo.angles[id] * Math.PI) / 180;
  return {
    x: geo.W / 2 + geo.RX * Math.cos(rad),
    y: geo.H / 2 + geo.RY * Math.sin(rad),
  };
}

// ---- Detail card ------------------------------------------------------------
const FeatureDetail: React.FC<{ feature: FeatureNode; onGo: () => void }> = ({
  feature,
  onGo,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-orange-500 text-white shadow-lg">
          {feature.icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">{feature.label}</h3>
          <p className="text-sm text-slate-500">{feature.description}</p>
        </div>
      </div>

      {feature.id === 'media' && (
        <div className="space-y-2">
          {['Walking In Faith', 'The Power of Prayer', 'Grace Unmeasured'].map(
            (title, i) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-blue-600 text-white">
                  <Play className="h-4 w-4 fill-current" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {title}
                  </p>
                  <p className="text-xs text-slate-500">
                    Pastor's Message · {28 + i * 4} min
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {feature.id === 'events' && (
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                Worship
              </span>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                Featured
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                Recurring
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-800">
              Sunday Worship Service
            </p>
            <p className="text-xs text-slate-500">
              Every Sunday · 10:00 AM – 1:00 PM · Chamboli, Kitwe
            </p>
          </div>
        </div>
      )}

      {feature.id === 'giving' && (
        <div className="space-y-4">
          {[
            { label: 'Tithes', pct: 72, raised: 'ZMW 36,000', goal: 'ZMW 50,000' },
            {
              label: 'Offerings',
              pct: 45,
              raised: 'ZMW 13,500',
              goal: 'ZMW 30,000',
            },
          ].map((item) => (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-800">{item.label}</span>
                <span className="text-slate-500">
                  {item.raised} / {item.goal}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-orange-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {feature.id === 'about' && (
        <p className="text-sm leading-relaxed text-slate-600">
          A place of worship, fellowship, and spiritual growth in the heart of
          Kitwe. Discover our story, our mission, and the heart behind Mercy Seat
          Ministries.
        </p>
      )}

      {(feature.id === 'gallery' || feature.id === 'quiz') && (
        <div className="rounded-xl border border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-orange-50 p-5 text-center">
          <Sparkles className="mx-auto mb-2 h-6 w-6 text-orange-500" />
          <p className="text-sm font-medium text-slate-700">
            {feature.id === 'gallery'
              ? 'Relive the moments — browse our church gallery.'
              : 'Ready to test your scripture knowledge?'}
          </p>
        </div>
      )}

      <Button
        onClick={onGo}
        className="w-full bg-gradient-to-r from-blue-600 to-orange-500 font-semibold text-white hover:opacity-90"
      >
        Explore {feature.short}
        <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

// ---- Node diagram (shared by desktop & mobile) ------------------------------
const NodeDiagram: React.FC<{
  geo: Geometry;
  activeId: FeatureId;
  hoverId: FeatureId | null;
  tutorialId: FeatureId | null;
  hubScale?: number;
  nodeSize?: number;
  onSelect: (id: FeatureId) => void;
  onHover: (id: FeatureId | null) => void;
}> = ({
  geo,
  activeId,
  hoverId,
  tutorialId,
  hubScale = 1,
  nodeSize = 80,
  onSelect,
  onHover,
}) => {
  const CX = geo.W / 2;
  const CY = geo.H / 2;
  const points = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {};
    FEATURES.forEach((f) => (map[f.id] = pointFor(geo, f.id)));
    return map;
  }, [geo]);

  const hubPx = 128 * hubScale;

  return (
    <div
      className="relative mx-auto w-full"
      style={{ aspectRatio: `${geo.W} / ${geo.H}` }}
    >
      {/* connectors */}
      <svg
        viewBox={`0 0 ${geo.W} ${geo.H}`}
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(217 91% 55%)" />
            <stop offset="100%" stopColor="hsl(24 95% 55%)" />
          </linearGradient>
        </defs>
        {FEATURES.map((f) => {
          const p = points[f.id];
          const active = activeId === f.id || hoverId === f.id || tutorialId === f.id;
          const d = `M ${CX} ${CY} Q ${(CX + p.x) / 2} ${
            (CY + p.y) / 2 - 30
          } ${p.x} ${p.y}`;
          return (
            <g key={f.id}>
              <path d={d} stroke="hsl(214 32% 88%)" strokeWidth={2} />
              <motion.path
                d={d}
                stroke="url(#lineGlow)"
                strokeWidth={4}
                strokeLinecap="round"
                initial={false}
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  filter: active
                    ? 'drop-shadow(0 0 6px hsl(24 95% 55% / 0.6))'
                    : 'none',
                }}
              />
              {active && (
                <motion.circle
                  r={5}
                  fill="hsl(24 95% 55%)"
                  initial={{ offsetDistance: '0%' } as never}
                  style={{ offsetPath: `path('${d}')` } as never}
                  animate={{ offsetDistance: ['0%', '100%'] } as never}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* center hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="relative flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-blue-500 text-center text-white shadow-xl ring-4 ring-white"
          style={{ height: hubPx, width: hubPx }}
        >
          <div className="absolute -z-10 h-[140%] w-[140%] animate-pulse rounded-full bg-orange-400/30 blur-2xl" />
          <HandHeart className="mb-1 h-6 w-6 text-orange-300" />
          <span className="px-2 text-sm font-bold leading-tight">
            Mercy Seat
            <br />
            Connect
          </span>
        </div>
      </motion.div>

      {/* feature nodes */}
      {FEATURES.map((f) => {
        const p = points[f.id];
        const active = activeId === f.id;
        const tutoring = tutorialId === f.id;
        return (
          <button
            key={f.id}
            onClick={() => onSelect(f.id)}
            onMouseEnter={() => onHover(f.id)}
            onMouseLeave={() => onHover(null)}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
            style={{
              left: `${(p.x / geo.W) * 100}%`,
              top: `${(p.y / geo.H) * 100}%`,
            }}
          >
            {/* tutorial highlight ring */}
            {tutoring && (
              <motion.span
                className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-orange-400"
                style={{ height: nodeSize + 28, width: nodeSize + 28 }}
                initial={{ opacity: 0.8, scale: 0.85 }}
                animate={{ opacity: [0.8, 0, 0.8], scale: [0.85, 1.25, 0.85] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              animate={tutoring ? { scale: 1.12 } : { scale: 1 }}
              className={`flex flex-col items-center justify-center rounded-2xl border text-center shadow-md transition-colors ${
                active || tutoring
                  ? 'border-transparent bg-gradient-to-br from-blue-600 to-orange-500 text-white shadow-orange-500/30'
                  : 'border-slate-100 bg-white text-blue-700 hover:border-orange-200'
              }`}
              style={{ height: nodeSize, width: nodeSize }}
            >
              {f.icon}
              <span className="mt-1 px-1 text-[10px] font-semibold leading-tight">
                {f.short}
              </span>
            </motion.div>
          </button>
        );
      })}
    </div>
  );
};

// ---- Main component ---------------------------------------------------------
export const FeatureNodeMap: React.FC = () => {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<FeatureId>('about');
  const [hoverId, setHoverId] = useState<FeatureId | null>(null);
  const [tutorialId, setTutorialId] = useState<FeatureId | null>(null);
  const [isTutorialRunning, setIsTutorialRunning] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const activeFeature = useMemo(
    () => FEATURES.find((f) => f.id === activeId)!,
    [activeId]
  );

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const runTutorial = useCallback(() => {
    clearTimers();
    setIsTutorialRunning(true);
    const stepMs = 1700;
    TUTORIAL_ORDER.forEach((id, i) => {
      timers.current.push(
        setTimeout(() => {
          setTutorialId(id);
          setActiveId(id);
        }, i * stepMs)
      );
    });
    timers.current.push(
      setTimeout(() => {
        setTutorialId(null);
        setIsTutorialRunning(false);
      }, TUTORIAL_ORDER.length * stepMs)
    );
  }, [clearTimers]);

  const stopTutorial = useCallback(() => {
    clearTimers();
    setTutorialId(null);
    setIsTutorialRunning(false);
  }, [clearTimers]);

  // Auto-run once on first landing.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('msc_tutorial_seen') === '1';
    } catch {
      seen = false;
    }
    if (!seen) {
      const t = setTimeout(() => {
        runTutorial();
        try {
          sessionStorage.setItem('msc_tutorial_seen', '1');
        } catch {
          /* ignore */
        }
      }, 1200);
      timers.current.push(t);
    }
    return () => clearTimers();
  }, [runTutorial, clearTimers]);

  const handleSelect = useCallback(
    (id: FeatureId) => {
      if (isTutorialRunning) stopTutorial();
      setActiveId(id);
    },
    [isTutorialRunning, stopTutorial]
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-orange-50/30 py-16">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-blue-700 shadow-sm">
            <Sparkles className="h-4 w-4 text-orange-500" />
            Explore Mercy Seat Connect
          </span>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
            One Family. Every Way to Connect.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Tap any node to preview what's happening across our ministry — from
            sermons and events to giving and community.
          </p>

          <div className="mt-5 flex justify-center">
            <Button
              variant="outline"
              onClick={() => (isTutorialRunning ? stopTutorial() : runTutorial())}
              className="rounded-full border-orange-200 bg-white/80 font-semibold text-orange-600 hover:bg-orange-50"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              {isTutorialRunning ? 'Stop Tour' : 'App Tutorial'}
            </Button>
          </div>
        </div>

        {/* DESKTOP: node diagram + detail card */}
        <div className="hidden grid-cols-1 gap-8 lg:grid lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="mx-auto max-w-3xl">
              <NodeDiagram
                geo={DESKTOP_GEO}
                activeId={activeId}
                hoverId={hoverId}
                tutorialId={tutorialId}
                hubScale={1}
                nodeSize={80}
                onSelect={handleSelect}
                onHover={setHoverId}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-white bg-white/80 p-6 shadow-xl backdrop-blur">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <FeatureDetail
                    feature={activeFeature}
                    onGo={() => navigate(activeFeature.path)}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* MOBILE: compact node diagram + detail card */}
        <div className="lg:hidden">
          <div className="mx-auto max-w-sm">
            <NodeDiagram
              geo={MOBILE_GEO}
              activeId={activeId}
              hoverId={hoverId}
              tutorialId={tutorialId}
              hubScale={0.72}
              nodeSize={62}
              onSelect={handleSelect}
              onHover={setHoverId}
            />
          </div>
          <div className="mt-6 rounded-3xl border border-white bg-white/90 p-5 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <FeatureDetail
                  feature={activeFeature}
                  onGo={() => navigate(activeFeature.path)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureNodeMap;
