
    export type RemoteKeys = 'remote_storybook/Button';
    type PackageType<T> = T extends 'remote_storybook/Button' ? typeof import('remote_storybook/Button') :any;