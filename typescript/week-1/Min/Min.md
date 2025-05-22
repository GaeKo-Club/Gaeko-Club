# 타입스크립트 1주차

## 타입스크립트란 무엇인가?

타입스크립트는 자바스크립트의 상위 집합(Superset)으로, 정적 타입(static type)을 지원하는 프로그래밍 언어다.

마이크로소프트에서 개발되었으며, 기존 자바스크립트 코드와 완전히 호환되면서도 컴파일 시점에서 오류를 사전에 방지할 수 있는 강력한 타입 시스템을 제공한다.

타입스크립트는 브라우저가 직접 실행할 수 없기 때문에, 작성한 코드를 자바스크립트로 트랜스파일하여 실행하게 된다.

타입스크립트는 공식문서에 따르면 다음과 같은 목표를 가지고 설계되었다.

1. 대규모 애플리케이션 개발에 적합하다록 타입 시스템과 클래스 기반 객체 지향 기능 제공
2. 자바스크립트와의 완전한 호환성
3. 점진적인 타입 적용이 가능해, 필요한 만큼만 타입을 사용할 수 있음
4. 에디터 자동완성, 타입 추론, 리팩토링 지원 등 개발자 경험 개선

즉, 타입스크립트는 자바스크립트의 자유로움은 유지하면서도, 안정성과 유지보수성을 강화한 언어라고 할 수 있다.

## 타입스크립트의 기본 타입

기본 타입(내장 타입)이란 타입스크립트가 자체적으로 제공하는 가장 기본적인 데이터 타입들을 의미함.
타입스크립트의 기본 타입은 타입 간의 포함 관계에 따라 계층적으로 정리할 수 있다.

![타입스크립트 타입 계층도](./image/type-hierarchy.png)

### 원시 타입과 리터럴 타입

```tsx
let num: number = 123;
let str: string = "hello";
let bool: boolean = true;
let null1: null = null;
let unde: undefined = undefined;
let numA: 10 = 10; // 리터럴 타입
```

이처럼 타입스크립트는 number, string, boolean, null, undefined와 같은 5가지 원시 타입과 값 그 자체를 타입으로 쓰는 리터럴 타입을 제공한다.

### 배열과 튜플

```tsx
// 배열
let numArr: number[] = [1, 2, 3];
let strArr: Array<string> = ["hello", "im", "min"]; // 제너릭 형식으로 가능

// 튜플: 자바스크립트에 없는 타입스크립트의 특수한 타입으로 길이와 타입이 고정된 배열
let tup1: [number, string, boolean] = [1, "hello", true];
```

### 객체 타입 정의

```tsx
let user: object = {
  // 문제 발생
  id: 1,
  name: "박광민",
};

let user: {
  // 객체 리터럴
  id?: number;
  readonly name: string;
} = {
  id: 2,
  name: "박광민",
};
```

object 타입은 객체라는 것만 알려줄 뿐, 속성에 대한 정보를 알 수 없기 때문에 user.id와 같은 접근이 불가능하다.
반면, 객체 리터럴 형태로 타입을 명확하게 정의하면 각 속성에 안전하게 접근할 수 있어 타입스크립트의 장점을 제대로 활용할 수 있다.

id?: number -> optional(?) 선택적 속성으로 있어도 되고, 없어도 되는 속성이다.
readonly -> 읽기 전용 속성으로 한 번 정의되면 값을 수정할 수 없다.

### 타입 별칭과 인덱스 시그니쳐

```tsx
// 타입 별칭
type User = {
  id: number;
  name: string;
  nickname: string;
  birth: string;
};

let user: User = {
  id: 1,
  name: "박광민",
  nickname: "minimo",
  birth: "1998.10.28",
};

// 인덱스 시그니쳐
type CountryNumberCodes = {
  [key: string]: number;
};
```

타입 별칭은 복잡한 객체 구조를 재사용 가능하도록 이름을 붙여주는 기능이다.
코드의 가독성과 유지보수성을 높일 수 있다.

인덱스 시그니쳐는 객체의 키가 정해지지 않았거나 동적으로 정해지는 경우, 그 키와 값의 타입을 명시적으로 정의할 수 있는 문법이다.

### 열거형 타입

```tsx
enum Role {
  ADMIN = 0,
  USER = 1,
  GUEST = 2,
}
```

enum(열거형)은 관련된 상수들을 하나의 이름 아래 묶어서 의미 있는 값으로 정의할 수 있는 타입이다.

### any, unknown, void, never

```tsx
let num: number = 10;

let anyVar: any = 10;
anyVar = "박광민";
num = anyVar;

let unknownVar: unknown = 10;
unknownVar = "박광민";
num = unknownVar; // 오류

function func(): void {
  console.log("hello");
}

function func2(): never {
  throw new Error();
}
```

