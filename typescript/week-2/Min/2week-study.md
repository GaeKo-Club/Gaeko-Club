# 스터디 2주차 발표 자료

## Tailwind CSS란 무엇인가?

Tailwind CSS는 기존 CSS 프레임워크의 한계를 극복하기 위해 등장한 유틸리티-퍼스트(Utility-First) 방식의 CSS 프레임워크이다.
사전 정의된 컴포넌트를 사용하는 방식이 아니라, 다양한 유틸리티 클래스들을 조합하여 사용자가 원하는 스타일을 빠르게 구성할 수 있도록 설계되었다.

이 프레임워크는 2017년, 부트스트랩(Bootstrap) 등 기존 프레임워크들이 가진 커스터마이징의 어려움과 디자인의 제한성을 해결하고자 처음 개발되었다.
기존 프레임워크는 미리 정해진 UI 컴포넌트를 빠르게 사용할 수 있는 장점이 있지만, 반대로 특정 스타일 틀에서 벗어나기 어렵고, 자유로운 디자인 적용이 제한되는 단점이 있다.

Tailwind CSS는 이러한 문제를 유틸리티-퍼스트 접근 방식으로 해결한다.
각 유틸리티 클래스는 하나의 CSS 속성만을 담당하며, 이를 HTML 내에서 조합함으로써 더 빠른 프로토타입핑과 높은 디자인 자유도, 세밀한 커스터마이징을 가능하게한다.

예를 들어, `bg-blue-500`, `text-white`, `p-4` 등의 클래스를 조합해 원하는 스타일을 직접 정의할 수 있다.
이러한 방식은 스타일을 코드 가까이에서 다루게 해 주며, 팀 내에서 일관된 디자인 시스템을 구성하는데 유리하다.

### Tailwind CSS 주요 특징

1. 유틸리티-퍼스트(Utility-First)

- 각각의 클래스가 단일 스타일 속성만 담당
- 예: `p-4(padding)`, `bg-blue-500`(background, 배경색), `text-white`(color, 글자색)
- 클래스를 조합해 원하는 디자인을 직접 구성

2. 빠른 스타일링과 프로토타이핑

- 별도의 CSS 파일 없이 HTML에 직접 스타일 적용
- 초기 UI 구성 속도가 빠르고, 코드 작성량도 줄어듦

3. 높은 커스터마이징

- `tailwind.config.js`를 통해 색상, 폰트, 간격 등 자유롭게 설정
- 디자인 시스템을 프로젝트에 맞게 구축 가능

4. 반응형 디자인 기본 지원

- `sm:`, `md:`, `lg:`, `xl:` 같은 접두사를 활용해 모바일 우선 반응형 구현 가능
- 예: `md:text-xl` -> 중간 크기 이상일 때 글자 크기 적용

5. 상태 기반 스타일링

- `hover:`, `focus:`, `disabled:`, `dark:` 등으로 상태별 스타일 적용 가능
- 예: `hover:bg-blue-700` -> 마우스 올릴 때 배경색 변경

6. JIT 모드 지원(Just-IN-Time Compiler)

- 사용된 클래스만 실시간으로 생성 -> 빌드 속도 개선, 번들 크기 최소화
- 미사용 클래스가 포함되지 않으므로 퍼포먼스 우수

7. 프레임워크 친화성

- React, Vue, Next.js, Svelte 등과 자연스럽게 통합 가능
- 컴포넌트 기반 개발과 잘 어울림

### Tailwind CSS 장점

1. 스타일 작성 시간 절약

- 유틸리티 클래스를 조합하여 CSS 없이 빠르게 UI 구현 가능
- CSS 클래스 네이밍이나 중복 정의로 인한 고민이 줄어듦

2. 높은 디자인 자유도

- 미리 정의된 컴포넌트에 얽매이지 않고 원하는 형태로 직접 설계 가능
- 세밀한 커스터마이징 가능(`tailwind.config.js` 활용)

3. 반응형 디자인 구현이 쉬움

- `sm:`, `md:`, `lg:` 등 반응형 프리픽스가 내장되어 있어, 다양한 디바이스 대응이 간편

