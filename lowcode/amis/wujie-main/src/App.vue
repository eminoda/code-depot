<template>
  <div id="app">
    <!-- <h1>我是主项目</h1> -->
    <h2>我是主项目</h2>
    <div id="wujie-container"></div>
  </div>
</template>

<script>
import { startApp } from "wujie";

// function proxyAddEventListenerFactory(windowObj) {
//   const rawAddEventListener = windowObj.addEventListener

//   function proxyAddEventListener(
//     type,
//     rawListener,
//     options,
//   ) {
//     const listener = (e) => {
//       const target = e.target

//       console.log(target)
//       const realTarget = (target.shadowRoot && e.composed) ? (e.composedPath()[0] || target) : target
//       // 因为 e.target 是只读属性，只能构造一个新的对象代替 Event 对象
//       const event = {}

//       for (let key in e) {
//         event[key] = e[key]
//       }
//       event.target = realTarget  // 将 target 指向正确的节点
//       // 防止后续使用 stopPropagation、preventDefault 报错
//       event.stopPropagation = () => e.stopPropagation()
//       event.preventDefault = () => e.preventDefault()
//       event.rawEvent = e

//       rawListener.call(windowObj, event)
//     }

//     rawAddEventListener(type, listener, options)
//   }

//   return proxyAddEventListener
// }

// 修复 window.event 在 shadow DOM 环境中的问题
function fixWindowEventInShadowDOM(appWindow) {
  // 保存原始的 window.event 属性
  const originalEvent = appWindow.event;

  // 创建一个事件监听器来捕获当前事件
  let currentEvent = null;
  let eventTimeout = null;

  // 监听所有可能的事件类型
  const eventTypes = [
    'mousedown', 'mouseup', 'click', 'dblclick', 'contextmenu',
    'mouseenter', 'mouseleave', 'mouseover', 'mouseout',
    'mousemove', 'wheel', 'scroll', 'focus', 'blur',
    'keydown', 'keyup', 'keypress'
  ];

  // 创建事件捕获函数
  const captureEvent = (e) => {
    // 清除之前的定时器
    if (eventTimeout) {
      clearTimeout(eventTimeout);
    }

    // 保存当前事件
    currentEvent = e;

    // 设置定时器清除事件引用（避免内存泄漏）
    eventTimeout = setTimeout(() => {
      if (currentEvent === e) {
        currentEvent = null;
      }
    }, 200);
  };

  // 为所有事件类型添加监听器
  eventTypes.forEach(type => {
    appWindow.addEventListener(type, captureEvent, true);
  });

  // 重写 window.event 的 getter 和 setter
  try {
    Object.defineProperty(appWindow, 'event', {
      get() {
        return currentEvent || originalEvent;
      },
      set(value) {
        console.log('set event', value)
        currentEvent = value;
      },
      configurable: true,
      enumerable: true
    });
  } catch (error) {
    console.warn('[wujie] 无法重写 window.event，可能是不可配置的:', error);
  }

  // 为了兼容第三方库，也尝试直接赋值
  appWindow.event = currentEvent;

  console.log('[wujie] window.event 修复已应用，支持事件类型:', eventTypes);
}

// console.log(proxyAddEventListenerFactory)

export default {
  name: "App",
  mounted() {
    startApp({
      name: "wujie-amis",
      // url: "http://localhost:8081",
      // url: "http://127.0.0.1:8888/examples/crud/table?orderBy=id&orderDir=asc&page=1",
      url: "http://127.0.0.1:3000",
      el: document.getElementById("wujie-container"),
      fetch: (url) => {
        if (url.indexOf('.css')) {
          return fetch(url, {
            headers: {
              'Accept': 'text/css,*/*;q=0.1'
            }
          })
        }
        return fetch(url)
      },
      exec: true,
      plugins: [
        {
          windowPropertyOverride: (iframeWindow) => {
            iframeWindow.hello = 123
            // 应用 window.event 修复
            fixWindowEventInShadowDOM(iframeWindow);
          }
        }
      ]
    });
  },
};
</script>

<style></style>
