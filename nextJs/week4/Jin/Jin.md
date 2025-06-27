# Next.js App Router

## ✅ 앱 라우터 개념

Next.js 13부터 도입된 **App Router**는 기존 Page Router의 기능을 확장하여, 폴더 기반의 파일 구조만으로 더욱 직관적인 라우팅과 서버 컴포넌트 기능을 지원한다.

### 📁 페이지 라우팅 설정

- `/` : `app/` 폴더 내에 **page.tsx** 파일 작성 → 루트 경로로 설정됨
- `/search` : `app/search/page.tsx` 생성 → `/search` 경로로 라우팅
- `/book/1` : `app/book/[id]/page.tsx` 생성 → 동적 라우팅 설정, URL 파라미터 사용 가능

### 🔍 URL 쿼리 & 파라미터 받아오기

#### ✔️ 쿼리 파라미터 (`searchParams`)

```tsx
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  // ...
}
```

#### ✔️ URL 파라미터 (`params`)

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // ...
}
```

### 🗂 Layout.tsx

- 현재 폴더 및 **하위 폴더**에 적용되는 공통 레이아웃 파일
- 중첩 사용 가능하여 레이아웃을 계층적으로 구성할 수 있음

### 📦 Route Group

- `()`로 감싸진 폴더명 → **URL 경로에는 나타나지 않음**
- 예) 특정 layout만 적용하거나 그룹핑할 때 활용

## ⚡️ React Server Component

![server](https://github.com/user-attachments/assets/506859a9-c4e1-48d3-9fae-9709e532aa08)

### ✔️ 개념

- **상호작용이 필요 없는 컴포넌트**를 서버에서 렌더링하는 방식
- 서버 측에서 사전 렌더링을 진행하므로, 클라이언트 번들(JS Bundle)에는 포함되지 않아 성능 최적화 가능

### ✔️ 작동 원리

- 서버 컴포넌트: 사전 렌더링 시 한 번만 실행
- 클라이언트 컴포넌트: 서버 + 클라이언트 모두에서 실행되어 hydration이 필요함
- 기본적으로 App Router의 컴포넌트는 **Server Component**로 설정됨

#### 클라이언트 컴포넌트로 전환하기

```tsx
"use client";
```

- 파일 최상단에 선언하면 클라이언트 컴포넌트로 동작

### ⚠️ React Server Component 주의사항

1. 서버 컴포넌트에는 **브라우저에서 실행되는 코드** 포함 불가
2. 클라이언트 컴포넌트는 서버와 클라이언트 모두에서 실행됨
3. 클라이언트 컴포넌트 → 서버 컴포넌트 import 불가 (반대는 가능)
4. 서버 컴포넌트 → 클라이언트 컴포넌트로 **함수 props 전달 불가** (직렬화 불가능)

## 🚀 네비게이션과 fetch 옵션

### ✔️ useRouter & useSearchParams

- **next/navigation**에서 import
- App Router 전용 훅

### ✔️ .env 변수 사용

- 클라이언트 컴포넌트 내에서 사용 시, 변수명 앞에 **NEXT_PUBLIC\_** prefix 필요

### ✔️ fetch 옵션

| 옵션                          | 설명                                             |
| ----------------------------- | ------------------------------------------------ |
| `{ cache: "force-cache" }`    | 요청 결과를 무조건 캐싱, 이후 다시 호출되지 않음 |
| `{ cache: "no-store" }`       | 캐싱 없이 매번 새로 요청 (**기본값**)            |
| `{ next: { revalidate: n } }` | n초 뒤 캐시 무효화 후 재요청 (ISR 방식)          |
| `{ next: { tags: ["a"] } }`   | On-Demand Revalidate 시 데이터 최신화            |

### 🧠 Request Memoization

- 렌더링 중 **같은 요청**이 여러 번 발생하면 결과를 메모이제이션하여 중복 요청 방지
- 렌더링이 끝나면 메모이제이션도 소멸됨

## 🗃 Full Route Cache (SSG와 유사)

### ✔️ 개념

- 빌드 타임에 페이지를 정적으로 생성하여 캐시에 저장
- 요청이 들어오면 캐시에서 바로 렌더링 (빠른 응답 속도)
- `revalidate: n` 옵션이 있으면 n초 후 캐시 무효화 (ISR 방식)

### ✔️ 페이지 유형

| 유형             | 설명                                                        |
| ---------------- | ----------------------------------------------------------- |
| **Dynamic Page** | 데이터가 매번 변하거나 cache: "no-store" 옵션을 가진 페이지 |
| **Static Page**  | Dynamic Page가 아닌 정적 페이지                             |

![page](https://github.com/user-attachments/assets/6226f1a4-34d1-491e-9999-a7e519ca5faf)


### ⏳ Suspense로 클라이언트 컴포넌트 사전 렌더링 배제하기

```tsx
<Suspense fallback={<div>loading...</div>}>
  <ClientComponent />
</Suspense>
```

### 🛠 generateStaticParams()

- 동적 페이지를 빌드 타임에 생성할 때 사용
- 적용된 값 이외의 경우는 없다고 가정하려면:

```tsx
export const dynamicParams = false;
```

### ✅ 요약

- App Router는 **폴더 기반의 직관적인 라우팅 + Server Component 중심 렌더링**
- 클라이언트 컴포넌트는 꼭 필요한 상호작용 부분에만 최소화하여 사용하기
- fetch, caching, 네비게이션 훅의 동작 방식을 정확히 이해해두자!