4. 상태 기반 스타일링이 직관적

- `hover:`, `focus:`, `dark:` 등으로 다양한 상호작용 상태에 맞춘 스타일을 간편하게 처리

5. 우수한 성능(JIT 컴파일러)

- 실제 사용한 클래스만 실시간 생성되어 빌드 속도 향상 및 CSS 파일 크기 최소화
- 퍼포먼스와 유지보수 효율이 높음

6. 프론트엔드 프레임워크와 높은 호환성

- React, Vue, Next.js, Svelte 등과 자연스럽게 통합
- 컴포넌트 기반 개발 방식과 잘 어울리며 생산성 향상

7. 확장성 및 재사용성 우수

- 반복되는 클래스 조합은 추상화 가능(@apply, 컴포넌트화 등)
- 팀 단위 디자인 시스템 구축에 유리

### Tailwind CSS 단점

1. 클래스 네이밍의 가독성 저하

- Tailwind CSS는 HTML 요소에 다수의 유틸리티 클래스를 직접 작성해야 하므로, 코드가 길어지고 가독성이 떨어질 수 있다.

```tsx
<div class="bg-white p-4 rounded shadow-md hover:bg-gray-100 transition duration-300">
  ...
</div>
```

이러한 방식은 특히 대규모 프로젝트에서 유지보수를 어렵게 만들 수 있다.

2. 스타일 재사용의 어려움

- Tailwind CSS는 기본적으로 유틸리티 클래스를 직접 조합하는 방식이므로, 동일한 스타일을 여러 곳에서 사용할 경우 중복 코드가 발생할 수 있다. 이를 해결하기 위해 `@apply` 지시어를 사용하거나 컴포넌트화하는 방법이 있지만, 추가적인 설정과 관리가 필요하다.

3. 초기 CSS 파일 크기 증가

- Tailwind CSS는 모든 가능한 유틸리티 클래스를 미리 생성하므로, 초기 CSS 파일의 크기가 상당히 클 수 있다.
  이로 인해 로딩 속도에 영향을 줄 수 있으며, 이를 해결하기 위해 PurgeCSS와 같은 도구를 사용하여 사용하지 않는 클래스를 제거해야 한다.

4. 기존 CSS 개념과의 충돌

- Tailwind CSS는 전통적인 CSS의 계층적 구조와는 다른 접근 방식을 취한다. 이로 인해 기존 CSS 방법론(BEM, OOCSS 등)에 익숙한 개발자들에게는 학습 곡선이 있을 수 있다.

5. 특정 기능의 제한

- Tailwind CSS는 모든 CSS 기능을 지원하지 않을 수 있으며, 특정 상황에서는 커스터마이징이 필요하다.
- 예를 들어:
  - `hover:`나 `focus:`와 같은 상태 기반 클래스는 일부 속성에만 적용된다.
  - JIT(Just-In-Time) 모드에서는 정규 표현식을 사용한 safelist가 지원되지 않는다.

### Vite에서 Tailwind CSS 설치 및 적용 방법

1. Tailwind CSS 설치

```bash
npm install tailwindcss @tailwindcss/vite
```

2. Vite 플러그인 구성

```bash
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

3. Tailwind CSS 가져오기

```css
@import "tailwindcss";
```

index.css나 글로벌 css에 작성하기

4. main.jsx에 적용하기

```jsx
import "./index.css";
```

### Next에서 Tailwind CSS 설치 및 적용 방법

1. Tailwind CSS 설치

```bash
npm install tailwindcss @tailwindcss/postcss postcss
```

2. PostCSS 플러그인 구성

```bash
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

3. Tailwind CSS 가져오기

```css
@import "tailwindcss";
```

index.css나 글로벌 css에 작성하기

이런 방식으로 Vite 또는 Next에서 설치 및 적용을 할 수 있다.

### 자주 사용되는 클래스들

1. 레이아웃(Layout)

- `container`: 반응형 컨테이너를 설정
  `<div className ="container mx-auto">`

