import { init, loadRemote } from "@module-federation/enhanced/runtime";
import React, { forwardRef } from "react";

class Runtime {
  constructor(options: RuntimeOptions) {
    init(options);
  }
  loadRemoteComponent(componentName: string) {
    const createLazyComponent = () => {
      return React.lazy(async () => {
        const LazyComponent = React.lazy(() => loadRemote<any>(componentName));
        return {
          default: forwardRef((props, ref) => {
            console.log("forwardRef", props);
            return <LazyComponent {...props} />;
          }),
        };
      });
    };
    return forwardRef((props, ref) => {
      console.log(componentName, props);
      const LazyComponent = createLazyComponent();
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <LazyComponent {...props} ref={ref} />
        </React.Suspense>
      );
    });
  }
}
export default Runtime;
