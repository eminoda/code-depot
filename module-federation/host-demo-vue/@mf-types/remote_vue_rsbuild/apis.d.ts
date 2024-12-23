
    export type RemoteKeys = 'remote_vue_rsbuild/Button';
    type PackageType<T> = T extends 'remote_vue_rsbuild/Button' ? typeof import('remote_vue_rsbuild/Button') :any;