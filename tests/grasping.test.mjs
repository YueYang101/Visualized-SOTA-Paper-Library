import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { Script } from 'node:vm';
import ts from 'typescript';

const cache = new Map();
function loadTs(file) {
  const resolved = path.resolve(file);
  if (cache.has(resolved)) return cache.get(resolved);
  const compiled = { exports: {} };
  const { outputText } = ts.transpileModule(fs.readFileSync(resolved, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  new Script(`(function(exports, require, module) { ${outputText} })`).runInThisContext()(compiled.exports, (name) => loadTs(path.resolve(path.dirname(resolved), `${name}.ts`)), compiled);
  cache.set(resolved, compiled.exports);
  return compiled.exports;
}

const { papers } = loadTs('app/data/categories/grasping.ts');
const { papers: sharedControlPapers } = loadTs('app/data/categories/shared-control.ts');
const { papers: onlineLearningPapers } = loadTs('app/data/categories/online-learning.ts');
const { graspTopicIds, sharedControlTopicIds, categoryIds } = loadTs('app/data/types.ts');
const { categoryManifest } = loadTs('app/data/manifest.ts');
const { graspCircles, graspMapSize, positionGraspPapers, graspMembershipAt } = loadTs('app/data/grasp-layout.ts');
const { migrateOverrides } = loadTs('app/data/classification.ts');
const { sharedControlCircles, sharedControlMapSize, positionSharedControlPapers, sharedControlMembershipAt } = loadTs('app/data/shared-control-layout.ts');

test('Grasping contains all 21 papers and exactly the three user-selected classes', () => {
  assert.deepEqual(categoryIds, ['grasping', 'shared-control', 'retarget-teleop', 'online-learning']);
  assert.deepEqual(graspTopicIds, ['cross-embodiment', 'robust', 'task-understanding']);
  assert.equal(papers.length, 21);
  assert.equal(new Set(papers.map((paper) => paper.id)).size, 21);
  for (const paper of papers) {
    assert.ok(paper.graspTopics.length > 0);
    assert.ok(paper.graspTopics.every((topic) => graspTopicIds.includes(topic)));
  }
  for (const id of ['shapegrasp-2403-18062', 'thinkgrasp-2407-11298', 'graspgpt-2307-13204', 'partdextog-2505-12294', 'vlm-intent-assistance-2508-11093']) {
    assert.deepEqual(papers.find((paper) => paper.id === id).graspTopics, ['task-understanding']);
  }
});

test('map counts and cross-index memberships agree, preserving all 42 unique papers', () => {
  const unique = new Map();
  for (const category of categoryManifest) {
    const index = loadTs(`app/data/categories/${category.id}.ts`).papers;
    assert.equal(index.length, category.count);
    for (const paper of index) {
      assert.ok(paper.categories.includes(category.id));
      assert.ok(paper.categories.every((id) => categoryIds.includes(id)));
      if (unique.has(paper.id)) {
        assert.deepEqual(paper.categories, unique.get(paper.id).categories);
        assert.deepEqual(paper.graspTopics, unique.get(paper.id).graspTopics);
        assert.deepEqual(paper.sharedControlTopics, unique.get(paper.id).sharedControlTopics);
      }
      unique.set(paper.id, paper);
    }
  }
  assert.equal(unique.size, 42);
});

test('Share Control contains exactly the two user-selected classes and all 17 papers', () => {
  assert.deepEqual(sharedControlTopicIds, ['intent-fusion', 'human-model']);
  assert.equal(sharedControlPapers.length, 17);
  for (const paper of sharedControlPapers) {
    assert.ok(paper.sharedControlTopics.length > 0);
    assert.ok(paper.sharedControlTopics.every((topic) => sharedControlTopicIds.includes(topic)));
  }
  for (const id of [
    'motion-prior-field-grasp-prediction-2023',
    'gaze-guided-hand-motion-prediction-2504-01024',
    'naturalistic-exoskeleton-grasp-prediction-2019',
  ]) {
    assert.deepEqual(sharedControlPapers.find((paper) => paper.id === id).sharedControlTopics, ['human-model']);
  }
  assert.equal(sharedControlPapers.find((paper) => paper.id === 'motion-prior-field-grasp-prediction-2023').priority, 'high');
  assert.equal(sharedControlPapers.find((paper) => paper.id === 'gaze-guided-hand-motion-prediction-2504-01024').priority, 'medium');
  assert.equal(sharedControlPapers.find((paper) => paper.id === 'naturalistic-exoskeleton-grasp-prediction-2019').priority, 'high');
});

test('Online Learning only contains methods that update a model or controller during interaction', () => {
  assert.equal(onlineLearningPapers.length, 4);
  assert.deepEqual(
    onlineLearningPapers.map((paper) => paper.id).sort(),
    [
      'act2goal-rss-2026',
      'just-right-reachability-rss-2026',
      'online-admittance-residual-2310-10509',
      'online-human-constraints-2403-02974',
    ],
  );
  for (const paper of onlineLearningPapers) {
    assert.ok(paper.categories.includes('online-learning'));
  }
});

test('every Share Control paper and label fit its assigned circle without overlap', () => {
  assert.equal(sharedControlCircles.length, 2);
  const positions = positionSharedControlPapers(sharedControlPapers);
  const boxes = [];
  for (const paper of sharedControlPapers) {
    const { x: pctX, y: pctY } = positions[paper.id];
    const x = pctX / 100 * sharedControlMapSize.width;
    const y = pctY / 100 * sharedControlMapSize.height;
    assert.ok(y < 930, `${paper.shortTitle} must stay in the two-circle map`);
    const expected = sharedControlTopicIds.filter((topic) => paper.sharedControlTopics.includes(topic));
    for (const [dx, dy] of [[0, 0], [-105, -28], [105, -28], [-105, 28], [105, 28]]) {
      assert.deepEqual(sharedControlMembershipAt(x + dx, y + dy), expected, paper.shortTitle);
    }
    for (const previous of boxes) {
      assert.ok(Math.abs(previous.x - x) >= 210 || Math.abs(previous.y - y) >= 58, `${previous.id} overlaps ${paper.id}`);
    }
    boxes.push({ x, y, id: paper.id });
  }
  assert.deepEqual(positionSharedControlPapers([...sharedControlPapers].reverse()), positions);
});

test('every paper and its label fit the right circles, without overlapping labels', () => {
  assert.equal(graspCircles.length, 3);
  const positions = positionGraspPapers(papers);
  const boxes = [];
  for (const paper of papers) {
    const { x: pctX, y: pctY } = positions[paper.id];
    const x = pctX / 100 * graspMapSize.width;
    const y = pctY / 100 * graspMapSize.height;
    assert.ok(y < 900, `${paper.shortTitle} must stay in the three-circle map`);
    const expected = graspTopicIds.filter((topic) => paper.graspTopics.includes(topic));
    for (const [dx, dy] of [[0, 0], [-75, -18], [75, -18], [-75, 18], [75, 18]]) {
      assert.deepEqual(graspMembershipAt(x + dx, y + dy), expected, paper.shortTitle);
    }
    for (const previous of boxes) {
      assert.ok(Math.abs(previous.x - x) >= 150 || Math.abs(previous.y - y) >= 36, `${previous.id} overlaps ${paper.id}`);
    }
    boxes.push({ x, y, id: paper.id });
  }
  // Input order cannot move a paper to a different region or hide it.
  assert.deepEqual(positionGraspPapers([...papers].reverse()), positions);
});

test('old perception overrides migrate while preserving personal reading state and tags', () => {
  const original = { ...papers.find((paper) => paper.id === 'shapegrasp-2403-18062'), categories: ['perception-understanding'], graspTopics: undefined };
  const input = { [original.id]: { original, changes: { categories: ['perception-understanding', 'shared-control'], priority: 'low', deepRead: { completed: true, needed: false }, tags: ['我的标注'] }, updatedAt: '2026-09-12' } };
  const snapshot = JSON.stringify(input);
  const migrated = migrateOverrides(input)[original.id];
  assert.deepEqual(migrated.original.categories, ['grasping']);
  assert.deepEqual(migrated.changes.categories, ['grasping', 'shared-control']);
  assert.deepEqual(migrated.changes.graspTopics, ['task-understanding']);
  assert.deepEqual(migrated.changes.deepRead, { completed: true, needed: false });
  assert.deepEqual(migrated.changes.tags, ['我的标注']);
  assert.equal(migrated.changes.priority, 'low');
  assert.equal(JSON.stringify(input), snapshot);
  assert.deepEqual(migrateOverrides({ [original.id]: migrated })[original.id], migrated);
});

test('old six-lens edits collapse to the allowed three without losing independent edits', () => {
  const original = { ...papers[0], categories: ['robust-grasp'], graspTopics: ['closed-loop-acquisition', 'post-grasp-stabilization'] };
  const changes = { graspTopics: ['pose-contact-synthesis', 'cross-embodiment', 'task-language-conditioned', 'scene-level-grasping'], tags: ['保留'] };
  const migrated = migrateOverrides({ x: { original, changes, updatedAt: '2026-09-12' } }).x;
  assert.deepEqual(migrated.original.graspTopics, ['robust']);
  assert.deepEqual(migrated.changes.graspTopics, ['cross-embodiment', 'task-understanding', 'robust']);
  assert.deepEqual(migrated.changes.tags, ['保留']);
});
