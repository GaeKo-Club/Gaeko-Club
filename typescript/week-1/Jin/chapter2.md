# 💡 타입의 종류

## 기본타입

자바스크립트에서 자주 사용하는 값들의 타입을 정적으로 명시할 수 있도록 제공하는 타입
대표적으로 `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint` 등이 있다.
기본타입을 지정함으로써 코드의 안정성과 예측 가능성을 높일 수 있다.

```ts
let age: number = 30;
let name: string = "TypeScript";
let isActive: boolean = true;
```

---

## 원시타입과 리터럴타입

### 원시타입 (Primitive Types)

자바스크립트의 원시값에 해당하는 타입으로, 값 자체가 메모리에 저장된다.
타입스크립트에서 원시타입은 `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint` 가 있다.

```ts
let username: string = "kim";
let score: number = 100;
```

### 리터럴타입 (Literal Types)

리터럴타입은 특정한 값을 타입으로 지정하는 방식이다. 값 자체가 타입이 되는 개념이다.

```ts
let direction: "left" | "right" | "center";
direction = "left"; // 가능
direction = "up"; // 오류
```

---

## 2. 배열과 튜플

### 배열 (Array)

배열은 동일한 타입의 값들을 순차적으로 나열한 구조이다.
타입스크립트에서는 두 가지 방식으로 타입을 지정할 수 있다.

```ts
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];
```

### 튜플 (Tuple)

튜플은 고정된 길이와 타입을 가지는 배열이다. 각각의 인덱스에 특정 타입을 지정할 수 있다.

```ts
let user: [string, number] = ["kim", 20];
```

---

## 3. 객체

객체 타입은 여러 속성과 해당 속성의 타입을 정의할 수 있다. 선택적 속성은 `?`를 사용한다.

```ts
let person: {
  name: string;
  age: number;
  isStudent?: boolean;
} = {
  name: "lee",
  age: 25,
};
```

---

## 4. 타입 별칭과 인덱스 시그니쳐

### 타입 별칭 (Type Alias)

타입 별칭은 `type` 키워드를 사용하여 타입에 이름을 붙이는 방식이다.
재사용성과 가독성을 높일 수 있다.

```ts
type User = {
  id: number;
  name: string;
};

let user: User = { id: 1, name: "kim" };
```

### 인덱스 시그니쳐 (Index Signature)

객체 속성의 이름이 고정되어 있지 않을 때 사용하는 문법이다.

```ts
type StringMap = {
  [key: string]: string;
};

let colors: StringMap = {
  primary: "#000",
  secondary: "#fff",
};
```

---

## 5. 열거형 타입 (Enum)

`enum`은 이름이 있는 상수들을 정의할 때 사용한다. 숫자형, 문자형 열거형을 지원한다.

```ts
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

let dir: Direction = Direction.Left;
```

문자형 열거형도 가능하다.

```ts
enum Color {
  Red = "RED",
  Blue = "BLUE",
}
```

---

## 6. any와 unknown

### any

`any` 타입은 모든 타입을 허용한다. 타입 검사를 하지 않기 때문에 가능한 한 사용을 피하는 것이 좋다.

```ts
let value: any = 123;
value = "hello";
value = true;
```

### unknown

`unknown`은 `any`처럼 모든 타입을 받을 수 있지만, 사용 전에 타입을 좁혀야 한다는 제약이 있다.

```ts
let input: unknown = "hi";

if (typeof input === "string") {
  console.log(input.toUpperCase());
}
```

---

## 7. void와 never

### void

`void`는 주로 함수에서 반환값이 없음을 명시할 때 사용한다.

```ts
function logMessage(): void {
  console.log("Hello");
}
```

### never

`never`는 절대 반환되지 않는 값의 타입이다. 무한 루프이거나 예외를 던지는 함수 등에 사용된다.

```ts
function throwError(): never {
  throw new Error("Something went wrong");
}
```

---

이렇게 타입스크립트의 주요 기본 타입들을 정리해두면, 실제 프로젝트에서 타입 안정성과 가독성 있는 코드를 작성하는 데 큰 도움이 된다.
