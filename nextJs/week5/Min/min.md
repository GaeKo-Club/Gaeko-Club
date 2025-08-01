# Next.js 5주차

## App Router란 무엇인가?

Next.js 13에서는 기존의 `pages` 디렉토리 기반 라우팅 시스템인 Page Router를 대체하는 새로운 구조인 App Router를 도입했다. App Router는 React 18의 최신 기능들을 활용하여, 더 유연하고 강력한 아키텍처를 제공한다. `app/` 디렉토리를 중심으로 구성되며, 서버와 클라이언트 컴포넌트를 명확히 구분하고, 중첩 레이아웃, 스트리밍 렌더링 등 현대적인 웹 개발 방식에 최적화되어 있다.

### Page Router와의 차이점

1. 데이터 페칭 방식 변화
   App Router에서는 더 이상 `getServerSideProps`, `getStaticProps` 같은 함수들을 사용하지 않음. 대신 컴포넌트를 `async` 함수로 선언하고, 내부에서 직접 `fetch`를 사용해 데이터를 가져올 수 있다. 이 방식은 React Server Components(RSC)와 결합되어, 서버에서 데이터를 미리 가져오고 클라이언트로 전달하는 방식으로 최적화됨.

2. 레이아웃 설정 방식의 변화
   기존에는 `_app.js`,`_document.js`를 통해 전체 레이아웃을 설정했지만, App Router에서는 `layout.tsx` 파일을 사용해 중첩 레이아웃을 구성할 수 있다. 이를 통해 페이지 간 상태 유지가 가능하고, 재사용성과 유지보수성이 크게 향상된다.

3. 페이지 라우팅 방식의 변화
   기존에는 `pages/about.tsx`와 같은 파일명이 URL을 결정했다면, App Router에서는 `app/search/page.tsx`처럼 명시적으로 `page.tsx`파일을 사용한다. 또한, 동적 라우팅의 경우 `app/book/[id]/page.tsx`처럼 동적 세그먼트를 정의하여 URL 경로를 동적으로 처리할 수 있다.

4. React 18 기능의 통합
   App Router는 React Server Components와 Streaming Rendering 같은 React 18의 핵심 기능을 기본적으로 지원한다.

- Server Component: 기본적으로 서버에서 실행되는 컴포넌트. 데이터 로딩과 렌더링을 서버에서 처리해 성능 최적화
- Client Component: `use client` 지시어를 통해 클라이언트 전용 컴포넌트 지정 가능
- Streaming: 페이지의 일부분을 먼저 렌더링하고, 나머지 데이터를 준비되는 대로 점진적으로 전송하는 방식. 사용자에게 빠른 응답감을 제공.

### 변경되지 않은 사항

1. 네비게이팅(Navigating)

- `next/link`를 통한 페이지 이동 방식은 기존과 동일하다.
- 내부 링크는 클라이언트 사이드에서 빠르게 전환되며, 전체 페이지를 새로고침하지 않는다.

2. 프리페칭(Pre-Fetching)

- `next/link`를 사용할 경우, 브라우저가 해당 링크가 뷰포트에 들어올 때 자동으로 프리페치한다.
- App Router에서도 이 기능은 그대로 유지되며, 사용자 경험 개선에 중요한 역할을 한다.

3. 사전 렌더링(Pre-Rendering)

- Next.js는 여전히 빌드 시(Static Generation)또는 요청 시(Server-side Rendering) 페이지를 사전 렌더링한다.
- App Router에서도 각 페이지의 렌더링 전략을 설정할 수 있으며, 캐시 및 재검증(revalidate)등으로 세부 조정이 가능하다.

### 페이지 라우팅 방식 비교

1. Page Router

- `pages/` 폴더 기반
- 파일 이름이 곧 URL 경로가 됨
  예시:
  `pages/index.tsx` -> `/`
  `pages/search.tsx` -> `/search`
  `pages/book/[id].tsx` -> `/book/1`, `/book/2`, ... 등

2. App Router

- `app/` 폴더 기반
- `page.tsx` 파일이 라우팅의 기준
- 폴더 구조를 명확히 나눠야 함
  예시:
  `app/page.tsx` -> `/`
  `app/search/page.tsx` -> `/search`
  `app/book/[id]/page.tsx` -> `/book/1`, `/book/2`, ... 등

### 레이아웃

