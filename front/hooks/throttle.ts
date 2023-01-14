/*
    두 번째 인자로 timeout을 지정해 주는 경우 setTimout으로 Throttle을 사용하고
    없을 경우 requestAnimationFrame로 구현해 부드러운 애니메이션을 표현할 수 있게 한다.
*/

const throttle = (handler: (...args: any[]) => void, timeout = 2000) => {
  let invokedTime: number;
  let timer: number;

  if (!timeout) {
    return function (this: any, ...args: any[]) {
      window.requestAnimationFrame(() => {
        handler.apply(this, args);
      });
    };
  } else {
    return function (this: any, ...args: any[]) {
      if (!invokedTime) {
        handler.apply(this, args);
        invokedTime = Date.now();
      } else {
        clearTimeout(timer);
        timer = window.setTimeout(() => {
          if (Date.now() - invokedTime >= timeout) {
            handler.apply(this, args);
            invokedTime = Date.now();
          }
        }, Math.max(timeout - (Date.now() - invokedTime), 0));
      }
    };
  }
};

export default throttle;
