## 잡담:

기존 Js코드에서 타입 시스템이라는 강력한 기능을 더한 것이 타입스크립트입니다.

대규모일 수록 애플리케이션을 개발하고 유지보수하는 데 더욱 중요한 안정성과 효율성을 챙길 수 있어 필수적인 도구라고 볼 수 있습니다.

저도 최근 팀 프로젝트를 진행하며 타입스크립트를 도입했는데, 이때 느낀 것은 기존 자바스크립트의 유연성에서 `안정성` 과 `유지보수성` 을 더해주는 강력한 툴이라고 생각했습니다.
이를 통해 오류를 줄이고, 복잡한 시스템을 효율적으로 개발/유지보수 할 수 있는 현재 개발 매커니즘에서는 핵심적인 기술이라고 느꼈습니다.

---

## 주제:

\*\*1. unknown & 타입 단언(as) 정복하기 2. 제네릭 타입 사용 방법 및 방식 알아보기 3. enum을 피해야하는 이유와 이에 대한 대안(타입 유니언)

---

## 서론:

타입스크립트를 저처럼 많이 사용해보지 않았거나, 어느정도 사용해봤으나 항상 썼던 개념으로만 접근하고 헷갈리는 개념들이 있으신 분들은 오늘 글을 참고하여 도움이 되셨으면 좋겠습니다.

아래 테스트 코드는 typescript 공식 - playground (v5.8.3) 환경에서 진행하였습니다.

---

## 1. unknown 타입과 타입 단언

### unknown 타입이 뭘까요?

> `unknown` 타입은 ts에서 "어떤 값이든 받을 수 있지만, `사용하기 전 반드시 타입을 확인해야하는` 엄격한 타입입니다.

예시 코드를 보며 설명드리겠습니다.

```ts
let anyType: any = "hello world";
let unknownType: unknown = "hello world";

// any타입은 별다른 제약없이 사용 가능
console.log(anyType.toUpperCase());

// unknown타입은 바로 사용이 안된다.
console.log(unknownType.toUpperCase());
```

이때 unknownType 출력 시 에러가 발생합니다.

```
'unknownType' is of type 'unknown'.
```

이렇게 바로 사용이 불가하다면? 어떻게 안전하게 unknown 타입을 사용할 수 있을까요?

<br>

그건 바로 `타입 가드(Type Guard)` 를 통해 안전하게 사용할 수 있습니다.

```ts
// 다양한 타입의 Value를 받아 각 타입에 맞는 작업 타스크 수행
const safeValue = (value: unknown) => {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  }

  if (value instanceof Date) {
    console.log(value.getFullYear());
  }

  if (typeof value === "object" && value !== null && "name" in value) {
    console.log((value as { name: string }).name);
  }
};

safeValue("hello world"); // "HELLO WORLD"
safeValue(new Date()); // 2025
safeValue({ name: "Hyun" }); // "Hyun"
safeValue({ name: "guardner", age: 28 }); // "guardner"
```

<br>

### 그럼 이어서 타입단언(as)에 대해 알아보겠습니다.

타입 단언은 개발자가 typescript에게 `이 값의 타입은 내가 더 잘안다. 내가 단언한다. 이렇게 알려주는 것`입니다.

그러면 예제를 한번 보시죠.

```ts
const apiResponse: unknown = {
  id: 1,
  name: "Hyun1",
  email: "hyun98@test.com",
};

// 타입 단언 사용
interface User {
  id: number;
  name: string;
  email: string;
}

const user = apiResponse as User;
console.log(user.name); // 이제 안전하게 사용 가능
```

위 코드에서 as User를 통해 단언한 것을 볼 수 있습니다.

중요한건 타입 단언은 실제 런타임 환경에서는 영향을 주지 않습니다. 아래 컴파일된 js코드를 보시죠.

```js
"use strict";
const apiResponse = {
  id: 1,
  name: "Hyun1",
  email: "hyun98@test.com",
};
const user = apiResponse;
console.log(user.name); // 이제 안전하게 사용 가능
```

즉, 타입 단언(Type Assertion)은 `나는 a가 b인터페이스의 형태를 가질 것이라고 확신해. 그니까 b타입 처럼 다뤄줘.` 라고 타입스크립트 컴파일러에게 지시하는 것이며,

실제 컴파일된 js 코드를 보시면, as 부분이 완전히 사라진 것을 확인할 수 있습니다.

