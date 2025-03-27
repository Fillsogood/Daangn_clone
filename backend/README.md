# 🧱 Daangn Clone - Backend (Node.js + Express)

당근마켓 클론 프로젝트의 백엔드입니다.

---

## 🚀 프로젝트 초기 세팅

```bash
mkdir backend
cd backend
npm init -y

npm install express cors dotenv
npm install -D nodemon

npm install -D eslint prettier eslint-config-prettier

npm install -D typescript ts-node @types/node
npm install -D nodemon @types/express
npm install express

npm install @prisma/client
npx prisma init
npx prisma generate

# Prisma 명령 실행 기능
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio

```

## 개발 도구
```

코드 검사

npx eslint .

코드 자동 정리

npx prettier --write .
```
