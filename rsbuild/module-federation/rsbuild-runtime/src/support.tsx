export const FallbackErrorComp = (info: any) => {
  // return (
  //   <div>
  //     <h2>This is ErrorBoundary Component</h2>
  //     <p>Something went wrong:</p>
  //     <pre style={{ color: "red" }}>{info?.error.message}</pre>
  //     <button onClick={() => info.resetErrorBoundary()}>resetErrorBoundary(try again)</button>
  //   </div>
  // );
  return info?.error.message;
};
{/* <div data-test-id="loading">loading...</div> */}
export const FallbackComp = ()=>'loading';
