# 할일 리스트 (Todo List)

Next.js + localStorage 기반 할일 관리 웹앱

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| UI 라이브러리 | React 19 |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS 4 |
| 데이터 저장 | Web Storage API (localStorage) |
| 배포 | Vercel (GitHub 연동 자동 배포) |

## 구현 기능

- **할일 추가** — 입력창에 텍스트 입력 후 버튼 클릭 또는 Enter 키
- **완료 토글** — 체크박스 클릭으로 완료 / 미완료 전환
- **할일 삭제** — 항목 호버 시 나타나는 × 버튼으로 개별 삭제
- **필터링** — 전체 / 미완료 / 완료 탭으로 항목 분류
- **일괄 삭제** — 완료된 항목 전체 삭제
- **데이터 영속성** — localStorage에 자동 저장, 새로고침 후 복원

## 문제점 및 해결

### 1. 한글 입력 시 할일이 중복으로 추가되는 문제

**원인**  
한글, 일본어, 중국어 등 IME(입력기)를 사용하는 언어는 Enter 키를 눌렀을 때 이벤트가 두 번 발생한다.  
첫 번째는 IME가 조합 중인 글자를 확정할 때, 두 번째는 실제 폼 제출(submit) 시도 시다.  
기존 코드는 두 이벤트를 구분하지 못해 동일한 텍스트가 두 번 추가되었다.

**해결**  
`KeyboardEvent.nativeEvent.isComposing` 속성을 확인해 IME 조합 중에는 제출을 막는다.

```tsx
// 수정 전
onKeyDown={(e) => e.key === "Enter" && handleSubmit()}

// 수정 후
onKeyDown={(e) => {
  if (e.key === "Enter" && !e.nativeEvent.isComposing) handleSubmit();
}}
```

`isComposing`이 `true`인 동안은 IME가 문자를 조합 중이므로 Enter를 무시하고,  
조합이 완료된 후의 Enter에만 반응하도록 처리한다.

---

### 2. 로컬 빌드 오류 (Turbopack + 경로 내 `#` 문자)

**원인**  
프로젝트 경로(`todo_list-hw#11/`)에 `#` 문자가 포함되어 있어 Turbopack이 경로를 URL 프래그먼트로 잘못 해석해 null byte 오류를 발생시킨다.

**해결**  
로컬 개발 시에는 `npm run dev`(개발 서버)를 사용하고, 프로덕션 빌드는 Vercel의 클린 빌드 환경에서 실행한다. Vercel은 레포를 `/vercel/path0` 같은 특수문자 없는 경로에 클론하므로 정상 빌드된다.

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

## 배포

GitHub `main` 브랜치에 push하면 Vercel이 자동으로 빌드 및 배포합니다.
