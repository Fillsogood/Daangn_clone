# 🧱 Daangn Clone - Frontend (React)

## 🚀 프로젝트 세팅


```bash
# 필수 라이브러리 설치

# React 설치
npx create-react-app frontend
cd frontend

# axios 설치
npm install react-router-dom axios

#  개발 편의 도구 설치
npm install -D prettier eslint eslint-plugin-react eslint-config-prettier
```

## ESLint 설정 (.eslintrc.json) && Prettier 설정 (.prettierrc)

```json
// .eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier"
  ],
  "plugins": ["react"],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    "react/prop-types": "off",
    "no-unused-vars": "warn"
  }
}

// .prettierrc
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}

```

## 실행 명령어

```
코드 검사 (문법, 스타일)
npx eslint src/

코드 자동 정리
npx prettier --write src/
```