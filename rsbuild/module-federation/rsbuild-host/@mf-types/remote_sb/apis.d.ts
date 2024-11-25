
    export type RemoteKeys = 'remote_sb';
    type PackageType<T> = T extends 'remote_sb' ? typeof import('remote_sb') :any;