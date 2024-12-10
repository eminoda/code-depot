
    export type RemoteKeys = 'remote_one/R1Button' | 'remote_one/R1Modal';
    type PackageType<T> = T extends 'remote_one/R1Modal' ? typeof import('remote_one/R1Modal') :T extends 'remote_one/R1Button' ? typeof import('remote_one/R1Button') :any;