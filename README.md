# Jest 설치 & 간단 설명

> 출처 : https://www.daleseo.com/jest-basic/

## 설치 & 라이브러리

### 프로젝트 생성

```shell
$ npm init -y
$ npm i -D jest @types/jest
```

`@types/jest` 는 jest 관련해서, Vscode에서 자동완성을 도와준다.

## test 스크립트 수정

`package.json` 에 test 스크립트를 아래와 같이 수정.

```json
"scripts": {
  "test": "jest"
},
```

<br/>

## 감시 모드

감시 모드를 사용하면, 저장 즉시 test가 돌아감.

```shell
$ npm test -- --watch
```

# Reference

Gitbook : https://mulder21c.github.io/jest/docs/en/next/getting-started
