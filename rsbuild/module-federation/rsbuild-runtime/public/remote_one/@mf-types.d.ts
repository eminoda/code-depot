
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/App';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/App' ? typeof import('REMOTE_ALIAS_IDENTIFIER/App') :any;