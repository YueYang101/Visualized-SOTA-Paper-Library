import type { CategoryId, PaperDetail, PaperIndex } from './types';

const categoryLoaders: Record<CategoryId, () => Promise<PaperIndex[]>> = {
  'robust-grasp': () => import('./categories/robust-grasp').then((module) => module.papers),
  'shared-control': () => import('./categories/shared-control').then((module) => module.papers),
  'retarget-teleop': () => import('./categories/retarget-teleop').then((module) => module.papers),
};

const detailLoaders: Record<string, () => Promise<PaperDetail>> = {
  'robustdexgrasp-2504-05287': () =>
    import('./details/robustdexgrasp-2504-05287').then((module) => module.detail),
  'dex-vla-shared-autonomy-2511-00139': () =>
    import('./details/dex-vla-shared-autonomy-2511-00139').then((module) => module.detail),
  'anyteleop-2307-04577': () =>
    import('./details/anyteleop-2307-04577').then((module) => module.detail),
  'clutterdexgrasp-2506-14317': () =>
    import('./details/clutterdexgrasp-2506-14317').then((module) => module.detail),
  'shear-grasp-control-2503-17501': () =>
    import('./details/shear-grasp-control-2503-17501').then((module) => module.detail),
  'tacdexgrasp-2603-07040': () =>
    import('./details/tacdexgrasp-2603-07040').then((module) => module.detail),
  'shared-bionic-hand-10-1038-s41467-025-65965-9': () =>
    import('./details/shared-bionic-hand-10-1038-s41467-025-65965-9').then((module) => module.detail),
  '10-15607-rss-2023-xix-014': () =>
    import('./details/10-15607-rss-2023-xix-014').then((module) => module.detail),
  '10-52202-079017-4075': () =>
    import('./details/10-52202-079017-4075').then((module) => module.detail),
  'flashback-pmlr-v305-sun25a': () =>
    import('./details/flashback-pmlr-v305-sun25a').then((module) => module.detail),
  'vosa-2501-08389': () =>
    import('./details/vosa-2501-08389').then((module) => module.detail),
  'anydexrt-2607-08341': () =>
    import('./details/anydexrt-2607-08341').then((module) => module.detail),
  'teledexter-2607-11481': () =>
    import('./details/teledexter-2607-11481').then((module) => module.detail),
  'dexumi-2505-21864': () =>
    import('./details/dexumi-2505-21864').then((module) => module.detail),
  'bunny-visionpro-2407-03162': () =>
    import('./details/bunny-visionpro-2407-03162').then((module) => module.detail),
};

export function loadCategory(id: CategoryId) {
  return categoryLoaders[id]();
}

export async function loadPaperDetail(id: string) {
  const loader = detailLoaders[id];
  if (!loader) throw new Error('这篇论文还没有详情分片。');
  return loader();
}
