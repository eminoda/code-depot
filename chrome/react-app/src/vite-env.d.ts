/// <reference types="vite/client" />
enum ActionType {
  CLICK = "click",
  URL = "url",
}

enum StatusType {
  LOADING = "loading",
  COMPLETE = "complete",
}

type Action = {
  type: ActionType;
  status?: StatusType;
  target: string;
};