즉, 위 코드의 `apiResponse as User` 라는 타입 단언은 js 런타임에는 아무런 역할을 하지 않습니다.
이말은 곧 타입스크립트는 개발자가 코드를 작성하는 동안 타입 관련 오류를 미리 방지하고, 코드의 예측 가능성을 높여주는 툴이라고 볼 수 있습니다.
그러기에 `컴파일 시점의 유효성 검사를 하지만, 런타임 성능에는 영향을 주지 않는다.` 라고 볼 수있습니다.

---

## 2. 제네릭 타입 사용 방법 및 방식

### 제네릭(Generic) 이란?

제네릭은 `타입을 변수처럼 사용할 수 있게 해주는 기능` 입니다. 코드의 재사용성을 높이면서도 타입 안정성을 보장합니다. 아래 코드를 보시죠.

```ts
// 제네릭 미사용
const getFirtsString = (arr: string[]): string => {
  return arr[0];
};

// 제네릭 사용
const getFirst = <T extends unknown>(arr: T[]): T => {
  return arr[0];
};

// 사용 예시
const firstString = getFirst<string>(["a", "b", "c"]); // string 타입
const firstBoolean = getFirst([true, false]); // 타입 추론으로 boolean
const firstNumber = getFirst([3, 2]);

console.log(firstString); // "a"
console.log(firstBoolean); // true
console.log(firstNumber); // 3
```

위 코드에서 함수에 `<T>` 이렇게, `():T` 이런식으로 제네릭 타입을 동적으로 변경이 가능합니다.(받는 값에 따라)

그러면 js코드로 컴파일되는 시점에서는 어떻게 나올까도 한번 보시죠.

```js
"use strict";
// 제네릭 미사용
const getFirtsString = (arr) => {
  return arr[0];
};
// 제네릭 사용
const getFirst = (arr) => {
  return arr[0];
};
// 사용 예시
const firstString = getFirst(["a", "b", "c"]); // string 타입
const firstBoolean = getFirst([true, false]); // 타입 추론으로 boolean
const firstNumber = getFirst([3, 2]);
console.log(firstString);
console.log(firstBoolean);
console.log(firstNumber);
```

컴파일된 코드에서는 제네릭을 쓰나 안쓰나 똑같이 컴파일되네요. 그러면 굳이 제네릭을 써야할까요?

> 네. 이유는 위의 단언과 같습니다.

제네릭은 컴파일된 js코드에서는 완전히 사라집니다. 이또한 런타임에는 존재하지 않고 컴파일 시점에만 유효성 검사 및 타입 추론을 돕기 위해 사용되기 때문입니다.

그럼에도 불구하고 **제네릭을 사용하는 이유**는 런타임 성능에 영향을 주지 않는데, `개발 시점에서 발생할 수 있는 잠재적인 오류방지와 코드 가독성, 재사용성을 높여주기 때문`이며, 이 제네릭은 마치 건물을 만들기 전 설계도면을 꼼꼼하게 그리는 것과 같다고 생각합니다.

이 도면(제네릭) 덕분에 더욱 튼튼하고(안정성), 효율적인 건물을 지을 수 있듯, `타입스크립트를 사용하는 가장 큰 이유 중 하나인 타입 안정성과 개발 효율성을 챙긴 것이 제네릭`입니다.

---

## 3. enum을 피해야하는 이유와 이에 대한 대안(타입 유니언)

타입 스크립트에서 enum(열거형)은 특정 값들의 집합에 이름을 부여하여 관리할 수 있게 해주는 기능입니다.

예를 들어 "대기중", "진행중", "완료됨"과 같은 상태를 0, 1, 2로 표현할 수 있습니다.

아래 예제 코드를 보시죠.

```ts
enum OrderStatus {
  isPending,
  isProcesing,
  comleted,
}

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

const currentStatus: OrderStatus = OrderStatus.isProcesing;
const method: HttpMethod = HttpMethod.GET;
```

이런식으로 isPending은 기본적으로 0부터 시작합니다.

하지만 언뜻 보면 유용해 보이지만, 이를 js 컴파일 시 코드가 어떻게 되는지 보시죠.

