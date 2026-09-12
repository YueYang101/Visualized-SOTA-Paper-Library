import { graspTopicIds, type GraspTopicId, type PaperIndex } from './types';

export const graspMapSize = { width: 1200, height: 1050 };
export const graspCircles: { id: GraspTopicId; x: number; y: number; r: number; labelX: number; labelY: number }[] = [
  { id: 'cross-embodiment', x: 420, y: 350, r: 340, labelX: 290, labelY: 100 },
  { id: 'robust', x: 780, y: 350, r: 340, labelX: 910, labelY: 100 },
  { id: 'task-understanding', x: 600, y: 650, r: 340, labelX: 600, labelY: 920 },
];

export function graspMembershipAt(x: number, y: number): GraspTopicId[] {
  return graspCircles.filter((circle) => Math.hypot(x - circle.x, y - circle.y) < circle.r).map((circle) => circle.id);
}

const regionAnchors: Record<string, [number, number]> = {
  'cross-embodiment': [280, 330],
  robust: [920, 350],
  'task-understanding': [600, 790],
  'cross-embodiment|robust': [600, 210],
  'cross-embodiment|task-understanding': [385, 585],
  'robust|task-understanding': [815, 585],
  'cross-embodiment|robust|task-understanding': [600, 445],
};

// Fixed geometry keeps positions stable during search/filtering. Each paper
// appears exactly once; the containing circles encode its actual memberships.
export function positionGraspPapers(papers: PaperIndex[]) {
  const positions: Record<string, { x: number; y: number }> = {};
  const occupied: { x: number; y: number }[] = [];
  const groups = new Map<string, PaperIndex[]>();
  for (const paper of papers) {
    const key = graspTopicIds.filter((topic) => paper.graspTopics?.includes(topic)).join('|');
    const group = groups.get(key) ?? [];
    group.push(paper);
    groups.set(key, group);
  }
  for (const [key, group] of groups) {
    const [anchorX, anchorY] = regionAnchors[key] ?? [600, 1020];
    const candidates: { x: number; y: number }[] = [];
    for (let y = 125; y <= 865; y += 10) {
      for (let x = 180; x <= 1020; x += 10) {
        const fits = [[0, 0], [-75, -18], [75, -18], [-75, 18], [75, 18]].every(([dx, dy]) => graspMembershipAt(x + dx, y + dy).join('|') === key);
        if (fits) candidates.push({ x, y });
      }
    }
    candidates.sort((a, b) => Math.hypot(a.x - anchorX, (a.y - anchorY) * .8) - Math.hypot(b.x - anchorX, (b.y - anchorY) * .8));
    for (const paper of group.sort((a, b) => a.id.localeCompare(b.id))) {
      const slot = candidates.find((candidate) => occupied.every((used) => Math.abs(candidate.x - used.x) >= 160 || Math.abs(candidate.y - used.y) >= 40));
      // If the map grows beyond a region's capacity, retain an accessible row
      // below the circles rather than silently overlap or misclassify a paper.
      const point = slot ?? { x: 600, y: 1030 + occupied.filter((used) => used.y >= 1030).length * 48 };
      occupied.push(point);
      positions[paper.id] = { x: point.x / graspMapSize.width * 100, y: point.y / graspMapSize.height * 100 };
    }
  }
  return positions;
}