- `layout.tsx`는 해당 경로를 시작으로 모든 하위 페이지에 공통적으로 적용되는 레이아웃을 정의하는 파일이다.
- 레이아웃 파일은 페이지보다 먼저 렌더링되며, 반드시 `children`을 포함해야 한다.(`children` 자리에 실제 페이지 컴포넌트가 렌더링됨)
- 상위 레이아웃 -> 하위 레이아웃 -> 페이지 컴포넌트 순으로 안쪽으로 중첩되는 구성도 가능하다.

### 라우트 그룹(Route Group)

라우트 그룹은 폴더 이름을 소괄호 `()`로 감싸서 만드는 폴더 구조이며, URL 경로에는 전혀 영향을 주지 않는다.
이 기능은 특정 페이지만 공통 레이아웃을 적용하거나, 코드 구조를 정리할 때 유용하게 사용된다.
예를 들어, 여러 페이지에 동일한 레이아웃을 적용하되 경로에는 표시하고 싶지 않을 때 `(그룹이름)` 형태로 폴더를 구성한다.

### React Server Component (RSC)

React Server Component는 React 18부터 새롭게 도입된 개념으로, 서버에서만 실행되는 컴포넌트다.
브라우저에서는 실행되지 않으며, 최종 번들(JS 파일)에도 포함되지 않는다. 이로 인해 클라이언트로 전송되는 코드의 양이 줄어들고, 렌더링 성능도 크게 향상된다.

### 서버 컴포넌트와 클라이언트 컴포넌트 실행 방식 차이

1. 서버 컴포넌트

- 서버에서만 한 번 실행된다.
- React가 페이지를 사전 렌더링할 때 서버에서 컴포넌트를 실행하고, 그 결과를 HTML로 변환해 클라이언트에 전달한다.
- JS 코드는 클라이언트로 전달되지 않기 때문에, JS 번들에도 포함되지 않으며, 브라우저에서는 실행되지 않는다.
- 성능 최적화를 위해 대부분의 페이지를 서버 컴포넌트로 구성하는 것이 권장된다.

2. 클라이언트 컴포넌트

- 서버에서 한 번, 클라이언트에서 다시 한 번, 총 두 번 실행된다.
  - 서버에서는 초기 HTML 생성을 위해 실행
  - 클라이언트에서는 하이드레이션을 위해 다시 실행되어 상호작용을 활성화함
- 상호 작용이 필요한 경우(예: 버튼 클릭, 입력, 상태 변경 등)에 사용한다.
- 컴포넌트 파일 최상단에 `'use client'` 지시어를 추가하면 해당 컴포넌트는 클라이언트에서 실행되는 컴포넌트로 간주된다.

### Co-location(파일 공동 배치)

Co-location은 관련된 파일들을 기능 단위로 같은 위치에 배치하는 방식이다.
Next.js App Router에서는 페이지(`page.tsx`)나 레이아웃(`layout.tsx`)이 아닌 일반 컴포넌트 파일도 `app/` 디렉토리 안에 자유롭게 생성할 수 있다.

### 리액트 서버 컴포넌트 사용 시 주의사항

1. 서버 컴포넌트에는 브라우저 전용 코드를 포함하면 안 됨

- `useState`, `useEffect`, `onClick` 등 리액트 클라이언트 훅과 이벤트 핸들러는 사용 불가
- `window`, `document` 객체 또는 브라우저에서만 동작하는 라이브러리도 포함되면 안 됨
- 서버에서만 실행되므로 브라우저 관련 로직은 동작하지 않음

2. 클라이언트 컴포넌트는 클라이언트에서만 실행되지 않음

- 클라이언트 컴포넌트는 서버에서 한 번(사전 렌더링), 브라우저에서 한 번(하이드레이션) 2번 실행됨.
- 따라서 클라이언트 컴포넌트의 코드도 서버에서 실행된다는 사실을 고려해야 함

3. 클라이언트 컴포넌트는 서버 컴포넌트를 직접 import 할 수 없음

- 서버 컴포넌트는 브라우저에서 실행할 수 없기 때문에, 클라이언트 컴포넌트에서 직접 import하면 오류 발생 가능
- Next.js는 내부적으로 이를 감지하고 서버 컴포넌트를 클라이언트 컴포넌트로 강제 변환하려 시도하지만, 예상치 못한 동작이 생길 수 있음
- 올바른 방식은 서버 컴포넌트를 props로 넘기지 말고, children으로 감싸는 방식을 사용해야 함.