```js
"use strict";
var OrderStatus;
(function (OrderStatus) {
  OrderStatus[(OrderStatus["isPending"] = 0)] = "isPending";
  OrderStatus[(OrderStatus["isProcesing"] = 1)] = "isProcesing";
  OrderStatus[(OrderStatus["comleted"] = 2)] = "comleted";
})(OrderStatus || (OrderStatus = {}));
var HttpMethod;
(function (HttpMethod) {
  HttpMethod["GET"] = "GET";
  HttpMethod["POST"] = "POST";
  HttpMethod["PUT"] = "PUT";
  HttpMethod["DELETE"] = "DELETE";
})(HttpMethod || (HttpMethod = {}));
const currentStatus = OrderStatus.isProcesing;
const method = HttpMethod.GET;
```

enum을 피해야한다고 했던 이유가 이것입니다.

**1. 런타임 오버헤드 (js 컴파일시 코드 생성):**
가장 큰 문제라고 알려져있으며, `interface, generic..` 은 컴파일 시점에서 js코드에서 모두 제거가됩니다. 하지만 enum은 js 런타임 코드(객체)로 컴파일되어 번들 크기를 증가시키고 런타임 오버헤드를 발생시킵니다.

이렇게 객체로 변환되어 실행 시 메모리를 차지하게 되면서 작은 경우는 큰 문제가 되지 않을 수있으나, **많은 enum을 사용하게 된다면 어떻게 될까요?**
당연하게 `불필요한 코드와 메모리 사용량이 늘어날 것으로 예상`됩니다.

이외에도 문제가 타입 안정성문제입니다. 두 번째 상황에서 설명드릴게요.

**2. 타입 안정성 문제(리버스 매핑):**
기본 숫자 enum의 경우, enum member의 숫자 값으로 enum member 이름을 역으로 조회할 수 있는 양방향 매핑이 생성됩니다. 이는 의도치 않은 동작이나 타입 안정성 문제를 야기할 수 있습니다.

> 그러면 이러한 enum의 대안으로 어떤 걸 써야할까?

`Literal Types & Type Union` 입니다.

enum이 제공하는 것과 유사한 이점을 얻으면서 위의 단점을 피할 수 있는 가장 좋은 대안으로 많은 개발자들이 `리터럴 타입, 타입 유니언`을 사용합니다.

<br>

아래 코드를 보시죠.

```ts
// 타입 유니언 (리터릴 유니언 타입)
type OrderStatus = "isPending" | "isProcessing" | "completed";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const currentStatus: OrderStatus = "isProcessing";

const method: HttpMethod = "GET";

const processOrder = (status: OrderStatus) => {
  if (status === "isPending") {
    console.log("주문 대기중..");
  }
  //...
};

processOrder("completed");
```

<br>
그리고 컴파일된 js코드도 함께 보시죠.

```js
"use strict";
const currentStatus = "isProcessing";
const method = "GET";
const processOrder = (status) => {
  if (status === "isPending") {
    console.log("주문 대기중..");
  }
  //...
};
processOrder("completed");
```

위 코드 처럼 타입 유니언 사용을 함으로써 얻는 이점은 아래와 같습니다.

**1. 런타임 오버헤드 없음:**
타입 유니언은 컴파일 후 js코드에서 완전히 제거됩니다. 따라서 번들 크기나 런타임 성능에 영향을 주지 않습니다..

**2. 명확한 타입 안정성:**
특정 문자열 리터럴만 허용하므로, 오타나 잘못된 값 할당을 컴파일 시점에 즉시 잡아낼 수 있습니다.

**요약**을 해보자면,

`enum` 은 결국 js로 컴파일될 때 `런타임 오버헤드를 발생`시키고 예상치 못한 `타입 안정성 문제를 야기`할 수 있습니다.

이에대한 대안으로 타입 유니언은 아무런 코드를 생성하지 않으면서도 동일하거나 `더 나은 타입 안정성, 재사용성, 그리고 더 나은 DX를 제공`합니다. 따라서 특별한 이유가 없다면 당연히 enum 보다는 타입 유니언을 사용하는 것이 좋겠다는 생각입니다.

---

## 마무리

이 3가지 개념들을 통해 타입스크립트를 더 안전하고 효과적으로 사용하는데 핵심적인 역할을 한다고 생각합니다.

- unknown + 타입 단언 : 안전한 타입 처리
- 제네릭: 재사용 가능한 타입 안전 코드
- 타입 유니언: 현대적인 enum 대안 (타입 안정성)

> 결국 공통점은 `안정성` 에 있다는 것입니다.

프로젝트에 대해 코드, 타입 안정성을 제공해주고 이로인해 예측 가능한 코드를 작성할 수 있고, 더 나은 경험을 개발자에게 제공할 수 있다고 생각합니다.

감사합니다.