- `mx-auto`: 수평 중앙 정렬
  `<div className = "mx-auto">`

- `flex`: Flexbox 컨테이너 생성
  `<div className = "flex">`

- `grid`: 그리드 레이아웃 설정
  `<div className = "grid grid-cols-3 gap-4">`

- `space-x-*`: 자식 요소 간의 가로 간격 설정(수평)
  `<div className = "space-x-4">`

- `space-y-*`: 자식 요소 간의 세로 간격 설정(수직)
  `<div className = "space-y-4">`

2. 정렬(Alignment)

- `text-center`: 텍스트를 중앙 정렬
  `<p className = "text-center">`

- `items-center`: Flexbox 또는 Grid에서 요소를 수직 중앙 정렬
  `<div className = "flex items-center">`

- `justify-center`: Flexbox 또는 Grid에서 요소를 수평 중앙 정렬
  `<div className = "flex justify-center">`

3. 간격(Spacing)

- `p-*`: 전체 패딩 적용
  `<div className = "p-4">`

- `px-*`: 좌우 패딩 적용
  `<div className = "px-4">`

- `py-*`: 상하 패딩 적용
  `<div className = "py-4">`

- `m-*`: 전체 마진 적용
  `<div className = "m-4">`

- `mx-*`: 좌우 마진 적용
  `<div className = "mx-4">`

- `my-*`: 상하 마진 적용
  `<div className = "my-4">`

4. 크기(Sizing)

- `w-*`: 너비 설정
  `<div className = "w-64">` // w-1 = 4px 0.25rem, w-4 = 16px 1rem 사이즈 값

- `h-*`: 높이 설정
  `<div className = "h-32">` // 높이도 너비와 값이 같음

- `max-w-*`: 최대 너비 설정
  `<div className = "max-w-7xl">` // 7xl = 80rem = 1280px

- `max-h-*`: 최대 높이 설정
  `<div className = "max-h-96">`

- `min-w-*`: 최소 너비 설정
  `<div className = "min-w-full">` // full = 100%

- `min-h-*`: 최소 높이 설정
  `<div className = "min-h-screen">` // screen = 100vh

5. 색상(Colors)

- `bg-*`: 배경 색상 설정
  `<div className = "bg-blue-500">`

- `text-*`: 텍스트 색상 설정
  `<p className = "text-gray-700">`

- `border-*`: 테두리 색상 설정
  `<div className = "border border-red-500">` // border = solid 1px 기본값

- `hover:*`: 마우스 오버 시 스타일 변경
  `<button className = "bg-blue-500 hover:bg-blue-700">`

6. 테두리(Border)

- `border`: 기본 테두리 설정
  `<div className = "border">`

- `border-*`: 특정 방향의 테두리 설정

  - 예: border-t, border-b, border-l, border-r
    - t: top
    - b: bottom
    - l: left
    - r: right
      `<div className = "border-t border-blue-500">`

- `rounded`: 테두리 반경 설정(둥글게)
  `<div className = "rounded-lg">`

7. 그림자(Shadows)

- `shadow`: 기본 그림자 효과
  `<div className = "shadow">`

- `shadow-md`: 중간 크기 그림자
  `<div className = "shadow-md">`

- `shadow-lg`: 큰 그림자
  `<div className = "shadow-lg">`

8. 반응형 디자인(Breakpoints)

- `sm`, `md`, `lg`, `xl`, `2xl` 속성들을 사용하여 특정 화면 크기 이상에서만 적용될 스타일을 설정할 수 있다.
  - `sm`: 작은 화면(모바일), 640px
  - `md`: 중간 크기 화면(태블릿), 768px
  - `lg`: 큰 화면, 1024px
  - `xl`: 더 큰 화면, 1280px
  - `2xl`: 초대형 화면, 1536px
    `<div className = "sm:bg-red-500 md:bg-green-500 lg:bg-blue-500">`

9. 타이포그래피(Typography)

- `text-*`: 텍스트 크기 설정
  `<p className = "text-lg">`

- `font-bold`: 텍스트를 굵게 설정
  `<p className = "font-bold">`

