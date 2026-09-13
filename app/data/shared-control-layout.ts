import {
  sharedControlTopicIds,
  type PaperIndex,
  type SharedControlTopicId,
} from './types';

export const sharedControlMapSize = { width: 1200, height: 800 };
export const sharedControlCircles: {
  id: SharedControlTopicId;
  x: number;
  y: number;
  r: number;
  labelX: number;
  labelY: number;
}[] = [
  { id: 'intent-fusion', x: 440, y: 400, r: 340, labelX: 315, labelY: 105 },
  { id: 'human-model', x: 760, y: 400, r: 340, labelX: 885, labelY: 105 },
];

export function sharedControlMembershipAt(x: number, y: number): SharedControlTopicId[] {
  return sharedControlCircles
    .filter((circle) => Math.hypot(x - circle.x, y - circle.y) < circle.r)
    .map((circle) => circle.id);
}

const regionAnchors: Record<string, [number, number]> = {
  'intent-fusion': [280, 430],
  'human-model': [920, 430],
  'intent-fusion|human-model': [600, 430],
};

export function positionSharedControlPapers(papers: PaperIndex[]) {
  const positions: Record<string, { x: number; y: number }> = {};
  const occupied: { x: number; y: number }[] = [];
  const groups = new Map<string, PaperIndex[]>();
  for (const paper of papers) {
    const key = sharedControlTopicIds
      .filter((topic) => paper.sharedControlTopics?.includes(topic))
      .join('|');
    const group = groups.get(key) ?? [];
    group.push(paper);
    groups.set(key, group);
  }

  for (const [key, group] of groups) {
    const [anchorX, anchorY] = regionAnchors[key] ?? [600, 780];
    const candidates: { x: number; y: number }[] = [];
    for (let y = 145; y <= 680; y += 10) {
      for (let x = 150; x <= 1050; x += 10) {
        const fits = [[0, 0], [-105, -28], [105, -28], [-105, 28], [105, 28]].every(
          ([dx, dy]) => sharedControlMembershipAt(x + dx, y + dy).join('|') === key,
        );
        if (fits) candidates.push({ x, y });
      }
    }
    candidates.sort(
      (a, b) =>
        Math.hypot(a.x - anchorX, (a.y - anchorY) * 0.8) -
        Math.hypot(b.x - anchorX, (b.y - anchorY) * 0.8),
    );
    for (const paper of group.sort((a, b) => a.id.localeCompare(b.id))) {
      const slot = candidates.find((candidate) =>
        occupied.every(
          (used) =>
            Math.abs(candidate.x - used.x) >= 215 ||
            Math.abs(candidate.y - used.y) >= 62,
        ),
      );
      const point = slot ?? {
        x: 600,
        y: 780 + occupied.filter((used) => used.y >= 780).length * 48,
      };
      occupied.push(point);
      positions[paper.id] = {
        x: (point.x / sharedControlMapSize.width) * 100,
        y: (point.y / sharedControlMapSize.height) * 100,
      };
    }
  }
  return positions;
}
