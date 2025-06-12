
    export type RemoteKeys = 'remote_vue_rsbuild/Button' | 'remote_vue_rsbuild/Table' | 'remote_vue_rsbuild/Modal';
    type PackageType<T> = T extends 'remote_vue_rsbuild/Modal' ? typeof import('remote_vue_rsbuild/Modal') :T extends 'remote_vue_rsbuild/Table' ? typeof import('remote_vue_rsbuild/Table') :T extends 'remote_vue_rsbuild/Button' ? typeof import('remote_vue_rsbuild/Button') :any;