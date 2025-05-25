# 2주차 공부한 내용 정리

## 정리 섹션

### 1. 클래스

- 클래스란?
- 접근제어자
- 인터페이스와 클래스 활용

### 2. 제네릭 타입

- 제네릭이란?
- 사용 예시

### 3. keyof 연산자

- keyof란?
- 사용 예시

---

### 클래스

    정의: 틀이 있는 구조의 객체를 가져와 값만 넣어 생성할 수 있도록 도와주는 문법

```jsx
class Computer {
    cpu: string = "";
    ram: number = 0;
    graphicCard: string = "";
    cooler?: boolean = false;
    computerCase: string = "";
    monitor: string = "";

    constructor(cpu: string, ram: number, graphicCard:string, cooler: boolean, computerCase: string, monitor: string){
        this.cpu = cpu;
        this.ram = ram;
        this.graphicCard = graphicCard;
        this.cooler = cooler;
        this.computerCase = computerCase;
        this.monitor = monitor;
    }
}

const aComputer: Computer = {
    cpu: "i3-10100f",
    ram: 32,
    graphicCard: "1660Super",
    cooler: true,
    computerCase: "micronics",
    monitor: "DELL"
}

console.log(aComputer);

```

지금은 한 개의 데이터에 대해서만 클래스 문법을 사용하여 객체를 생성했지만, 여러 개가되었을 때, 미리 정의한 클래스를 가져와 데이터만 넣으면 된다. <br>이처럼 미리 만들어놓은 틀에 데이터만 넣으면 되기 때문에 하나씩 일일이 만들 필요가 없다.

**타입스크립트에서는 위의 코드 처럼 각 필드에 대해 타입을 명시해줘야한다. 그렇지 않으면 암시적 any타입으로 추론되는데, strict모드일 때에는 오류가 발생한다.**

해당 필드에 값이 들어갈 수도있고, 안들어갈 수도 있는 경우에는 필드값 뒤에 "?" 를 붙여 사용이 가능하다.

<br>

#### 접근 제어자

타입스크립트에서 제공되는 기능 중 접근제어자(Access Modifier)가 있는데, 클래스의 특정 필드, 메서드를 접근할 수 있는 범위를 설정하는 기능이다.

아래와 같이 3개의 접근 제어자를 사용할 수 있다.

> - public : 모든 범위에서 접근이 가능
> - private: 정의한 클래스 내부에서만 접근 가능
> - protected: 클래스 내부, extends한 클래스 내부에서 접근 가능

<br>

```jsx
// 접근제어자 사용 예시 코드

class Person {
  public name: string;         // public: 어디서나 접근 가능
  protected age: number;       // protected: 클래스 및 하위 클래스에서만 접근 가능
  private job: string;         // private: 해당 클래스 내부에서만 접근 가능

  constructor(name: string, age: number, job: string) {
    this.name = name;
    this.age = age;
    this.job = job;
  }

  // private 멤버 접근 예시 (job을 정의한 클래스 내부에서 접근 가능)
  introduce() {
    console.log(`안녕하세요, 제 이름은 ${this.name}이고, 직업은 ${this.job}입니다.`);
  }
}

class Manager extends Person {
  // protected 멤버 접근 예시
  introduceManager() {
    console.log(`${this.name} 매니저입니다.`);    // public: 접근 가능
    console.log(`나이는 ${this.age}살입니다.`);    // protected: 하위 클래스에서 접근 가능
  }
}

const manager = new Manager("이정환", 30, "매니저");

// public 멤버 접근 예시
console.log(manager.name); // 가능

// protected 멤버 접근 예시
// console.log(manager.age); // 불가능 (컴파일 에러) - 클래스 외부에서 접근 불가

// private 멤버 접근 예시
// console.log(manager.job); // 불가능 (컴파일 에러) - 클래스 외부에서 접근 불가

manager.introduce();        // 가능 (내부에서 private 멤버 사용)
manager.introduceManager(); // 가능 (내부에서 protected 멤버 사용)

```

<br>

#### 인터페이스와 클래스의 활용

아래의 코드와 같이 TS의 인터페이스는 클래스의 설계도 같은 역할을 할 수 있다. <br>
다음과 같이 인터페이스를 이용해클래스에 어떤 필드들이 존재하고, 어떤 메서드가 존재하는지 정의할 수 있다.

```jsx
/**
 * 인터페이스와 클래스
 */

interface CharacterInterface {
  name: string;
  moveSpeed: number;
  move(): void;
}

class Character implements CharacterInterface {
  constructor(
    public name: string,
    public moveSpeed: number,
    private extra: string
  ) {}

  move(): void {
    console.log(`${this.moveSpeed} 속도로 이동!`);
  }
}
```

위 처럼 constructor안에 접근제어자를 사용할 경우, this로 할당을 하지 않아도 된다.

---

### 제네릭 타입

#### 제네릭이란?

> 함수를 만들 때 타입을 미리 고정하지 않고, 사용하는 시점에 타입을 정할 수 있다.

타입스크립트에서 제네릭이란, 함수나 클래스, 인터페이스 등이 다양한 타입에서 동작할 수 있도록 타입을 일반화 하는 기능으로 <br>
즉, 한 가지 타입에 고정되지 않고, 사용할 때 타입을 지정할 수 있게 해주는 것이 **제네릭** 이다.

```jsx
class Box<T> {
  content: T;
  constructor(value: T) {
    this.content = value;
  }
}

const numberBox = new Box<number>(123);     // 이 때 numberBox는 number 타입
const stringBox = new Box<string>("타입스크립트"); .. 이 때 stringBox는 string 타입
```

이렇게 같은 클래스를 바라보더라도 위에 <T> 이렇게 제네릭 타입으로 정의하였을 때는, 타입을 미리 고정시키는게 아닌 사용되는 시점에 타입을 정할 수 있는 편리한 기능이다.

---

### keyof & typeof 연산자

#### keyof

> keyof 연산자는 타입스크립트에서 객체 타입의 "키(key)"값들을 뽑아내어, 이 키들로 이루어진 유니언 타입을 만들어주는 연산자이다.

```jsx
interface Person {
  name: string;
  age: number;
  married: boolean;
}

type PersonKeys = keyof Person; // "name" | "age" | "married"

let key1: PersonKeys = "name";     // OK
let key2: PersonKeys = "age";      // OK
let key3: PersonKeys = "married";  // OK
// let key4: PersonKeys = "address"; // 에러! Person 타입에 없는 키이므로 불가
```

위 예시에서 `PersonKeys` 타입은 `name | age | married`가 된다. (type PersonKeys = keyof Person)

따라서 `key1, key2, key3`에는 이 세 값만 올 수 있고, 다른 값은 할당할 수 없다.

<br>

#### 활용 예시

함수에서 객체의 키만 인자로 받고 싶을 때 사용할 수 있다.

```jsx
interface Person {
  name: string;
  age: number;
  married: boolean;
}

function getValue(obj: Person, key: keyof Person) {
  return obj[key];
}

const person: Person = { name: "홍길동", age: 30, married: false };

console.log(getValue(person, "name")); // "홍길동"
console.log(getValue(person, "age")); // 30
console.log(getValue(person, "married")); // false
```
