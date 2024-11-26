
    export type RemoteKeys = 'remote_two/App';
    type PackageType<T> = T extends 'remote_two/App' ? typeof import('remote_two/App') :any;