# 타입스크립트 1주차 스터디

### 목차

### 1. 타입스크립트란?

### 2. 타입 사용 방법

### 3. 타입스크립트의 특징

### 4. Interface & type

---

### 1. 타입 스크립트란?

타입스크립트 공식 홈페이지를 들어가면 이런 키워드로 타입스크립트를 나타내고 있다.

> JavaScript and More (JavasScript와 그 이상)

TypeScript는 JavaScript에 추가적인 문법을 더해 에디터와의 더 긴밀한 통합을 지원한다. 에디터에서 초기에 오류를 잡아낼 수 있다.

> A Result You Can Trust (신뢰할 수 있는 결과)

TypeScript 코드는 JavaScript로 변환되며, 이 JavaScript는 어디서나 JavaScript가 실행되는 곳에서 작동할 수 있다: 브라우저, Node.js, Deno, Bun 등 어느 곳 실행된다.

> Safety at Scale (대규모 안정성)

TypeScript는 JavaScript를 이해하고 타입 추론을 통해 뛰어난 도구를 제공한다. 추가 코드 없이도 이러한 기능을 활용할 수 있다.

현재 나온 버전은 TypeScript 5.8 버전으로 소개하고 있다.

---

### 2. 타입 사용 방법

타입스크립트의 핵심은 아무래도 `변수`, `함수`, `객체` 등에 타입을 지정하는 것이다.

```tsx
// 기본적인 타입
let name: string = "Hyun";
let age: number = 28;
let isDeveloper: boolean = true;
let nullTest: null = null;
let undefinedTest: undefined = undefined;

// 배열에서의 타입
let numbers: number[] = [1, 2, 3];

// 튜플 타입 (고정된 길이의 배열, 각 위치에 타입이 지정)
let tupleType: [string, number, boolean] = ["Hyun", 28, false];

// 열거형 타입
enum Color {
  Red = 1,
  Green = 2,
  Blue = 3,
}

// Any / void / Never ..
let anyTest: any = 111;
anyTest = "Hyun"; // 이렇게 any를 사용하여 다른 타입 간 변경 허용

const voidTest = (): void => {
  console.log("voidTest");
};

const throwError = (): never => {
  throw new Error("보통 never 타입은 에러 시 많이 사용");
};
```

```tsx
// 매개변수와 반환 타입을 지정 가능
const add = (x: number, y: number): number => {
  return x + y;
};

// 객체에 대한 타입 정의 가능
let user: { id: number; name: string; age: number } = {
  id: 123,
  name: "hyun",
  age: 28,
};

// 인터페이스 타입
interface User {
  id: string;
  name: string;
  email?: string;
  age: number;
}
```

이런식으로 다양한 방법으로 타입을 정의할 수 있다. 또한 공식 문서에서 타입 간 연관성과 슈퍼/하위 타입을 설명해준다.

---

### 3. 타입스크립트 특징

이렇게 타입을 지정하기 때문에 엄청난 이점이 있다.

**강점**

1.  타입 안정성

    - 컴파일 시 타입 오류를 발견하여 런타임 오류를 줄여준다.
    - 보다 안정적인 코드를 작성할 수 있다.

2.  코드 가독성 향상

    - 코드 자체가 타입 정보를 포함하여 별도의 문서 없이도 이해하기 쉽다.
    - 유지보수성이 향상된다.

3.  JS와의 호환성
    - 기존의 `.jS`를 `.ts`로 마이그레이션이 쉽다.

---

### 4. interface & type

공부를 하다보니, interface와 type의 형태가 비슷해보여서 어떤 점이 다른가 하여 찾아 보았다.

먼저 TypeScript에서 객체 타입을 정의 하는 두 가지 주요 방법으로 위 `interface`, `type` 키워드를 사용하여 구현할 수 있다.

> 공통점

- 객체의 형태를 정의할 수 있음
- 속성과 메서드의 타입 지정 가능

<br>

먼저 interface의 사용 예시부터 보면

```tsx
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: number;
}

// 인터페이스 선언 병합 (같은 이름으로 여러 번 선언 시 병합)
interface Person {
  address: string;
}

// 이런식으로 extends한 객체를 타입으로 지정 가능
let hyun: Employee = {
  name: "hyun",
  age: 28,
  employeeId: 10,
  address: "Seoul",
};
```

이렇게 기존 인터페이스를 확장이 가능 하고, 같은 이름으로 여러 번 선언 시 병합되는 것을 확일 할 수 있다.

다음은 type에 대한 특징을 알아보자.

```tsx
type Person = {
  name: string;
  age: number;
};

// 교차 타입을 사용하여 확장 가능
type Employee = Person & {
  employeeId: number;
};

// Union Type 적용 예시
type ID = string | number;

type Text = string;
```

이런식으로 가볍게 타입을 지정할 수 있다.

> 주요 차이점

1. 선언 병합

   - interface: 동일한 이름으로 여러 번 선언 시, 자동 병합
   - type: 중복 선언 불가능

2. 확장 방식

   - interface: `extends` 키워드를 사용하여 확장 가능
   - type: 교차 타입으로 확장 가능

3. 표현 방식

   - interface: 객체 형태 정의에 최적화되어있는 방법
   - type: 유니온, 교차, 기본 타입 별칭 등 다양한 타입에 대해 표현이 가능.

4. 적용 범위
   - interface: 주로 객체, 클래스의 구조 정의에 사용
   - type: 모든 종류의 타입에 별칭을 부여하는 데 사용

---

찾아보니 사용 지침이 있다.

- 확장 가능성이 있는 타입은 `interface` 사용 권장
- 유니온이나 교차 타입 등 복잡한 타입은 `type` 사용 권장
- 프로젝트 내에서는 일관성 있게 사용하는 것이 중요
