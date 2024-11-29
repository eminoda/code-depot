
    export type RemoteKeys = 'remote_one/App';
    type PackageType<T> = T extends 'remote_one/App' ? typeof import('remote_one/App') :any;