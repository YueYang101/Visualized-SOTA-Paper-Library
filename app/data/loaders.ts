import type { CategoryId, PaperDetail, PaperIndex } from './types';

const categoryLoaders: Record<CategoryId, () => Promise<PaperIndex[]>> = {
  grasping: () => import('./categories/grasping').then((module) => module.papers),
  'shared-control': () =>
    import('./categories/shared-control').then((module) => module.papers),
  'retarget-teleop': () =>
    import('./categories/retarget-teleop').then((module) => module.papers),
  'online-learning': () =>
    import('./categories/online-learning').then((module) => module.papers),
};

const detailLoaders: Record<string, () => Promise<PaperDetail>> = {
  'online-human-constraints-2403-02974': () =>
    import('./details/online-human-constraints-2403-02974').then((module) => module.detail),
  'lilac-2301-02555': () =>
    import('./details/lilac-2301-02555').then((module) => module.detail),
  'hierarchical-intention-2403-19770': () =>
    import('./details/hierarchical-intention-2403-19770').then((module) => module.detail),
  'human-intent-action-review-2024': () =>
    import('./details/human-intent-action-review-2024').then((module) => module.detail),
  'act2goal-rss-2026': () =>
    import('./details/act2goal-rss-2026').then((module) => module.detail),
  'just-right-reachability-rss-2026': () =>
    import('./details/just-right-reachability-rss-2026').then((module) => module.detail),
  'online-admittance-residual-2310-10509': () =>
    import('./details/online-admittance-residual-2310-10509').then((module) => module.detail),
  'shapegrasp-2403-18062': () =>
    import('./details/shapegrasp-2403-18062').then((module) => module.detail),
  'thinkgrasp-2407-11298': () =>
    import('./details/thinkgrasp-2407-11298').then((module) => module.detail),
  'graspgpt-2307-13204': () =>
    import('./details/graspgpt-2307-13204').then((module) => module.detail),
  'partdextog-2505-12294': () =>
    import('./details/partdextog-2505-12294').then((module) => module.detail),
  'vlm-intent-assistance-2508-11093': () =>
    import('./details/vlm-intent-assistance-2508-11093').then(
      (module) => module.detail,
    ),
  'dexter-2601-16046': () =>
    import('./details/dexter-2601-16046').then((module) => module.detail),
  'grasp-to-act-2602-20466': () =>
    import('./details/grasp-to-act-2602-20466').then((module) => module.detail),
  'robustdexgrasp-2504-05287': () =>
    import('./details/robustdexgrasp-2504-05287').then(
      (module) => module.detail,
    ),
  'dex-vla-shared-autonomy-2511-00139': () =>
    import('./details/dex-vla-shared-autonomy-2511-00139').then(
      (module) => module.detail,
    ),
  'anyteleop-2307-04577': () =>
    import('./details/anyteleop-2307-04577').then((module) => module.detail),
  'clutterdexgrasp-2506-14317': () =>
    import('./details/clutterdexgrasp-2506-14317').then(
      (module) => module.detail,
    ),
  'shear-grasp-control-2503-17501': () =>
    import('./details/shear-grasp-control-2503-17501').then(
      (module) => module.detail,
    ),
  'tacdexgrasp-2603-07040': () =>
    import('./details/tacdexgrasp-2603-07040').then((module) => module.detail),
  'shared-bionic-hand-10-1038-s41467-025-65965-9': () =>
    import('./details/shared-bionic-hand-10-1038-s41467-025-65965-9').then(
      (module) => module.detail,
    ),
  '10-15607-rss-2023-xix-014': () =>
    import('./details/10-15607-rss-2023-xix-014').then(
      (module) => module.detail,
    ),
  '10-52202-079017-4075': () =>
    import('./details/10-52202-079017-4075').then((module) => module.detail),
  'flashback-pmlr-v305-sun25a': () =>
    import('./details/flashback-pmlr-v305-sun25a').then(
      (module) => module.detail,
    ),
  'vosa-2501-08389': () =>
    import('./details/vosa-2501-08389').then((module) => module.detail),
  'anydexrt-2607-08341': () =>
    import('./details/anydexrt-2607-08341').then((module) => module.detail),
  'teledexter-2607-11481': () =>
    import('./details/teledexter-2607-11481').then((module) => module.detail),
  'dexumi-2505-21864': () =>
    import('./details/dexumi-2505-21864').then((module) => module.detail),
  'bunny-visionpro-2407-03162': () =>
    import('./details/bunny-visionpro-2407-03162').then(
      (module) => module.detail,
    ),
  'dexgraspnet-2210-02697': () =>
    import('./details/dexgraspnet-2210-02697').then((module) => module.detail),
  'unidexgrasp-plusplus-2304-00464': () =>
    import('./details/unidexgrasp-plusplus-2304-00464').then(
      (module) => module.detail,
    ),
  'gendexgrasp-2210-00722': () =>
    import('./details/gendexgrasp-2210-00722').then((module) => module.detail),
  'dro-grasp-2410-01702': () =>
    import('./details/dro-grasp-2410-01702').then((module) => module.detail),
  'crossdex-2410-02479': () =>
    import('./details/crossdex-2410-02479').then((module) => module.detail),
  'anydexgrasp-2502-16420': () =>
    import('./details/anydexgrasp-2502-16420').then((module) => module.detail),
  'graspxl-2403-19649': () =>
    import('./details/graspxl-2403-19649').then((module) => module.detail),
  'dexgrasp-zero-2603-16806': () =>
    import('./details/dexgrasp-zero-2603-16806').then(
      (module) => module.detail,
    ),
  'dexgraspnet2-2410-23004': () =>
    import('./details/dexgraspnet2-2410-23004').then((module) => module.detail),
  'motion-prior-field-grasp-prediction-2023': () =>
    import('./details/motion-prior-field-grasp-prediction-2023').then(
      (module) => module.detail,
    ),
  'gaze-guided-hand-motion-prediction-2504-01024': () =>
    import('./details/gaze-guided-hand-motion-prediction-2504-01024').then(
      (module) => module.detail,
    ),
  'naturalistic-exoskeleton-grasp-prediction-2019': () =>
    import('./details/naturalistic-exoskeleton-grasp-prediction-2019').then(
      (module) => module.detail,
    ),
};

export function loadCategory(id: CategoryId) {
  return categoryLoaders[id]();
}

export async function loadPaperDetail(id: string) {
  const loader = detailLoaders[id];
  if (!loader) throw new Error('这篇论文还没有详情分片。');
  return loader();
}
