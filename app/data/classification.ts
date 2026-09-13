import {
  categoryIds,
  graspTopicIds,
  sharedControlTopicIds,
  type CategoryId,
  type GraspTopicId,
  type PaperIndex,
  type PaperOverride,
  type SharedControlTopicId,
} from './types';

function migrateCategories(values: readonly string[]): CategoryId[] {
  return [...new Set(values.map((value) => value === 'robust-grasp' || value === 'perception-understanding' ? 'grasping' : value))]
    .filter((value): value is CategoryId => categoryIds.includes(value as CategoryId));
}

function migrateTopics(values: readonly string[]): GraspTopicId[] {
  const mapped = values.flatMap((value): GraspTopicId[] => {
    if (value === 'task-language-conditioned') return ['task-understanding'];
    if (['closed-loop-acquisition', 'post-grasp-stabilization', 'scene-level-grasping'].includes(value)) return ['robust'];
    return graspTopicIds.includes(value as GraspTopicId) ? [value as GraspTopicId] : [];
  });
  // Pose generation is retained as background for robust grasping only when it
  // was the sole old lens; it must not add Robust to every cross-hand generator.
  if (!mapped.length && values.includes('pose-contact-synthesis')) mapped.push('robust');
  return [...new Set(mapped)];
}

function migrateSharedControlTopics(values: readonly string[]): SharedControlTopicId[] {
  return [...new Set(values)]
    .filter((value): value is SharedControlTopicId =>
      sharedControlTopicIds.includes(value as SharedControlTopicId),
    );
}

export function migratePaper(paper: PaperIndex): PaperIndex {
  const oldCategories: readonly string[] = paper.categories;
  const topics = paper.graspTopics ? migrateTopics(paper.graspTopics) : [];
  const sharedTopics = paper.sharedControlTopics
    ? migrateSharedControlTopics(paper.sharedControlTopics)
    : [];
  if (oldCategories.includes('perception-understanding')) topics.push('task-understanding');
  if (oldCategories.includes('shared-control') && !sharedTopics.length) sharedTopics.push('intent-fusion');
  return {
    ...paper,
    categories: migrateCategories(oldCategories),
    graspTopics: topics.length ? [...new Set(topics)] : undefined,
    sharedControlTopics: sharedTopics.length ? [...new Set(sharedTopics)] : undefined,
  };
}

export function migrateOverrides(records: Record<string, PaperOverride>): Record<string, PaperOverride> {
  return Object.fromEntries(Object.entries(records).filter(([, record]) => record?.original?.id && record.changes && record.updatedAt).map(([id, record]) => {
    const changes = { ...record.changes };
    const oldCategories: readonly string[] | undefined = changes.categories;
    if (oldCategories) changes.categories = migrateCategories(oldCategories);
    if (changes.graspTopics) changes.graspTopics = migrateTopics(changes.graspTopics);
    if (changes.sharedControlTopics) {
      changes.sharedControlTopics = migrateSharedControlTopics(changes.sharedControlTopics);
    }
    if (oldCategories?.includes('perception-understanding')) {
      changes.graspTopics = [...new Set([...(changes.graspTopics ?? migratePaper(record.original).graspTopics ?? []), 'task-understanding' as const])];
    }
    // An empty legacy lens selection is not a new fourth class. Use the current
    // paper's classification while preserving all reading, priority and tag edits.
    if (changes.graspTopics?.length === 0) delete changes.graspTopics;
    if (changes.sharedControlTopics?.length === 0) delete changes.sharedControlTopics;
    if (changes.categories?.includes('shared-control') && !changes.sharedControlTopics?.length) {
      changes.sharedControlTopics = migratePaper(record.original).sharedControlTopics ?? ['intent-fusion'];
    }
    return [id, { ...record, original: migratePaper(record.original), changes }];
  }));
}