any: 모든 타입을 허용하는 특수 타입으로, 타입 검사를 하지 않음. 최대한 사용을 지양하는 것이 좋다.
unknown: 모든 타입의 값을 저장할수 있지만, 사용할 때는 타입 검사 또는 단언이 필요한 안전한 any.
void: 반환값이 없는 함수의 반환 타입에 주로 사용.
never: 절대 반환되지 않는 함수의 반환 타입. 주로 오류 발생 함수에 사용한다.

## 타입은 집합

타입스크립트에서 타입은 값의 집합으로 이해할 수 있다.
예를 들어 number 타입은 모든 숫자 값을 포함하는 집합이고, 10은 그 안에 포함된 하나의 리터럴 타입(부분 집합)이다.

### 타입 호환성

타입 호환성이란 어떤 타입을 다른 타입으로 취급해도 괜찮은지 판단하는 기준이다.

서브타입 → 슈퍼타입 (업캐스팅) : 대부분 허용됨
슈퍼타입 → 서브타입 (다운캐스팅) : 대부분 허용되지 않음 (타입 단언이 필요함)

특수한 경우로,
any 타입은 업캐스팅과 다운캐스팅을 모두 무시한다.
never는 공집합을 의미하는 타입으로, 모든 타입의 서브타입이지만 반대로는 불가능하다.

### 객체 타입의 호환성

```tsx
type Animal = {
  // 슈퍼타입
  name: string;
  color: string;
};

type Dog = {
  // 서브타입
  name: string;
  color: string;
  breed: string;
};

animal = dog; // 가능
dog = animal; // 불가능
```

객체 타입간의 호환성은 속성의 구조(프로퍼티 구성)를 기준으로 판단된다.

### 대수 타입

대수 타입이란 여러개의 타입을 조합하여 새로운 타입을 만드는 방식을 말한다.
대수 타입은 두 가지 형태로 나뉜다:
합집합 타입 (Union Type): A | B — 두 타입 중 하나를 가질 수 있는 타입
교집합 타입 (Intersection Type): A & B — 두 타입을 모두 만족해야 하는 타입

```tsx
// 합집합 타입
let value: string | number;
value = "hello";
value = 123;

//교집합 타입
type Dog = { name: string };
type Cat = { meow: boolean };
type Pet = Dog & Cat;

const pet: Pet = {
  name: "가을이",
  meow: true,
};
```

### 타입 단언

타입 단언이란 개발자가 '이 값은 특정 타입이다' 라고 직접 확신을 가지고 명시하는 문법이다.

타입 단언에는 지켜야 할 조건이 존재한다.
값 as 타입 형식의 단언식을 a as b로 표현했을 때,
다음 두 가지 조건 중 하나를 반드시 만족해야 한다.

1. A가 B의 서브타입이다
2. A가 B의 슈퍼타입이다

즉, A와 B는 타입 계층상 관련이 있어야 하며, 완전히 무관한 타입 간의 단언은 허용되지 않음

```tsx
// 타입 단언
type Dog = {
  name: string;
  color: string;
};

let dog: Dog = {
  name: "돌돌이",
  color: "brown",
  breed: "진도",
} as Dog; // 추가 프로퍼티가 존재하지만 단언하여 검사를 피할 수 있음

// 타입 조건
let num1 = 10 as never; // 가능
let num2 = 10 as unknown; // 가능
let num3 = 10 as string; // 불가능

// const 단언
let let cat = {
  name: "야옹이",
  color: "yellow",
} as const; // 모든 프로퍼티가 readonly를 갖도록 단언된다.

//Non Null 단언
const len: number = post.author!.length; // 값 뒤에 !를 붙여 값이 undefined이거나 null이 아닌 걸 단언
```

### 타입 좁히기

타입 좁히기란, 하나 이상의 타입(유니온 타입)을 가진 값에 대해 조건문 등을 이용해 실제 타입을 판별하고, 그에 맞게 확정하는 방법이다.

```tsx
// 타입 좁히기 typeof 사용
function func(value: number | string) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  }
}

instanceof 타입 가드 내장 클래스 타입을 보장할 수 있는 타입가드 만들기
function func(value: number | string | Date | null) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (value instanceof Date) {
    console.log(value.getTime());
  }
}

in 타입 가드 직접 만든 타입과 함께 사용하는 하려면 in 연산자 사용
type Person = {
  name: string;
  age: number;
};

function func(value: number | Person) {
  if (typeof value === "number") {
    console.log(value.toFixed());
  }else if (value && "age" in value) {
    console.log(`${value.name}은 ${value.age}살 입니다`)
  }
}
```

### 서로소 유니온 타입

서로소 유니온 타입은 교집합이 없는 서로 다른 타입들로 구성된 유니온 타입을 의미한다

