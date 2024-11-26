
    export type RemoteKeys = 'remote_storybook';
    type PackageType<T> = T extends 'remote_storybook' ? typeof import('remote_storybook') :any;