
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER' ? typeof import('REMOTE_ALIAS_IDENTIFIER') :any;