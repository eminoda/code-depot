
    export type RemoteKeys = 'remote_three/App';
    type PackageType<T> = T extends 'remote_three/App' ? typeof import('remote_three/App') :any;