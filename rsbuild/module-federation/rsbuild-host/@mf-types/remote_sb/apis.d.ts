
    export type RemoteKeys = 'remote_sb/Title';
    type PackageType<T> = T extends 'remote_sb/Title' ? typeof import('remote_sb/Title') :any;