4. 서버 컴포넌트 -> 클라이언트 컴포넌트로 직렬화 불가능한 Props 전달 금지

- 서버에서 클라이언트로 전달되는 Props는 반드시 직렬화 가능(serializable) 해야 함
- 객체, 배열, 문자열, 숫자 등은 직렬화가 가능하지만, 함수,클래스 인스턴스, React 요소(JSX) 등은 직렬화할 수 없음
- 직렬화 불가능한 데이터를 전달하면 렌더링 또는 빌드 에러 발생 가능

직렬화는 객체, 배열, 클래스 인스턴스 등의 복잡한 데이터를 문자열 등 단순한 형식으로 변환해 브라우저로 전송하는 과정이다.(`JSON.stringify()`를 통해 자바스크립트 객체를 문자열로 변환하는 것)

### 쿼리스트링

App Router에서는 URL의 쿼리스트링 값을 가져오기 위해 `useSearchParams` 훅을 사용해야 한다.
Page Router에서 `useRouter().query`를 사용하는 방식과는 다르다.

### 데이터 페칭

서버 컴포넌트 내부에서 `async/await`를 이용해 직접 데이터를 가져올 수 있다.
Page Router에서 사용하던 `getServerSideProps`, `getStaticProps` 등을 완전히 대체하는 방식이다.

### 데이터 캐싱

`fetch()` 메서드를 통해 가져온 데이터를 Next.js 서버가 자동으로 캐싱한다.
이를 통해 불필요한 중복 요청을 줄이고, 웹 서비스의 응답 속도와 성능을 크게 개선할 수 있다.

fetch 메서드

1. `{ cache: "force-cache" }`: 응답을 무조건 캐싱함(한 번 호출된 이후 동일 요청은 다시 실행되지 않음)
2. `{ cache: "no-store" }`: 캐싱을 하지 않음. 요청할 때 마다 항상 새로운 데이터를 가져옴(15버전부터 기본 값)
3. `{ next: { revalidate: n } }`: 특정 시간을 주기로 캐시를 업데이트 함, Page Router의 ISR 방식과 유사함
4. `{ next: { tags: ["a"] } }`: On-Demand Revalidation, 요청이 들어왔을 때 데이터를 최신화 함

### Request Memoization

"요청을 기억한다"라는 뜻으로, 서버 컴포넌트가 도입되면서 Next.js 내부에서 자동으로 동작하는 최적화 기법이다.

특징

- 하나의 페이지를 서버에서 랜더링하는 동안, 중복된 fetch 요청을 감지하고 캐싱하여 동일한 요청이 여러 번 실행되지 않도록 한다.
- 렌더링이 완료되면 캐시는 사라진다. 일시적인 메모리 기반이며, fetch 캐시(영구 저장)와는 다르다.
- 개발자가 별도로 설정할 필요 없이, Next.js가 자동으로 적용한다.

### 풀 라우터 캐시

풀 라우터 캐시는 Next.js App Router에서 도입된 개념으로, 서버가 페이지 전체의 렌더링 결과를 빌드 타입 또는 첫 요청시에 캐싱하여 재사용하는 기능이다. 기존의 정적 사이트(SSG) 방식과 유사하다.

적용 대상

- 정적 페이지(Static Page)에만 적용된다.
- 클라이언트가 동일한 페이지에 재접속할 경우, Next.js는 미리 캐싱된 HTML 결과를 그대로 반환한다.
- 서버 컴포넌트에만 적용되며, 클라이언트 컴포넌트에서는 사용되지 않음

### Static Page vs Dynamic Page 구분 기준

서버 컴포넌트에만 해당

1. Dynamic Page
   다음 조건 중 하나라도 해당되면, 해당 서버 컴포넌트 페이지는 Dynamic Page로 간주되며, 풀 라우터 캐시가 적용되지 않음

- 캐시되지 않는 데이터 요청 사용(`fetch()`에 cache: `'no-store'` 또는 `revalidate: 0` 사용)
- 동적 함수 사용(`headers()`, `cookies()`, `searchParams.get()`, `useSearchParams()` 등)
- `export const dynamic = 'force-dynamic'`를 명시적으로 선언한 경우
  이러한 페이지 요청이 들어올 때마다 서버에서 새로 렌더링되며, 캐싱되지 않는다.