```tsx
type Admin = {
  tag: "ADMIN";
  name: string;
  kickCount: number;
};

type Member = {
  tag: "MEMBER";
  name: string;
  point: number;
};

type Guest = {
  tag: "GUEST";
  name: string;
  visitCount: number;
};

type User = Admin | Member | Guest; // 서로소 유니온 타입

function login(user: User) {
  switch (user.tag) {
    case "ADMIN": {
      console.log(`${user.name}님 현재까지 ${user.kickCount}명 추방했습니다`);
      break;
    }
    case "MEMBER": {
      console.log(`${user.name}님 현재까지 ${user.point}모았습니다`);
      break;
    }
    case "GUEST": {
      console.log(`${user.name}님 현재까지 ${user.visitCount}번 오셨습니다`);
      break;
    }
  }
} // switch문을 if문 보다 많이 사용, 누락된 case를 알려준다.
```

## 함수 타입

자바스크립트에서 사용하던 함수를 타입스크립트로 작성하면, 매개변수와 반환값에 타입을 명시해 보다 명확하게 표현할 수 있다.

```tsx
// 함수 선언식
function func(a: number, b: number) {
  return a + b;
}

// 화살표 함수
const add = (a: number, b: number) => a + b;

// 매개변수 기본 값
function introduce(name = "박광민") {
  console.log(`name : ${name}`);
}

introduce(1); // 오류
```

### 함수 타입 표현식 / 호출 시그니쳐

```tsx
// 함수 타입 표현식
type Operation = (a: number, b: number) => number;

const add: Operation = (a, b) => a + b;
const sub: Operation = (a, b) => a - b;
const multiply: Operation = (a, b) => a * b;
const divide: Operation = (a, b) => a / b;

// 호출 시그니쳐
type Operation2 = {
  (a: number, b: number): number;
};

const add2: Operation2 = (a, b) => a + b;
const sub2: Operation2 = (a, b) => a - b;
const multiply2: Operation2 = (a, b) => a * b;
const divide2: Operation2 = (a, b) => a / b;
```

함수 타입 표현식과 호출 시그니쳐는 비슷해 보이지만 차이점이 있다.
호출 시그니쳐는 속성을 추가하거나 함수 오버로딩이 가능한 반면,
함수 타입 표현식은 순수한 함수 타입만 정의할 수 있다.

### 함수 타입의 호환성

함수 타입의 호환성이란 특정 함수 타입을 다른 함수 타입으로 괜찮은지 판단하는 것을 의미

1. 두 함수의 반환값 타입이 호환되는가?
2. 두 함수의 매개변수의 타입이 호환되는가?

```tsx
// 반환값 타입이 호환되는지 여부
type A = () => number; // 슈퍼 타입
type B = () => 10; // 서브 타입

let a: A = () => 10;
let b: B = () => 10;

a = b; // 가능: B의 반환값(10)은 A의 반환값(number)에 포함됨
b = a; // 불가능: A의 반환값은 항상 10이 아닐 수 있음

// 매개변수의 갯수가 같을 때
type Animal = {
  name: string; // 슈퍼 타입
};

type Dog = {
  name: string; // 서브 타입
  color: string;
};

let animalFunc = (animal: Animal) => {
  console.log(animal.name);
};

let dogFunc = (dog: Dog) => {
  console.log(dog.name);
  console.log(dog.color);
};

animalFunc = dogFunc; // 가능: Dog는 Animal보다 자세하므로 가능
dogFunc = animalFunc; // 불가능: Animal엔 color가 없을 수도 있음

// 매개변수의 갯수가 다를 때
type Func1 = (a: number, b: number) => void; // 슈퍼 타입
type Func2 = (a: number) => void; // 서브 타입

let func1: Func1 = (a, b) => {};
let func2: Func2 = (a) => {};

func1 = func2; // 가능: func2는 func1처럼 동작할 수 있음
func2 = func1; // 불가능: func1은 두 개 필요함
```

### 함수 오버로딩

함수 오버로딩이란 하나의 함수를 매개변수의 개수나 타입에 따라 다르게 동작하도록 만드는 문법이다.

```tsx
// 오버로드 시그니쳐들
function func(a: number): void;
function func(a: number, b: number, c: number): void;

// 실제 구현(구현 시그니쳐는 단 하나만 가능)
function func(a: number, b?: number, C?: number) {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c); // 세 개 모두 있을 때
  } else {
    console.log(a * 20); // 하나만 있을 때
  }
}

func(1); // 매개변수 1개 -> 첫 번째 오버로드 시그니처
func(1, 2); // 오류:(a: number, b: number) 형태는 정의된 오버로드에 없음
func(1, 2, 3); // 매개변수 3개 -> 두 번째 오버로드 시그니처
```
