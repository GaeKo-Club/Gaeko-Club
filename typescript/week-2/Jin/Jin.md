### JavaScript 클래스

#### 1. 클래스란?

클래스는 객체를 만들기 위한 템플릿이다. 동일한 구조와 동작을 가지는 객체를 반복해서 만들 때 사용한다. ES6부터 도입되었다.

#### 2. 클래스 선언 방법

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`안녕하세요, 저는 ${this.name}입니다.`);
  }
}
```

#### 3. 클래스 인스턴스 생성

```js
const user1 = new Person("철수", 25);
user1.greet(); // 안녕하세요, 저는 철수입니다.
```

#### 4. 클래스의 주요 특징

- `constructor`: 객체가 생성될 때 호출되는 생성자 메서드이다.
- `this`: 인스턴스 자신을 가리킨다.
- 메서드는 `function` 키워드 없이 작성한다.
- 클래스는 `new` 키워드로 인스턴스를 생성한다.

#### 5. 상속

```js
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // 부모 클래스의 constructor 호출
    this.grade = grade;
  }

  study() {
    console.log(`${this.name}은(는) 공부 중이다.`);
  }
}

const s1 = new Student("영희", 20, "A");
s1.greet(); // 안녕하세요, 저는 영희입니다.
s1.study(); // 영희은(는) 공부 중이다.
```

#### 6. 정적 메서드

정적 메서드는 클래스 자체에 속하며, 인스턴스가 아닌 클래스 이름으로 호출한다.

```js
class MathUtil {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtil.add(2, 3)); // 5
```

#### 7. 클래스 필드 (실험적 기능)

```js
class Counter {
  count = 0; // 클래스 필드

  increase() {
    this.count++;
  }
}

const c = new Counter();
c.increase();
console.log(c.count); // 1
```

#### 8. 캡슐화 (private 필드)

```js
class Secret {
  #password = "1234"; // private 필드

  checkPassword(pw) {
    return this.#password === pw;
  }
}

const s = new Secret();
console.log(s.checkPassword("1234")); // true
// console.log(s.#password); // 에러 발생
```

---

### TypeScript에서의 클래스

#### 1. 타입 명시

```ts
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): void {
    console.log(`안녕하세요, 저는 ${this.name}입니다.`);
  }
}
```

#### 2. 접근 제한자

- `public`: 기본값, 어디서든 접근 가능
- `private`: 클래스 내부에서만 접근 가능
- `protected`: 클래스 내부와 자식 클래스에서만 접근 가능

```ts
class Secret {
  private password: string;

  constructor(password: string) {
    this.password = password;
  }

  checkPassword(pw: string): boolean {
    return this.password === pw;
  }
}
```

#### 3. 상속

```ts
class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  study(): void {
    console.log(`${this.name}은(는) 공부 중이다.`);
  }
}
```

#### 4. 정적 메서드

```ts
class MathUtil {
  static add(a: number, b: number): number {
    return a + b;
  }
}

console.log(MathUtil.add(2, 3)); // 5
```

#### 5. 클래스 필드 & 생성자 생략

```ts
class Counter {
  constructor(public count: number = 0) {}

  increase(): void {
    this.count++;
  }
}
```

#### 6. 인터페이스와 클래스

```ts
interface Animal {
  name: string;
  speak(): void;
}

class Dog implements Animal {
  constructor(public name: string) {}

  speak(): void {
    console.log(`${this.name}가 멍멍 짖는다.`);
  }
}
```