- `tracking-*`: 문자 간격 설정
  `<p className = "tracking-wider">` // wider = 0.05rem 넓게

- `leading-*`: 줄 간격 설정
  `<p className = "leading-relaxed">` // relaxed = line-height 1.625

10. 디스플레이(Display)

- `block`: 블록 요소 설정
  `<div className = "block">`

- `inline-block`: 인라인 블록 요소 설정
  `<span className = "inline-block">`

- `hidden`: 요소 숨기기
  `<div className = "hidden">`

- `flex`: Flexbox 설정
  `<div className = "flex">`

- `grid`: 그리드 레이아웃 설정
  `<div className = "grid">`

11. 기타 유용한 클래스들

- `opacity-*`: 불투명도 설정
  `<div className = "opacity-75">`

- `z-*`: z-index 설정
  `<div className = "z-10">`

- `cursor-pointer`: 마우스 커서를 포인터로 변경
  `<div className = "cursor-pointer">`

- `overflow-*`: 요소의 넘침 처리 설정(예: `overflow-hidden`, `overflow-auto`)
  `<div className = "overflow-hidden">`

## shadcn/ui란?

shadcn/ui는 Radix UI와 Tailwind CSS 기반으로 구성된 오픈 소스 UI 컴포넌트 컬렉션이다.
단순한 '라이브러리'라기보다는, 미리 설계된 UI 컴포넌트를 직접 복사해 사용하고 수정하는 방식을 제공한다.

즉, 패키지를 설치해서 쓰는 방식이 아닌, 컴포넌트를 내 프로젝트에 복사해 직접 소유하고 사용하는 UI 시스템이다.

### shadcn/ui 특징

1. 직관적인 사용: CLI 기반으로 컴포넌트를 가져와 바로 사용 가능

2. 강력한 커스터마이징: 모든 코드가 직접 수정 가능, 완전한 통제권 제공

3. 성능 최적화: Radix의 접근성 + 경량 Tailwind 기반으로 설계

4. 다양한 컴포넌트: 버튼, 모달, 폼, 다이얼로그, 토스트 등 즉시 사용 가능한 구성 요소 제공

5. 유틸리티 기반 설계: 내부적으로 `tailwind-merge`, `clsx`, `cva`로 확장성과 예측성 확보

6. 성장하는 컴뮤니티: GitHub/star 수 지속 증가 중, 빠른 업데이트와 문서 개선 진행 중

### Next에서 shadcn/ui 적용하기

1. 프로젝트 준비

```bash
npx shadcn@latest init
```

Next.js와 Tailwind 설정이 자동으로 감지된다.

2. 컴포넌트 추가

```bash
npx shadcn@latest add button
```

Button 컴포넌트가 components/ui/button.tsx로 프로젝트에 추가됩니다.

3. 사용하기

공식 사이트에서 필요한 컴포넌트를 CLI로 추가하거나,
코드를 복사해서 직접 프로젝트에 붙여넣어 사용할 수 있다.

### Vite에서 shadcn/ui 적용하기

1. 프로젝트 생성

```bash
npm create vite@latest
```

템플릿은 React + TypeScript 선택

2. Tailwind CSS 설치

```bash
npm install tailwindcss @tailwindcss/vite
```

다음 `src/index.css`에 작성:

```css
@import "tailwindcss";
```

3. `tsconfig.json` 수정(경로 별칭 설정)

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

4. `tsconfig.app.json`도 동일하게 수정

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

5. `vite.config.ts` 설정

먼저 타입 설치

```bash
npm install -D @types/node
```

그 다음 `vite.config.ts` 설정

```ts
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

6. shadcn-ui 초기화(CLI 실행)

```bash
npx shadcn@latest init
```

- base color 선택 (예: Neutral, Slate 등)
- 내부적으로 `components.json` 파일이 생성됩니다.

7. 컴포넌트 추가

```bash
npx shadcn@latest add button
```

`components/ui/button.tsx`가 생성됩니다.

8. 사용 예시(`src/App.tsx`)

```tsx
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Button>Click me</Button>
    </div>
  );
}

export default App;
```
