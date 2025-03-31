# 🧱 Daangn Clone - Backend (Node.js + Express)

당근마켓 클론 프로젝트의 백엔드입니다.

---

## 🚀 프로젝트 초기 세팅

```bash
mkdir backend
cd backend
npm init -y

npm install cors dotenv
npm install -D eslint prettier eslint-config-prettier
npm install -D typescript ts-node @types/node
npm install -D nodemon @types/express

# Prisma 설치 및 초기 실행
npm install @prisma/client
npx prisma init

# Prisma 마이그레이션 생성
npx prisma migrate dev --name init
# 마이그레이션 실행
npx prisma generate

```

## 개발 도구

```

코드 검사

npx eslint .

코드 자동 정리

npx prettier --write .
```
