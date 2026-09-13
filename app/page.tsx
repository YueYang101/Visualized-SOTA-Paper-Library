'use client';

import {
  AlertTriangle,
  Bot,
  BookOpen,
  Check,
  CircleHelp,
  Database,
  Download,
  ExternalLink,
  FileText,
  FlaskConical,
  GripVertical,
  List,
  LoaderCircle,
  MessageCircle,
  Network,
  Plus,
  Play,
  RotateCw,
  Search,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  type ChangeEvent,
  type CSSProperties,
  type DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { migrateOverrides } from './data/classification';
import { graspCircles, graspMapSize, positionGraspPapers } from './data/grasp-layout';
import { graspTopicManifest } from './data/grasp-topics';
import { categoryManifest } from './data/manifest';
import { loadCategory, loadPaperDetail } from './data/loaders';
import {
  positionSharedControlPapers,
  sharedControlCircles,
  sharedControlMapSize,
} from './data/shared-control-layout';
import { sharedControlTopicManifest } from './data/shared-control-topics';
import {
  categoryIds,
  graspTopicIds,
  sharedControlTopicIds,
  type CategoryId,
  type GraspTopicId,
  type LocalStore,
  type PaperDetail,
  type PaperIndex,
  type PaperOverride,
  type Priority,
  type SharedControlTopicId,
} from './data/types';

const STORAGE_KEY = 'literature-atlas:overrides:v1';
const priorities: Priority[] = ['very-high', 'high', 'medium', 'low'];
const priorityLabels: Record<Priority, string> = {
  'very-high': '极高',
  high: '高',
  medium: '中',
  low: '低',
};
const priorityRadius: Record<Priority, number> = {
  'very-high': 9,
  high: 19,
  medium: 30,
  low: 40,
};
const prioritySize: Record<Priority, number> = {
  'very-high': 16,
  high: 14,
  medium: 12,
  low: 10,
};

type ViewMode = 'graph' | 'list';
type ReadingFilter = 'all' | 'completed' | 'needed' | 'undecided';

function getReadingVisual(paper: PaperIndex) {
  if (paper.deepRead.completed && paper.deepRead.needed) {
    return { key: 'reread', label: '已精读 · 需复读', icon: RotateCw };
  }
  if (paper.deepRead.completed) {
    return { key: 'deep', label: '已精读', icon: Check };
  }
  if (paper.deepRead.needed) {
    return { key: 'queue', label: '待精读', icon: AlertTriangle };
  }
  return { key: 'undecided', label: '未判断', icon: CircleHelp };
}

function applyOverride(paper: PaperIndex, override?: PaperOverride): PaperIndex {
  if (!override) return paper;
  return {
    ...paper,
    ...override.changes,
    deepRead: override.changes.deepRead ?? paper.deepRead,
  };
}

function hashText(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0);
}

function positionPapers(papers: PaperIndex[], zoom: number) {
  const positions: Record<string, { x: number; y: number }> = {};
  const capacityByPriority: Record<Priority, number> = {
    'very-high': 6,
    high: 10,
    medium: 14,
    low: 18,
  };

  priorities.forEach((priority, priorityIndex) => {
    const group = papers
      .filter((paper) => paper.priority === priority)
      .sort((left, right) => hashText(left.id) - hashText(right.id));
    const capacity = capacityByPriority[priority];
    const ringCount = Math.max(1, Math.ceil(group.length / capacity));
    const phase = (-90 + priorityIndex * 43) * (Math.PI / 180);

    group.forEach((paper, index) => {
      const ringIndex = Math.floor(index / capacity);
      const firstIndex = ringIndex * capacity;
      const papersOnRing = Math.min(capacity, group.length - firstIndex);
      const indexOnRing = index - firstIndex;
      const stagger = ringIndex % 2 === 0 ? 0 : Math.PI / Math.max(1, papersOnRing);
      const angle = phase + stagger + (indexOnRing * Math.PI * 2) / Math.max(1, papersOnRing);
      const ringOffset = (ringIndex - (ringCount - 1) / 2) * 3;
      const radius = (priorityRadius[priority] + ringOffset) * zoom;
      positions[paper.id] = {
        x: 50 + Math.cos(angle) * radius,
        y: 49 + Math.sin(angle) * radius * 0.72,
      };
    });
  });

  return positions;
}

function isCategoryId(value: unknown): value is CategoryId {
  return typeof value === 'string' && categoryIds.includes(value as CategoryId);
}

function isPriority(value: unknown): value is Priority {
  return typeof value === 'string' && priorities.includes(value as Priority);
}

function isGraspTopicId(value: unknown): value is GraspTopicId {
  return typeof value === 'string' && graspTopicIds.includes(value as GraspTopicId);
}