2. Static Page

- 위 조건들에 해당하지 않으면, 해당 페이지는 기본적으로 Static Page로 간주된다.
- 풀 라우트 캐시가 자동 적용되어, 최초 생성된 HTML이 서버에 캐시되고 이후 요청에서는 이를 재사용한다.
- 특별한 설정 없이도 대부분의 서버 컴포넌트 페이지는 정적으로 처리된다.

### 라우트 세그먼트 옵션(`export const dynamic`)

특정 페이지의 캐싱 동작이나 정적/동적 처리 방식을 직접 명시적으로 제어할 수 있는 옵션을 제공한다.
Next.js가 자동으로 판단하는 동작을 개발자가 강제로 지정할 때 사용된다.

종류

- `'auto'`: 기본값. Next.js가 자동으로 정적/동적 여부를 판단
- `'force-dynamic'`: 해당 페이지를 강제로 Dynamic Page로 설정. 요청마다 새로 렌더링
- `'force-static'`: 해당 페이지를 강제로 Static Page로 설정. 동적인 값은 모두 `undefined` 처리 됨
- `'error'`: 해당 페이지를 강제로 Static Page로 설정. 동적 요소가 있으면 빌드 에러 발생(의도적으로 캐싱 안 되는 코드 방지용)

주의사항

- 서버 컴포넌트에만 적용됨
- 대부분의 경우, Next.js의 자동 분류에 맡기는 것이 가장 안전하고 효율적이다.
- `force-static`을 사용하는 경우, 동적인 데이터(쿼리스트링, 쿠키 등) 사용할 수 없다.

### 스트리밍

전체 페이지나 일부 컴포넌트의 렌더링이 지연될 경우, 준비된 콘텐츠부터 먼저 사용자에게 보여주는 방식이다. 이로써 사용자 경험이 개선되고, 느린 데이터 로딩에 의한 로딩 지연을 최소화할 수 있다.

1. 페이지 스트리밍
   페이지 단위의 스트리밍 렌더링은 서버 컴포넌트의 응답이 지연될 떄, `loading.tsx`를 먼저 렌더링하여 사용자가 기다리는 시간을 체감하지 않도록 도와준다.

특징

- `loading.tsx`는 해당 경로 뿐만 아니라 하위의 모든 비동기 페이지에도 적용됨
- 서버 컴포넌트가 `async`로 선언되어야 동작함
- 페이지 컴포넌트에서만 동작하며, 일반 컴포넌트에는 적용되지 않음
- 브라우저에서 쿼리스트링만 변경되는 경우에는 스트리밍이 발생하지 않음

2. 컴포넌트 스트리밍
   컴포넌트 단위의 스트리밍은 `React.Suspense`를 사용하여 개별 컴포넌트 단위로 지연 렌더링을 분리할 수 있다. `loading.tsx`보다 더 세밀하고 범용적인 제어가 가능하다.

### 에러 핸들링

에러 전용 컴포넌트를 만들어 페이지나 레이아웃에서 발생하는 오류를 처리할 수 있다.
기존의 try-catch나 글로벌 오류 처리 방식보다 더 구조화된 방식으로 각 경로별로 적용할 수 있다.

- `error.tsx` 파일을 생성하면, 해당 경로에서 발생한 렌더링 또는 서버 오류를 처리할 수 있다.
- `layout.tsx`와 유사하게, 상위 폴더의 `error.tsx`는 하위 모든 페이지에 적용된다.
- 특정 하위 경로에서만 별도로 에러 처리를 하고 싶다면, 해당 폴더에 `error.tsx`를 따로 만들면 된다.

### 서버 액션

브라우저에서 직접 호출할 수 있는 서버 측 비동기 함수다.
기존의 `API Route` 없이도 간단한 서버 작업 처리를 할 수 있어, UI와 로직을 하나로 통합할 수 있는 새로운 방식이다.

특징

- 서버에서만 실행되는 비동기 함수
- 브라우저는 해당 함수를 직접 실행할 수 없고, 요청만 전달할 수 있음
- 클라이언트에 노출되지 않아 보안성이 뛰어나며, 민감한 로직 처리에 적합
- `form` 요소와 결합하거나, 클라이언트 컴포넌트에서 호출 가능