function isSharedControlTopicId(value: unknown): value is SharedControlTopicId {
  return typeof value === 'string' && sharedControlTopicIds.includes(value as SharedControlTopicId);
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('grasping');
  const [loadedCategories, setLoadedCategories] = useState<Partial<Record<CategoryId, PaperIndex[]>>>({});
  const [knownPapers, setKnownPapers] = useState<Record<string, PaperIndex>>({});
  const [loadingCategory, setLoadingCategory] = useState(true);
  const [categoryError, setCategoryError] = useState('');
  const [overrides, setOverrides] = useState<Record<string, PaperOverride>>({});
  const [query, setQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Priority>('all');
  const [readingFilter, setReadingFilter] = useState<ReadingFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('graph');
  const [renderLimit, setRenderLimit] = useState(150);
  const [zoom, setZoom] = useState(1);
  const [hoveredPaperId, setHoveredPaperId] = useState<string | null>(null);
  const [focusedPaperId, setFocusedPaperId] = useState<string | null>(null);
  const [draggedPaperId, setDraggedPaperId] = useState<string | null>(null);
  const [dropCategory, setDropCategory] = useState<CategoryId | null>(null);
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);
  const [detail, setDetail] = useState<PaperDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [tagDraft, setTagDraft] = useState('');
  const [notice, setNotice] = useState('');
  const importInputRef = useRef<HTMLInputElement>(null);
  const detailCacheRef = useRef(new Map<string, PaperDetail>());
  const detailRequestRef = useRef(0);
  const toolBridgeRef = useRef<{
    read: () => unknown;
    update: (id: string, changes: PaperOverride['changes']) => PaperIndex;
  } | null>(null);

  const persistOverrides = useCallback((next: Record<string, PaperOverride>) => {
    setOverrides(next);
    try {
      const payload: LocalStore = { schemaVersion: 1, papers: next };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      setNotice('浏览器无法保存本次修改，请先导出备份。');
    }
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as Partial<LocalStore>;
        if (parsed.schemaVersion === 1 && parsed.papers && typeof parsed.papers === 'object') {
          setOverrides(migrateOverrides(parsed.papers));
        } else {
          setNotice('发现旧版或无效的本地数据，已安全忽略。');
        }
      } catch {
        setNotice('本地数据损坏，地图已用原始数据打开；建议导入最近备份。');
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setNotice('另一个窗口修改了地图；刷新后可同步。');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (loadedCategories[activeCategory]) return;
    let cancelled = false;
    loadCategory(activeCategory)
      .then((papers) => {
        if (cancelled) return;
        setLoadedCategories((current) => ({ ...current, [activeCategory]: papers }));
        setKnownPapers((current) => {
          const next = { ...current };
          papers.forEach((paper) => {
            const existing = next[paper.id];
            next[paper.id] = {
              ...existing,
              ...paper,
              graspTopics: paper.graspTopics ?? existing?.graspTopics,
              sharedControlTopics:
                paper.sharedControlTopics ?? existing?.sharedControlTopics,
            };
          });
          return next;
        });
      })
      .catch(() => {
        if (!cancelled) setCategoryError('这张地图没有加载成功，请重试。');
      })
      .finally(() => {
        if (!cancelled) setLoadingCategory(false);
      });
    return () => { cancelled = true; };
  }, [activeCategory, loadedCategories]);

  const originalPapers = useMemo(() => {
    const next = { ...knownPapers };
    Object.values(overrides).forEach((override) => {
      if (!next[override.original.id]) next[override.original.id] = override.original;
    });
    return next;
  }, [knownPapers, overrides]);

  const mergedPapers = useMemo(
    () => Object.values(originalPapers).map((paper) => applyOverride(paper, overrides[paper.id])),
    [originalPapers, overrides],
  );

  const filteredPapers = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    return mergedPapers
      .filter((paper) => paper.categories.includes(activeCategory))
      .filter((paper) => priorityFilter === 'all' || paper.priority === priorityFilter)
      .filter((paper) => {
        if (readingFilter === 'completed') return paper.deepRead.completed;
        if (readingFilter === 'needed') return paper.deepRead.needed;
        if (readingFilter === 'undecided') return !paper.deepRead.completed && !paper.deepRead.needed;
        return true;
      })
      .filter((paper) => {
        if (!normalizedQuery) return true;
        const haystack = [paper.title, paper.shortTitle, paper.venue, ...paper.tags].join(' ').toLocaleLowerCase();
        return haystack.includes(normalizedQuery);
      })
      .sort((left, right) => priorities.indexOf(left.priority) - priorities.indexOf(right.priority));
  }, [activeCategory, mergedPapers, priorityFilter, query, readingFilter]);

  const isSetMap = activeCategory === 'grasping' || activeCategory === 'shared-control';
  const visiblePapers = useMemo(() => isSetMap ? filteredPapers : filteredPapers.slice(0, renderLimit), [filteredPapers, isSetMap, renderLimit]);
  const allGraspPapers = useMemo(() => mergedPapers.filter((paper) => paper.categories.includes('grasping')), [mergedPapers]);
  const allSharedControlPapers = useMemo(() => mergedPapers.filter((paper) => paper.categories.includes('shared-control')), [mergedPapers]);
  const emphasizedPaperId = hoveredPaperId ?? focusedPaperId;
  const nodePositions = useMemo(
    () => {
      if (activeCategory === 'grasping') return positionGraspPapers(allGraspPapers);
      if (activeCategory === 'shared-control') return positionSharedControlPapers(allSharedControlPapers);
      return positionPapers(visiblePapers, zoom);
    },
    [activeCategory, allGraspPapers, allSharedControlPapers, visiblePapers, zoom],
  );

  const edges = useMemo(() => {
    const candidates: Array<{ from: string; to: string; strength: number }> = [];
    for (let left = 0; left < visiblePapers.length; left += 1) {
      for (let right = left + 1; right < visiblePapers.length; right += 1) {
        const shared = visiblePapers[left].tags.filter((tag) => visiblePapers[right].tags.includes(tag)).length;
        if (shared >= 2) candidates.push({ from: visiblePapers[left].id, to: visiblePapers[right].id, strength: shared });
      }
    }
    return candidates.sort((a, b) => b.strength - a.strength).slice(0, visiblePapers.length * 3);
  }, [visiblePapers]);

  const categoryCounts = useMemo(() => {
    const counts = Object.fromEntries(categoryManifest.map((category) => [category.id, category.count])) as Record<CategoryId, number>;
    Object.values(overrides).forEach((override) => {
      const updated = applyOverride(override.original, override);
      categoryIds.forEach((category) => {
        const before = override.original.categories.includes(category);
        const after = updated.categories.includes(category);
        if (before !== after) counts[category] += after ? 1 : -1;
      });
    });
    return counts;
  }, [overrides]);

  const graspTopicCounts = useMemo(() => {
    const robustPapers = mergedPapers.filter((paper) => paper.categories.includes('grasping'));
    return Object.fromEntries(
      graspTopicManifest.map((topic) => [
        topic.id,
        robustPapers.filter((paper) => paper.graspTopics?.includes(topic.id)).length,
      ]),
    ) as Record<GraspTopicId, number>;
  }, [mergedPapers]);

  const sharedControlTopicCounts = useMemo(() => {
    const sharedControlPapers = mergedPapers.filter((paper) => paper.categories.includes('shared-control'));
    return Object.fromEntries(
      sharedControlTopicManifest.map((topic) => [
        topic.id,
        sharedControlPapers.filter((paper) => paper.sharedControlTopics?.includes(topic.id)).length,
      ]),
    ) as Record<SharedControlTopicId, number>;
  }, [mergedPapers]);

  const selectedPaper = selectedPaperId
    ? mergedPapers.find((paper) => paper.id === selectedPaperId) ?? null
    : null;
  const activeManifest = categoryManifest.find((category) => category.id === activeCategory)!;

  const updatePaper = useCallback((id: string, changes: PaperOverride['changes']) => {
    const original = originalPapers[id];
    if (!original) throw new Error('没有找到这篇论文。');
    const currentPaper = applyOverride(original, overrides[id]);
    const nextPaper = { ...currentPaper, ...changes };
    if (nextPaper.categories.includes('grasping') && !nextPaper.graspTopics?.length && (changes.graspTopics !== undefined || (changes.categories && !currentPaper.categories.includes('grasping')))) {
      throw new Error('请至少选择跨本体泛化、Robust、任务理解中的一项。');
    }
    if (nextPaper.categories.includes('shared-control') && !nextPaper.sharedControlTopics?.length && (changes.sharedControlTopics !== undefined || (changes.categories && !currentPaper.categories.includes('shared-control')))) {
      throw new Error('请至少选择意图融合、Human Model 中的一项。');
    }
    const existing = overrides[id];
    const nextOverride: PaperOverride = {
      original: existing?.original ?? original,
      changes: { ...existing?.changes, ...changes },
      updatedAt: new Date().toISOString(),
    };
    const next = { ...overrides, [id]: nextOverride };
    persistOverrides(next);
    return applyOverride(original, nextOverride);
  }, [originalPapers, overrides, persistOverrides]);

  const openPaper = useCallback((paper: PaperIndex) => {
    setSelectedPaperId(paper.id);
    setTagDraft('');
    setDetailError('');
    const cached = detailCacheRef.current.get(paper.id);
    if (cached) {
      setDetail(cached);
      setDetailLoading(false);
      return;
    }
    const requestId = detailRequestRef.current + 1;
    detailRequestRef.current = requestId;
    setDetail(null);
    setDetailLoading(true);
    loadPaperDetail(paper.id)
      .then((result) => {
        if (detailRequestRef.current !== requestId) return;
        detailCacheRef.current.set(paper.id, result);
        setDetail(result);
      })
      .catch((error: unknown) => {
        if (detailRequestRef.current === requestId) {
          setDetailError(error instanceof Error ? error.message : '详情加载失败。');
        }
      })
      .finally(() => {
        if (detailRequestRef.current === requestId) setDetailLoading(false);
      });
  }, []);

  const addPaperToCategory = (paperId: string, category: CategoryId) => {
    const paper = mergedPapers.find((item) => item.id === paperId);
    if (!paper) return;
    if (paper.categories.includes(category)) {
      setNotice(`《${paper.shortTitle}》已在 ${categoryManifest.find((item) => item.id === category)?.label} 中。`);
      return;
    }
    if (category === 'grasping' && !paper.graspTopics?.length) {
      openPaper(paper);
      setNotice('请在详情中选择 Grasping 的三项分类之一，即可加入。');
      return;
    }
    if (category === 'shared-control' && !paper.sharedControlTopics?.length) {
      openPaper(paper);
      setNotice('请在详情中选择 Share Control 的两项分类之一，即可加入。');
      return;
    }
    updatePaper(paperId, { categories: [...paper.categories, category] });
    setNotice(`已把《${paper.shortTitle}》加入 ${categoryManifest.find((item) => item.id === category)?.label}。`);
  };

  const onDropCategory = (event: DragEvent, category: CategoryId) => {
    event.preventDefault();
    const paperId = event.dataTransfer.getData('text/paper-id') || draggedPaperId;
    if (paperId) addPaperToCategory(paperId, category);
    setDraggedPaperId(null);
    setDropCategory(null);
  };

  const togglePaperCategory = (category: CategoryId, checked: boolean) => {
    if (!selectedPaper) return;
    if (checked && category === 'grasping' && !selectedPaper.graspTopics?.length) {
      setNotice('请先在下方选择跨本体泛化、Robust、任务理解中的至少一项。');
      return;
    }
    if (checked && category === 'shared-control' && !selectedPaper.sharedControlTopics?.length) {
      setNotice('请先在下方选择意图融合、Human Model 中的至少一项。');
      return;
    }
    let categories = selectedPaper.categories;
    if (checked) categories = Array.from(new Set([...categories, category]));
    else categories = categories.filter((item) => item !== category);
    if (categories.length === 0) {
      setNotice('一篇论文至少需要保留在一张地图中。');
      return;
    }
    updatePaper(selectedPaper.id, { categories });
  };

  const togglePaperGraspTopic = (topic: GraspTopicId) => {
    if (!selectedPaper) return;
    const topics = selectedPaper.graspTopics ?? [];
    const nextTopics = topics.includes(topic)
      ? topics.filter((item) => item !== topic)
      : [...topics, topic];
    if (!nextTopics.length && selectedPaper.categories.includes('grasping')) {
      setNotice('Grasping 论文至少保留一项分类；也可以取消所属 Grasping 地图。');
      return;
    }
    updatePaper(selectedPaper.id, { graspTopics: nextTopics, categories: Array.from(new Set([...selectedPaper.categories, 'grasping' as const])) });
  };

  const togglePaperSharedControlTopic = (topic: SharedControlTopicId) => {
    if (!selectedPaper) return;
    const topics = selectedPaper.sharedControlTopics ?? [];
    const nextTopics = topics.includes(topic)
      ? topics.filter((item) => item !== topic)
      : [...topics, topic];
    if (!nextTopics.length && selectedPaper.categories.includes('shared-control')) {
      setNotice('Share Control 论文至少保留一项分类；也可以取消所属 Share Control 地图。');
      return;
    }
    updatePaper(selectedPaper.id, {
      sharedControlTopics: nextTopics,
      categories: Array.from(new Set([...selectedPaper.categories, 'shared-control' as const])),
    });
  };

  const addTag = (rawTag: string) => {
    if (!selectedPaper) return;
    const tag = rawTag.trim().replace(/\s+/g, ' ');
    if (!tag) return;
    if (tag.length > 24) {
      setNotice('标签请控制在 24 个字符以内。');
      return;
    }
    if (selectedPaper.tags.includes(tag)) {
      setNotice('这个标签已经存在。');
      return;
    }
    if (selectedPaper.tags.length >= 8) {
      setNotice('每篇最多保留 8 个标签，请先删掉一个。');
      return;
    }
    updatePaper(selectedPaper.id, { tags: [...selectedPaper.tags, tag] });
    setTagDraft('');
  };

  const removeTag = (tag: string) => {
    if (!selectedPaper) return;
    updatePaper(selectedPaper.id, { tags: selectedPaper.tags.filter((item) => item !== tag) });
  };

  const exportChanges = useCallback(() => {
    const payload: LocalStore = { schemaVersion: 1, papers: overrides };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `literature-atlas-backup-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice('本地修改已导出。');
  }, [overrides]);

  const importChanges = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text()) as Partial<LocalStore>;
      if (parsed.schemaVersion !== 1 || !parsed.papers || typeof parsed.papers !== 'object') {
        throw new Error('格式不符合 v1 备份结构。');
      }
      const safeEntries = Object.entries(parsed.papers).filter(([, value]) => {
        const record = value as PaperOverride;
        return Boolean(record?.original?.id && record.changes && record.updatedAt);
      });
      persistOverrides({ ...overrides, ...migrateOverrides(Object.fromEntries(safeEntries)) });
      setNotice(`已导入 ${safeEntries.length} 篇论文的修改。`);
    } catch (error) {
      setNotice(error instanceof Error ? `导入失败：${error.message}` : '导入失败。');
    }
  };

  useEffect(() => {
    toolBridgeRef.current = {
      read: () => ({
        category: activeCategory,
        papers: filteredPapers.map((paper) => ({
          id: paper.id,
          title: paper.title,
          priority: paper.priority,
          deepRead: paper.deepRead,
          graspTopics: paper.graspTopics,
          sharedControlTopics: paper.sharedControlTopics,
          tags: paper.tags,
        })),
      }),
      update: updatePaper,
    };
  }, [activeCategory, filteredPapers, updatePaper]);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const reportError = () => undefined;
    try {
      void Promise.resolve(context.registerTool({
        name: 'read_current_literature_map',
        title: '读取当前文献地图',
        description: '读取当前打开的分类及其已加载论文的优先级、精读状态和标签。',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true, untrustedContentHint: false },
        execute: () => toolBridgeRef.current?.read() ?? { category: null, papers: [] },
      }, { signal: lifecycle.signal })).catch(reportError);

      void Promise.resolve(context.registerTool({
        name: 'update_literature_paper',
        title: '更新论文地图信息',
        description: '更新一篇已加载论文的地图分类、Grasping／Share Control 分类、优先级、精读状态或标签，并同步到可见界面和本地存储。',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            categories: { type: 'array', items: { type: 'string', enum: categoryIds } },
            graspTopics: { type: 'array', items: { type: 'string', enum: graspTopicIds } },
            sharedControlTopics: { type: 'array', items: { type: 'string', enum: sharedControlTopicIds } },
            priority: { type: 'string', enum: priorities },
            completed: { type: 'boolean' },
            needed: { type: 'boolean' },
            tags: { type: 'array', maxItems: 8, items: { type: 'string', maxLength: 24 } },
          },
          required: ['id'],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute: (input: unknown) => {
          if (!input || typeof input !== 'object') throw new Error('输入必须是对象。');
          const value = input as Record<string, unknown>;
          if (typeof value.id !== 'string') throw new Error('缺少论文 id。');
          const changes: PaperOverride['changes'] = {};
          if (value.priority !== undefined) {
            if (!isPriority(value.priority)) throw new Error('优先级无效。');
            changes.priority = value.priority;
          }
          if (value.categories !== undefined) {
            if (!Array.isArray(value.categories) || value.categories.length === 0 || !value.categories.every(isCategoryId)) {
              throw new Error('分类无效或为空。');
            }
            changes.categories = Array.from(new Set(value.categories));
          }
          if (value.graspTopics !== undefined) {
            if (!Array.isArray(value.graspTopics) || !value.graspTopics.every(isGraspTopicId)) {
              throw new Error('Grasping 分类无效。');
            }
            changes.graspTopics = Array.from(new Set(value.graspTopics));
          }
          if (value.sharedControlTopics !== undefined) {
            if (!Array.isArray(value.sharedControlTopics) || !value.sharedControlTopics.every(isSharedControlTopicId)) {
              throw new Error('Share Control 分类无效。');
            }
            changes.sharedControlTopics = Array.from(new Set(value.sharedControlTopics));
          }
          if (value.tags !== undefined) {
            if (!Array.isArray(value.tags) || value.tags.length > 8 || !value.tags.every((tag) => typeof tag === 'string' && tag.trim().length > 0 && tag.length <= 24)) {
              throw new Error('标签无效。');
            }
            changes.tags = Array.from(new Set(value.tags.map((tag) => (tag as string).trim())));
          }
          const base = originalPapers[value.id];
          if (!base) throw new Error('论文尚未加载。');
          if (value.completed !== undefined || value.needed !== undefined) {
            changes.deepRead = {
              completed: typeof value.completed === 'boolean' ? value.completed : base.deepRead.completed,
              needed: typeof value.needed === 'boolean' ? value.needed : base.deepRead.needed,
            };
          }
          const updated = toolBridgeRef.current?.update(value.id, changes);
          return { id: updated?.id, updated: true };
        },
      }, { signal: lifecycle.signal })).catch(reportError);
    } catch {
      return () => lifecycle.abort();
    }
    return () => lifecycle.abort();
  }, [originalPapers]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="app-header">
        <div className="brand-lockup">
          <div className="brand-mark"><BookOpen aria-hidden="true" /></div>
          <div>
            <p className="eyebrow">LITERATURE ATLAS</p>
            <h1>文献脉络图</h1>
          </div>
        </div>
        <div className="header-actions">
          <div className="search-field">
            <Search aria-hidden="true" />
            <Input aria-label="搜索当前地图的标题或标签" value={query} onChange={(event) => { setQuery(event.target.value); setRenderLimit(150); }} placeholder="搜索当前地图…" />
          </div>
          <input ref={importInputRef} type="file" accept="application/json,.json" hidden onChange={importChanges} />
          <Button variant="outline" onClick={() => importInputRef.current?.click()}><Upload />导入</Button>
          <Button variant="outline" onClick={exportChanges}><Download />导出</Button>
        </div>
      </header>

      {notice && (
        <output className="notice-bar">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice('')} aria-label="关闭提示"><X /></button>
        </output>
      )}

      <Tabs
        value={activeCategory}
        onValueChange={(value) => {
          const category = value as CategoryId;
          setActiveCategory(category);
          setRenderLimit(150);
          setCategoryError('');
          setLoadingCategory(!loadedCategories[category]);
        }}
        orientation="vertical"
        className="workspace-shell"
      >
        <aside className="map-rail">
          <p className="rail-label">研究地图 · 拖到这里可增加分类</p>
          <TabsList variant="line" className="map-tabs">
            {categoryManifest.map((category, index) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={dropCategory === category.id ? 'is-drop-target' : ''}
                onDragEnter={() => setDropCategory(category.id)}
                onDragLeave={() => setDropCategory((current) => current === category.id ? null : current)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => onDropCategory(event, category.id)}
              >
                <span className="map-tab-index">0{index + 1}</span>
                <span className="map-tab-copy">
                  <strong>{category.label}</strong>
                  <small>{category.description}</small>
                </span>
                <span className="map-count">{categoryCounts[category.id]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="priority-key">
            <p>{isSetMap ? '优先级 · 节点越大越高' : '优先级 · 越靠中心越高'}</p>
            {priorities.map((priority) => (
              <span key={priority}>
                <i className={`priority-dot priority-${priority}`} />
                {priorityLabels[priority]}
              </span>
            ))}
          </div>

          <div className="data-note">
            <Database aria-hidden="true" />
            <p><strong>按需读取</strong><br />只加载当前地图；完整精读卡在点开论文时读取。</p>
          </div>
        </aside>

        {categoryManifest.map((category) => (
          <TabsContent key={category.id} value={category.id} className="graph-panel">
            <div className="graph-heading">
              <div>
                <p className="eyebrow">MAP {String(categoryManifest.indexOf(category) + 1).padStart(2, '0')} · {filteredPapers.length} PAPERS</p>
                <h2>{category.label}</h2>
                <p className="map-description">{category.description}</p>
              </div>

              <div className="graph-toolbar">
                <div className="filter-row">
                  <Select value={priorityFilter} onValueChange={(value) => { setPriorityFilter(value as 'all' | Priority); setRenderLimit(150); }}>
                    <SelectTrigger aria-label="筛选优先级"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部优先级</SelectItem>
                      {priorities.map((priority) => <SelectItem key={priority} value={priority}>{priorityLabels[priority]}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={readingFilter} onValueChange={(value) => { setReadingFilter(value as ReadingFilter); setRenderLimit(150); }}>
                    <SelectTrigger aria-label="筛选精读状态"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部精读状态</SelectItem>
                      <SelectItem value="completed">已精读</SelectItem>
                      <SelectItem value="needed">需要精读 / 复读</SelectItem>
                      <SelectItem value="undecided">尚未判断</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="view-switch" aria-label="切换视图">
                  <Button size="icon" variant={viewMode === 'graph' ? 'secondary' : 'ghost'} onClick={() => setViewMode('graph')} aria-label={activeCategory === 'grasping' ? 'Grasping 三圆图' : activeCategory === 'shared-control' ? 'Share Control 双圆图' : '蛛网图'} aria-pressed={viewMode === 'graph'}><Network /></Button>
                  <Button size="icon" variant={viewMode === 'list' ? 'secondary' : 'ghost'} onClick={() => setViewMode('list')} aria-label="文章列表" aria-pressed={viewMode === 'list'}><List /></Button>
                </div>
              </div>
            </div>

            <div className="reading-legend" aria-label="节点颜色图例">
              <span><i className="state-dot state-deep" /><Check />已精读</span>
              <span><i className="state-dot state-reread" /><RotateCw />已精读 · 需复读</span>
              <span><i className="state-dot state-queue" /><AlertTriangle />待精读</span>
              <span><i className="state-dot state-undecided" /><CircleHelp />未判断</span>
            </div>

            {loadingCategory && !loadedCategories[activeCategory] ? (
              <div className="loading-map" aria-label="正在加载地图">
                <Skeleton className="h-full w-full rounded-[22px]" />
                <span><LoaderCircle className="spin" />正在读取 {activeManifest.label}…</span>
              </div>
            ) : categoryError ? (
              <div className="empty-map"><AlertTriangle /><h3>地图读取失败</h3><p>{categoryError}</p><Button onClick={() => { setLoadingCategory(true); setCategoryError(''); setLoadedCategories((current) => ({ ...current, [activeCategory]: undefined })); }}>重试</Button></div>
            ) : filteredPapers.length === 0 ? (
              <div className="empty-map">
                <Network />
                <h3>{query || priorityFilter !== 'all' || readingFilter !== 'all' ? '没有符合条件的论文' : '这张地图还没有论文'}</h3>
                <p>{query || priorityFilter !== 'all' || readingFilter !== 'all' ? '换个关键词，或清除筛选条件。' : '以后读完相关文章时，把它归入这张地图即可；也可以从其他地图把节点拖到左侧分类。'}</p>
                {(query || priorityFilter !== 'all' || readingFilter !== 'all') && <Button variant="outline" onClick={() => { setQuery(''); setPriorityFilter('all'); setReadingFilter('all'); }}>清除筛选</Button>}
              </div>
            ) : viewMode === 'graph' ? (
              <div className={`graph-canvas${isSetMap ? ' grasp-canvas' : ''}`} tabIndex={isSetMap ? 0 : undefined} role={isSetMap ? 'region' : undefined} aria-label={activeCategory === 'grasping' ? 'Grasping 全部论文：跨本体泛化、Robust、任务理解三圆图，可横向滚动' : activeCategory === 'shared-control' ? 'Share Control 全部论文：意图融合、Human Model 双圆图，可横向滚动' : undefined}>
                {!isSetMap && <div className="zoom-controls">
                  <Button size="icon-sm" variant="ghost" onClick={() => setZoom((value) => Math.max(.7, Number((value - .1).toFixed(2))))} aria-label="缩小节点间距"><ZoomOut /></Button>
                  <span>{Math.round(zoom * 100)}%</span>
                  <Button size="icon-sm" variant="ghost" onClick={() => setZoom((value) => Math.min(1.15, Number((value + .1).toFixed(2))))} aria-label="放大节点间距"><ZoomIn /></Button>
                </div>}
                <div className={`graph-space${isSetMap ? ' grasp-space' : ''}${activeCategory === 'shared-control' ? ' shared-control-space' : ''}${emphasizedPaperId ? ' is-emphasizing' : ''}`}>
                  {activeCategory === 'grasping' ? <>
                    <svg className="grasp-venn" viewBox={`0 0 ${graspMapSize.width} ${graspMapSize.height}`} aria-hidden="true">
                      {graspCircles.map((circle) => <circle key={circle.id} className={`grasp-ring topic-${circle.id}`} cx={circle.x} cy={circle.y} r={circle.r} />)}
                    </svg>
                    {graspCircles.map((circle) => <div key={circle.id} className={`grasp-circle-label topic-${circle.id}`} style={{ left: `${circle.labelX / graspMapSize.width * 100}%`, top: `${circle.labelY / graspMapSize.height * 100}%` }}>
                      <strong>{graspTopicManifest.find((topic) => topic.id === circle.id)?.label}</strong>
                      <span>{graspTopicCounts[circle.id]} 篇</span>
                    </div>)}
                  </> : activeCategory === 'shared-control' ? <>
                    <svg className="grasp-venn" viewBox={`0 0 ${sharedControlMapSize.width} ${sharedControlMapSize.height}`} aria-hidden="true">
                      {sharedControlCircles.map((circle) => <circle key={circle.id} className={`grasp-ring topic-${circle.id}`} cx={circle.x} cy={circle.y} r={circle.r} />)}
                    </svg>
                    {sharedControlCircles.map((circle) => <div key={circle.id} className={`grasp-circle-label topic-${circle.id}`} style={{ left: `${circle.labelX / sharedControlMapSize.width * 100}%`, top: `${circle.labelY / sharedControlMapSize.height * 100}%` }}>
                      <strong>{sharedControlTopicManifest.find((topic) => topic.id === circle.id)?.label}</strong>
                      <span>{sharedControlTopicCounts[circle.id]} 篇</span>
                    </div>)}
                  </> : <>
                  <div className="orbit orbit-very-high" style={{ scale: zoom }}><span>极高</span></div>
                  <div className="orbit orbit-high" style={{ scale: zoom }}><span>高</span></div>
                  <div className="orbit orbit-medium" style={{ scale: zoom }}><span>中</span></div>
                  <div className="orbit orbit-low" style={{ scale: zoom }}><span>低</span></div>
                  </>}
                  <svg className="edge-layer" aria-hidden="true">
                    {edges.map((edge) => {
                      const from = nodePositions[edge.from];
                      const to = nodePositions[edge.to];
                      const isRelated = emphasizedPaperId === edge.from || emphasizedPaperId === edge.to;
                      return <line key={`${edge.from}-${edge.to}`} className={emphasizedPaperId ? (isRelated ? 'is-highlighted' : 'is-dimmed') : ''} x1={`${from.x}%`} y1={`${from.y}%`} x2={`${to.x}%`} y2={`${to.y}%`} opacity={Math.min(.5, .12 + edge.strength * .08)} />;
                    })}
                  </svg>
                  {visiblePapers.map((paper) => {
                    const position = nodePositions[paper.id];
                    const reading = getReadingVisual(paper);
                    const size = prioritySize[paper.priority];
                    return (
                      <HoverCard key={paper.id}>
                        <HoverCardTrigger
                          render={
                            <button
                              type="button"
                              draggable
                              className={`paper-node state-${reading.key}${emphasizedPaperId === paper.id ? ' is-highlighted' : ''}${emphasizedPaperId && emphasizedPaperId !== paper.id ? ' is-dimmed' : ''}${position.x > 70 ? ' label-left' : ''}`}
                              style={{ left: `${position.x}%`, top: `${position.y}%`, '--node-size': `${size}px` } as CSSProperties}
                              aria-label={`打开 ${paper.shortTitle}：${priorityLabels[paper.priority]}优先级，${reading.label}${activeCategory === 'grasping' ? `；${graspTopicManifest.filter((topic) => paper.graspTopics?.includes(topic.id)).map((topic) => topic.label).join('、')}` : activeCategory === 'shared-control' ? `；${sharedControlTopicManifest.filter((topic) => paper.sharedControlTopics?.includes(topic.id)).map((topic) => topic.label).join('、')}` : ''}`}
                              onMouseEnter={() => setHoveredPaperId(paper.id)}
                              onMouseLeave={() => setHoveredPaperId((current) => current === paper.id ? null : current)}
                              onFocus={() => setFocusedPaperId(paper.id)}
                              onBlur={() => setFocusedPaperId((current) => current === paper.id ? null : current)}
                              onClick={() => {
                                if (!draggedPaperId) openPaper(paper);
                              }}
                              onDragStart={(event) => {
                                event.dataTransfer.effectAllowed = 'copy';
                                event.dataTransfer.setData('text/paper-id', paper.id);
                                setDraggedPaperId(paper.id);
                              }}
                              onDragEnd={() => window.setTimeout(() => { setDraggedPaperId(null); setDropCategory(null); }, 0)}
                            />
                          }
                        >
                          <span className="node-grip"><GripVertical /></span>
                          <span className="node-core" aria-hidden="true" />
                          <span className="node-title">{paper.shortTitle}</span>
                        </HoverCardTrigger>
                        <HoverCardContent className="paper-preview" side="top">
                          <div className="preview-kicker"><span className={`state-dot state-${reading.key}`} />{reading.label} · {priorityLabels[paper.priority]}</div>
                          <h3>{paper.title}</h3>
                          <p>{paper.oneMinute}</p>
                          <div className="preview-tags">{paper.tags.slice(0, 6).map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div>
                          <div className="preview-actions">
                            <small>点击节点打开完整精读卡</small>
                            <a href={paper.paperUrl} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>打开论文<ExternalLink /></a>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    );
                  })}
                </div>
                <div className="graph-note">{isSetMap ? '全部论文同图展示 · 交叠区域表示同时归属 · 每篇只显示一次' : '同级论文沿环均匀排布 · 悬停突出当前论文与相关连线 · ＋／－ 调整节点间距'}</div>
                {!isSetMap && filteredPapers.length > renderLimit && <Button className="load-more" variant="outline" onClick={() => setRenderLimit((value) => value + 150)}>再加载 150 篇</Button>}
              </div>
            ) : (
              <ul className="paper-list">
                {visiblePapers.map((paper) => {
                  const reading = getReadingVisual(paper);
                  const StateIcon = reading.icon;
                  return (
                    <li key={paper.id} className="paper-list-row">
                      <button type="button" className="paper-list-item" onClick={() => openPaper(paper)}>
                        <span className={`list-state state-${reading.key}`}><StateIcon /></span>
                        <span className="list-copy"><strong>{paper.title}</strong><small>{paper.authors.join(', ')} · {paper.venue}</small><span>{paper.oneMinute}</span></span>
                        <span className="list-meta"><Badge>{priorityLabels[paper.priority]}</Badge><small>{reading.label}</small></span>
                      </button>
                      <a className="list-paper-link" href={paper.paperUrl} target="_blank" rel="noreferrer" aria-label={`打开 ${paper.shortTitle} 论文`}>论文<ExternalLink /></a>
                    </li>
                  );
                })}
                {!isSetMap && filteredPapers.length > renderLimit && <Button variant="outline" onClick={() => setRenderLimit((value) => value + 150)}>再加载 150 篇</Button>}
              </ul>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Sheet open={Boolean(selectedPaperId)} onOpenChange={(open) => { if (!open) { setSelectedPaperId(null); detailRequestRef.current += 1; } }}>
        <SheetContent className="paper-sheet w-[min(94vw,590px)] sm:max-w-[590px]">
          {selectedPaper && (
            <>
              <SheetHeader className="paper-sheet-header">
                <div className="sheet-kicker">
                  <Badge variant="outline">{selectedPaper.venue}</Badge>
                  {detail?.spotlight && <Badge>Spotlight</Badge>}
                  <span className={`reading-pill state-${getReadingVisual(selectedPaper).key}`}>{getReadingVisual(selectedPaper).label}</span>
                </div>
                <SheetTitle>{selectedPaper.title}</SheetTitle>
                <SheetDescription>{selectedPaper.authors.join(' · ')}</SheetDescription>
                <a className="sheet-paper-link" href={selectedPaper.paperUrl} target="_blank" rel="noreferrer">直接打开论文<ExternalLink /></a>
              </SheetHeader>

              <Tabs key={selectedPaper.id} defaultValue="ai" className="paper-detail-tabs">
                <TabsList className="paper-detail-tabs-list" aria-label="论文详情内容">
                  <TabsTrigger value="ai"><Bot />AI 预读</TabsTrigger>
                  <TabsTrigger value="qa"><MessageCircle />Q&amp;A 记录 <span className="qa-count">{detail?.qa?.length ?? 0}</span></TabsTrigger>
                  {detail?.humanSummary?.length ? <TabsTrigger value="human-summary"><FileText />人为总结</TabsTrigger> : null}
                </TabsList>

                <TabsContent value="ai" className="sheet-scroll">
                  <section className="detail-section ai-summary-card">
                    <p className="section-label">AI 标签与简述</p>
                    <div className="ai-summary-tags">{selectedPaper.tags.map((tag) => <Badge key={tag} variant="outline">{tag}</Badge>)}</div>
                    <strong>{detail?.subtitle ?? selectedPaper.shortTitle}</strong>
                    <p>{selectedPaper.oneMinute}</p>
                  </section>

                  <section className="detail-section edit-grid">
                    <div>
                      <p className="section-label">阅读优先级</p>
                      <Select value={selectedPaper.priority} onValueChange={(value) => updatePaper(selectedPaper.id, { priority: value as Priority })}>
                        <SelectTrigger id="priority-select" className="wide-select"><SelectValue /></SelectTrigger>
                        <SelectContent>{priorities.map((priority) => <SelectItem key={priority} value={priority}>{priorityLabels[priority]}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="deep-read-box">
                      <p className="section-label">精读标签</p>
                      <label htmlFor="deep-read-completed"><Checkbox id="deep-read-completed" checked={selectedPaper.deepRead.completed} onCheckedChange={(checked) => updatePaper(selectedPaper.id, { deepRead: { ...selectedPaper.deepRead, completed: Boolean(checked) } })} />已经精读</label>
                      <label htmlFor="deep-read-needed"><Checkbox id="deep-read-needed" checked={selectedPaper.deepRead.needed} onCheckedChange={(checked) => updatePaper(selectedPaper.id, { deepRead: { ...selectedPaper.deepRead, needed: Boolean(checked) } })} />需要精读 / 复读</label>
                    </div>
                  </section>

                  <section className="detail-section">
                    <p className="section-label">所属地图（可多选）</p>
                    <div className="category-checks">
                      {categoryManifest.map((category) => (
                        <label key={category.id} htmlFor={`category-${category.id}`}>
                          <Checkbox id={`category-${category.id}`} checked={selectedPaper.categories.includes(category.id)} onCheckedChange={(checked) => togglePaperCategory(category.id, Boolean(checked))} />
                          <span><strong>{category.label}</strong><small>{category.description}</small></span>
                        </label>
                      ))}
                    </div>
                  </section>

                  {(
                    <section className="detail-section">
                      <p className="section-label">Grasping 分类（仅这三项，可多选）</p>
                      <div className="detail-topic-circles">
                        {graspTopicManifest.map((topic) => {
                          const active = selectedPaper.graspTopics?.includes(topic.id) ?? false;
                          return (
                            <button
                              key={topic.id}
                              type="button"
                              className={`topic-${topic.id}${active ? ' is-active' : ''}`}
                              aria-pressed={active}
                              title={topic.description}
                              onClick={() => togglePaperGraspTopic(topic.id)}
                            >
                              <span>{topic.shortLabel}</span>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  <section className="detail-section">
                    <p className="section-label">Share Control 分类（仅这两项，可多选）</p>
                    <div className="detail-topic-circles">
                      {sharedControlTopicManifest.map((topic) => {
                        const active = selectedPaper.sharedControlTopics?.includes(topic.id) ?? false;
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            className={`topic-${topic.id}${active ? ' is-active' : ''}`}
                            aria-pressed={active}
                            title={topic.description}
                            onClick={() => togglePaperSharedControlTopic(topic.id)}
                          >
                            <span>{topic.shortLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  <section className="detail-section">
                    <p className="section-label">帮助回忆的标签 <span>{selectedPaper.tags.length}/8</span></p>
                    <div className="editable-tags">
                      {selectedPaper.tags.map((tag) => <button key={tag} type="button" onClick={() => removeTag(tag)} title="点击移除">{tag}<X /></button>)}
                    </div>
                    <div className="tag-entry">
                      <Input aria-label="手动输入短标签" value={tagDraft} maxLength={24} placeholder="手动输入短标签" onChange={(event) => setTagDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); addTag(tagDraft); } }} />
                      <Button variant="outline" onClick={() => addTag(tagDraft)}><Plus />添加</Button>
                    </div>
                    {detail?.suggestedTags && detail.suggestedTags.some((tag) => !selectedPaper.tags.includes(tag)) && (
                      <div className="suggested-tags"><span>建议：</span>{detail.suggestedTags.filter((tag) => !selectedPaper.tags.includes(tag)).map((tag) => <button key={tag} type="button" onClick={() => addTag(tag)}>+ {tag}</button>)}</div>
                    )}
                  </section>

                  {detailLoading ? (
                    <section className="detail-section detail-loading"><LoaderCircle className="spin" /><span>正在按需读取完整精读卡…</span></section>
                  ) : detailError ? (
                    <section className="detail-section detail-error"><AlertTriangle /><p>{detailError}</p><Button variant="outline" onClick={() => openPaper(selectedPaper)}>重试</Button></section>
                  ) : detail ? (
                    <>
                      <section className="detail-section source-note"><FileText /><p>{detail.sourceNote}</p></section>
                      <DetailList title="核心贡献" items={detail.contributions} />
                      {detail.experiments?.length ? <ExperimentList experiments={detail.experiments} /> : <DetailList title="具体实验与关键证据" items={detail.evidence} />}
                      {detail.experiments?.length ? <DetailList title="补充证据" items={detail.evidence} /> : null}
                      <DetailList title="主要局限" items={detail.limitations} />
                      <DetailList title="对当前研究的价值" items={detail.relevance} accent />
                      {detail.media?.length ? <MediaGallery media={detail.media} /> : null}
                      <section className="detail-section"><p className="section-label">建议回看</p><p>{detail.nextReading}</p></section>
                      <section className="detail-section">
                        <p className="section-label">资料链接</p>
                        <div className="paper-links">{detail.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label}<ExternalLink /></a>)}</div>
                      </section>
                    </>
                  ) : null}
                </TabsContent>

                <TabsContent value="qa" className="sheet-scroll qa-panel">
                  {detailLoading ? (
                    <section className="detail-section detail-loading"><LoaderCircle className="spin" /><span>正在读取问答记录…</span></section>
                  ) : detailError ? (
                    <section className="detail-section detail-error"><AlertTriangle /><p>{detailError}</p><Button variant="outline" onClick={() => openPaper(selectedPaper)}>重试</Button></section>
                  ) : detail?.qa?.length ? (
                    <div className="qa-list">{detail.qa.map((item, index) => (
                      <article key={item.id} className="qa-card" id={`${selectedPaper.id}-${item.id}`}>
                        <div className="qa-heading"><span>Q{index + 1}</span>{item.updatedAt && <time>{item.updatedAt}</time>}</div>
                        <h3>{item.question}</h3>
                        <p>{item.answer}</p>
                        {item.relatedQaIds?.length ? <small>关联问答：{item.relatedQaIds.join('、')}</small> : null}
                        {item.sources?.length ? <div className="paper-links">{item.sources.map((link) => <a key={`${item.id}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">{link.label}<ExternalLink /></a>)}</div> : null}
                      </article>
                    ))}</div>
                  ) : (
                    <section className="qa-empty">
                      <MessageCircle />
                      <h3>还没有问答记录</h3>
                      <p>以后针对这篇论文继续提问时，维护 Agent 会先查找旧问题：相同问题直接引用旧回答；有新证据时补充原回答，并把可复用结论同步回完整知识卡。</p>
                    </section>
                  )}
                </TabsContent>

                {detail?.humanSummary?.length ? (
                  <TabsContent value="human-summary" className="sheet-scroll human-summary-panel">
                    <section className="human-summary-card">
                      <div className="human-summary-heading">
                        <p className="section-label">研究者判断</p>
                        <Badge variant="outline">人为总结 · 非论文原文</Badge>
                      </div>
                      <ul>{detail.humanSummary.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                  </TabsContent>
                ) : null}
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
}

function DetailList({ title, items, accent = false }: { title: string; items: string[]; accent?: boolean }) {
  return (
    <section className={`detail-section ${accent ? 'accent-section' : ''}`}>
      <p className="section-label">{title}</p>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

function ExperimentList({ experiments }: { experiments: NonNullable<PaperDetail['experiments']> }) {
  return (
    <section className="detail-section">
      <p className="section-label"><span>具体实验</span><FlaskConical /></p>
      <div className="experiment-list">{experiments.map((experiment) => (
        <article key={experiment.title} className="experiment-card">
          <h3>{experiment.title}</h3>
          <dl>
            <div><dt>设置</dt><dd>{experiment.setup}</dd></div>
            <div><dt>结果</dt><dd>{experiment.result}</dd></div>
            {experiment.takeaway && <div><dt>结论</dt><dd>{experiment.takeaway}</dd></div>}
            {experiment.source && <div><dt>位置</dt><dd>{experiment.source}</dd></div>}
          </dl>
        </article>
      ))}</div>
    </section>
  );
}

function MediaGallery({ media }: { media: NonNullable<PaperDetail['media']> }) {
  const roleLabels = { architecture: '模型架构', experiment: '实验图', demo: '演示' } as const;
  return (
    <section className="detail-section">
      <p className="section-label">图片、视频与模型架构</p>
      <div className="paper-media-grid">{media.map((item) => (
        <figure key={`${item.type}-${item.url}`} className="paper-media-card">
          <Badge variant="outline">{roleLabels[item.role]}</Badge>
          {item.type === 'image' ? (
            <a href={item.sourceUrl ?? item.url} target="_blank" rel="noreferrer"><img src={item.url} alt={item.alt ?? item.title} loading="lazy" /></a>
          ) : item.direct ? (
            <video controls preload="metadata" poster={item.posterUrl}><source src={item.url} /></video>
          ) : (
            <a className="video-link" href={item.url} target="_blank" rel="noreferrer"><Play />打开作者视频</a>
          )}
          <figcaption><strong>{item.title}</strong><span>{item.caption}</span></figcaption>
        </figure>
      ))}</div>
    </section>
  );
}
