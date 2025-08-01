# 스터디 5주차 발표 자료

## 배포란 무엇인가?

배포는 개발자가 만든 웹 애플리케이션이나 소프트웨어를 실제 사용자들이 접근하고 사용할 수 있도록 서버에 올리는 과정을 의미한다. 개발 환경에서 잘 작동하는 코드를 실제 환경에서도 문제없이 작동하도록 만들고, 사용자들이 웹 브라우저나 애플리케이션을 통해 서비스를 이용할 수 있게 하는 마지막 단계라고 할 수 있다.

## 배포가 필요한 이유

1. 사용자 접근

- 로컬에서만 실행되는 앱은 사용자가 접근 불가
- 서버에 배포해야 URL로 접근 가능

2. 안정적인 서비스 제공

- 운영 환경은 여러 사용 트래픽을 감당해야 함
- 서버 구성, 오류 핸들링 등 안정적인 서비스 필수

3. 지속적인 관리와 업데이트

- 단순히 올리는 것뿐 아니라, 오류 수정, 기능 개선 등도 포함
- CI/CD 도구를 통해 지속적인 배포(Continuous Deployment) 가능

4. 테스트 환경 구축

- 실제 운영 환경과 유사한 조건에서 테스트 가능
- 배포 전 사전 문제 파악 및 품질 보증

## 배포 과정

배포는 단순히 코드를 올리는 작업이 아니라, 서버 구성 -> 코드 업로드 -> 실행 및 유지보수까지 포함하는 전체 과정이다.

### 1. 서버 선택

웹 애플리케이션을 사용자에게 제공하려면, 먼저 코드를 실행시킬 서버가 필요하다.

1. 클라우드 서비스
   인터넷 상에서 서버, 스토리지, 네트워크 등 인프라를 빌려 사용하는 서비스

- 대표 서비스: AWS(Amazon Web Services), Google Cloud Platform, Microsoft Azure
- 사용자는 직접 물리 장비를 구매하지 않아도 되고, 필요에 따라 서버를 생성하거나 삭제할 수 있음
- 확장성/자동화 기능이 뛰어나며, 전 세계 데이터 센터 기반으로 안정적인 서비스 제공 가능

장점

- 높은 확장성, 글로벌 서비스 대응
- 다양한 기능 제공(DB, 모니터링, 인증 등)
- 자동 백업/보안 옵션 탑재

단점

- 초보자에겐 진입 장벽이 높음(설정 많고 복잡함)
- 사용량 기반 요금으로 관리 필요

2. 호스팅 서비스
   서버 인프라를 직접 다루지 않고도 손쉽게 배포할 수 있는 서비스

- 대표 서비스: Vercel, Netlify, Heroku, Render
- 프론트엔드나 정적 웹사이트 배포에 최적화
- GitHub와 연동 -> 코드 push만으로 자동 배포
- 서버 설정, 빌드, 배포 등을 UI에서 클릭 몇 번으로 해결

장점

- 설정이 매우 간단함(Zero Config)
- CI/CD 자동 지원, Preview URL 제공
- 무료 요금제 존재(소규모 프로젝트에 적합)

단점

- 서버 커스터마이징 제한
- 트래픽 증가 시 요금 증가
- 복잡한 백엔드/DB 연동에는 부적합

3. 자체 서버
   물리적인 서버를 직접 구입하거나 클라우드에서 가상 서버(VM)를 생성하여 운영

- Ubuntu, CentOS 같은 리눅스 기반 OS 설치
- Node.js, Nginx, 데이터베이스 등을 직접 설치하고 운영
- AWS EC2, DigitalOcean Droplet도 해당 방식으로 사용 가능

장점

- 완전한 제어권(설정, 리소스 배분 등 모두 자유로움)
- 고급 커스터마이징 가능

단점

- 모든 설정을 직접 해야 하므로 복잡하고 유지보수 필요
- 보안 관리, 업데이트도 개발자 책임

### 2. 서버 설정

서버 설정은 웹 애플리케이션이 실제 환경에서 실행될 수 있도록 준비하는 과정이다.
특히 AWS EC2 같은 직접 서버를 사용하는 경우, 이 과정은 대부분 수동으로 설정해야 하며, 서비스의 안정성과 보안을 위해 매우 중요하다.

1. 런타임 환경 설치
   먼저, 애플리케이션이 작동하기 위해 필요한 프로그래밍 언어 실행 환경(런타임)을 설치해야 한다.

- Node.js는 React, Next.js 같은 프론트엔드 프레임워크를 실행할 때 사용
- Python은 Django나 Flask
- java는 Spring Boot 같은 백엔드 프레임워크에서 사용된다.

Ubuntu 리눅스 서버에서는 아래와 같이 명령어를 통해 설치할 수 있다.

```bash
# Node.js 설치 방법
sudo apt update
sudo apt install nodejs
node -v
sudo apt install npm
```

2. 웹 서버 소프트웨어 구성
   웹 브라우저의 요청을 처리하고, 정적 파일 또는 백엔드 API를 전달하려면 웹 서버가 필요하다.
   직접 서버(AWS EC2 등)를 구성할 경우, 웹 서버 소프트웨어를 설치하고 설정해야한다.

대표적인 웹 서버

- Nginx: 빠르고 가벼운 웹 서버. 리버스 프록시나 정적 파일 서빙에 많이 사용된다.
- Apache: 오랜 역사를 가진 웹 서버로, 유연한 설정이 가능하지만 상대적으로 무겁다.

웹 서버 사용 이유

- 정적 파일(html, js, css 등) 제공
- 포트 변경: 예릍 들어 애플리케이션이 3000번 포트에서 실행되더라도, 사용자가 접근할 때는 80번 포트를 통해 접속할 수 있도록 중계
- HTTPS 설정: SSL 인증서를 적용하여 보안 연결을 지원

설치 방법

```bash
# Nginx 설치
sudo apt install nginx
# Apache 설치
sudo apt install apache2
```

3. 데이터베이스(DB) 설정
   웹 애플리케이션은 단순한 정적 화면뿐 아니라, 사용자 정보, 게시글, 주문 내역 등 데이터를 저장하고 불러오는 기능이 필요하다.
   이를 위해 데이터베이스가 반드시 필요하며, 서버 환경에 따라 직접 설치 및 초기화 작업을 수행해야 한다.

데이터베이스 종류

1. 관계형 데이터베이스(RDBMS)
   데이터를 표 형태(행, 열)로 저장하며, SQL 언어로 조작
   대표적으로 MySQL, PostgreSQL이 있음

2. 비관계형 데이터베이스(NoSQL)
   정해진 스키마 없이 자유롭게 저장 가능. 대규모 데이터 처리에 유리
   대표적으로 MongoDB (문서 기반), Redis (키-값 캐시형)이 있음

DB 설정 순서

1. DB 설치
   서버에 직접 데이터베이스 소프트웨어를 설치한다.

```bash
# MySQL 설치 예시 (Ubuntu 기준)
sudo apt update
sudo apt install mysql-server

# PostgreSQL 설치 예시
sudo apt install postgresql postgresql-contrib
```

2. DB 실행 및 보안 설정

- DB 서버 시작
- 초기 보안 구성(`mysql_secure_installation` 등)
- 외부 접근 허용 여부 설정(필요 시)

3. 사용자 및 데이터베이스 생성

- 새 프로젝트에 맞는 DB와 사용자 계정을 생성

```sql
CREATE DATABASE myapp_db;
CREATE USER 'myuser'@'%' IDENTIFIED BY 'mypassword';
GRANT ALL PRIVILEGES ON myapp_db.* TO 'myuser'@'%';
```

4. ORM 및 마이그레이션 도구 설정
   애플리케이션 코드에서는 ORM(Object-Relational Mapping) 도구를 사용해 DB와 연결하고, 테이블 구조를 정의한다.

대표 ORM 도구

- Prisma(TypeScript/Node.js)
- Sequelize (Node.js)
- TypeORM (NestJS)
- Django ORM, SQLAlchemy 등

마이그레이션은 DB에 실제 테이블을 생성하거나 변경하는 작업을 말함(코드 → DB 반영)

```bash
# Prisma 예시
npx prisma migrate dev

# Sequelize 예시
npx sequelize-cli db:migrate
```

AWS RDS, Supabase, PlanetScale 같은 클라우드 기반 데이터베이스를 사용할 수도 있다. 이 경우는 서버에 직접 DB를 설치할 필요 없이, DB 연결 문자열만 설정하면 바로 사용 가능

4. 포트 설정 및 보안 구성
   웹 애플리케이션을 서버에 배포한 뒤, 사용자가 외부에서 웹 브라우저를 통해 접근할 수 있도록 하려면, 포트를 열고 보안 연결을 적용하는 작업이 필요하다.
   이 과정은 AWS EC2, 자체 서버와 같은 리눅스 기반 환경에서 직접 서버를 운영할 때 수행해야 한다.

기본 웹 포트

- HTTP(비보안 통신) -> 포트 80
- HTTPS(보안 통신) -> 포트 443
  브라우저가 이 두 포트를 통해 서버에 접속하므로, 해당 포트를 열어야 외부 접속이 가능

방화벽 설정
리눅스 서버는 기본적으로 방화벽을 통해 외부 접근을 차단하고 있다.
따라서, 웹 서비스를 열기 위해서는 필요한 포트를 명시적으로 허용해야 한다.(sudo ufw allow 80 등)

SSL 인증서 설정(HTTPS 적용)
웹사이트의 보안을 위해 HTTPS(보안 통신)를 적용하려면 SSL 인증서가 필요하다.
가장 널리 사용되는 무료 SSL 인증서 제공 서비스는 Let’s Encrypt이다.

certbot이라는 도구를 사용해 Nginx 또는 Apache와 연동하면 손쉽게 HTTPS를 적용 가능
인증서 발급 이후에는 certbot이 자동 갱신까지 수행하므로, 장기적으로도 안전하게 HTTPS를 유지할 수 있다.

호스팅 서비스(Vercel, Netlify 등)를 사용하는 경우
Vercel, Netlify, GitHub Pages와 같은 호스팅 플랫폼을 사용하면, 복잡한 서버 설정 과정을 대부분 자동화된 방식으로 처리할 수 있다.

- GitHub 저장소를 연동하면, 프레임워크를 자동으로 감지하고 빌드 및 배포를 수행한다.
- HTTPS 설정도 자동으로 적용되며, 별도의 포트 설정, SSL 인증서 발급, 서버 구성 등을 직접 수행할 필요가 없다.

### 3. 코드 배포

코드 배포는 개발자가 작성한 애플리케이션 코드를 서버 또는 배포 플랫폼에 업로드하여 실행 가능한 상태로 만드는 과정이다.
프론트엔드 프로젝트에서는 이 과정을 통해 사용자가 실제 웹사이트에 접근할 수 있게된다.
배포 방식은 프로젝트 규모나 인프라 구성에 따라 여러 가지가 있으며, 대표적으로 다음 세 가지가 많이 사용된다.

1. Git 기반 배포
   GitHub, GitLab, Bitbucket과 같은 Git 저장소에 코드를 push하면 자동으로 배포가 이루어지는 방식이다.

- Vercel, Netlify, GitHub Pages 등 대부분의 호스팅 플랫폼이 이 방식을 지원한다.
- 저장소와 연동해두면 브랜치 변경이나 커밋이 감지될 때마다 자동으로 빌드 & 배포가 진행된다.
- 코드만 관리하면 배포는 자동으로 되므로, 실무에서 가장 널리 사용된다.

장점

- 배포 실수 방지(자동화됨)
- 빠른 피드백과 실시간 반영
- 협업에도 적합(PR -> Preview 확인 등)

단점

- 실수로 인한 불필요한 배포 발생(사소한 커밋(push)도 배포로 이어져 서버 리소스 낭비 우려)
- 빌드 실패 시 디버깅 어려움
- 보안 설정 관리 제한(환경 변수 설정은 가능하지만, 민감한 정보는 별도 주의 필요)

2. FTP / SFTP 수동 배포
   파일질라(FileZilla)와 같은 클라이언트를 사용해, 서버에 직접 접속하여 HTML, CSS, JS 파일을 올리는 방식이다.

- 과거에 많이 쓰였고 지금도 간단한 정적 사이트 배포에서는 여전히 사용되기도 한다.
- build 디렉토리 또는 index.html, bundle.js 같은 파일들을 서버의 /var/www/html 같은 경로에 업로드한다.

장점

- 설정이 간단하고 별도 자동화 도구 없이도 가능

단점

- 변경 시마다 매번 수동 업로드 필요 -> 실수 발생 가능성 높음
- 자동화, 협업에 부적합
- 규모가 커질수록 유지가 어려움

3. CI/CD 도구를 이용한 자동화 배포
   CI/CD 도구(GitHub Actions, GitLab CI, Jenkins 등)를 통해 테스트 -> 빌드 -> 배포 전 과정을 자동화하는 방식이다.

- 대규모 프로젝트나 팀 단위 협업에 적합하며, 안정성과 일관성을 유지하기 위한 필수적인 방식으로 자리잡고 있다.
- GitHub에 코드가 push되면 CI/CD 파이프라인이 자동으로 실행되어, 테스트 -> 빌드 -> 배포까지 처리된다.

장점

- 반복 작업 자동화 -> 개발 생산성 향상
- 테스트 실패 시 배포 차단 가능 -> 안정성 보장
- 코드 품질 관리에 유리

단점

- 초기 설정이 복잡(.yml 설정 파일 작성 필요, 툴에 대한 기본 개념 학습 필요)
- 빌드 시간 + 리소스 비용(실행 환경이 많아질수록 빌드 시간 증가)

### 4. 애플리케이션 실행

서버 설정과 코드 배포가 완료되었다면, 이제 실제로 애플리케이션을 실행시켜 외부 사용자들이 접근할 수 있도록 해야 한다.

1. 백엔드 서버 구동
   백엔드 서버가 있는 경우, 서버 애플리케이션을 실행시켜야 한다. 사용 중인 런타임에 따라 실행 방식이 달라진다.

- Node.js -> `node app.js`
- PM2 사용(프로세스 관리 도구) -> `pm2 start app.js` 서버가 중단되지 않도록 백그라운드 실행, 재시작 자동화 등을 제공
- Docker -> `docker run -p 3000:3000 my-app-image` 컨테이너 기반으로 실행 환경을 격리할 수 있어 유용

2. 프론트엔드 빌드
   React, Next.js, Vue 등 프론트엔드 프레임워크는 일반적으로 개발 모드와 배포 모드를 구분한다.
   배포 전에는 정적 파일로 빌드하는 과정이 필요하다.

- React/Vite 등 일반 SPA -> `npm run build` `dist/` 또는 `build` 폴더가 생성됨
- Next.js(SSR 포함) -> `npm run build -> npm run start` Next.js는 SSR을 지원하므로, 빌드 후 서버 실행도 필요할 수 있음

3. 정적 파일 호스팅
   프론트엔드가 정적 웹사이트(SPA) 형태일 경우, 빌드된 정적 파일을 웹 서버에 배치해야 한다.

- Nginx에 정적 파일 연결

```nginx
server {
  listen 80;
  server_name example.com;

  location / {
    root /var/www/my-app/build;
    index index.html;
  }
}
```

- S3에 업로드(정적 웹 호스팅)
  `aws s3 cp build/ s3://your-bucket-name --recursive`
  S3 버킷을 정적 웹사이트 호스팅 모드로 설정 -> URL로 접근 가능

4. 외부 접근 가능 여부 확인
   모든 설정이 끝난 뒤, 실제로 외부에서 접근 가능한지를 확인해야 한다.

- 포트 확인: 서버가 열려 있는 포트(예: 80, 443, 3000 등)로 접근 가능한가?
- 방화벽 설정: `ufw allow 80`, `ufw allow 443` 등 필수 포트가 열려 있는가?
- 도메인 연결 여부: DNS가 올바르게 설정되었는가?
- HTTPS 적용 확인: SSL 인증서가 적용되었는가?

### 5. 모니터링 및 유지보수

배포가 완료되었다고 해서 끝이 아니다. 실제 서비스 운영에서는 지속적인 점검과 관리가 필수다.
서버 상태, 오류 발생 여부, 사용자 트래픽 등을 모니터링하고 대응하는 과정이 중요하다.

1. 로그 확인(오류 발생 시 빠른 대응)

- 로그(Log)는 서버나 애플리케이션에서 발생하는 모든 이벤트 기록이다.
- 오류나 예외가 발생했을 때 원인을 추적할 수 있는 가장 중요한 단서다.
  예시: Node.js -> `console.log()`, `winston`, `morgan ` 같은 로깅 라이브러리
  서버 로그 -> `/var/log/nginx/error.log`, `/var/log/syslog`, CloudWatch (AWS)

2. 성능 모니터링(CPU, 메모리, 트래픽 등)

- 서버의 자원 사용량을 실시간으로 확인하여 과부하나 병목 현상을 사전에 파악한다.
- 서비스 속도가 느려지거나 트래픽이 몰리는 경우, 빠르게 대응해야 한다.
  모니터링 항목: CPU 사용률, 메모리 사용률, 디스크 I/O, 네트워크 트래픽

3. 오류 수정 및 재배포(CI/CD 연동)

- 문제가 발견되면 코드를 수정하고, 다시 배포하는 과정이 필요하다.
- CI/CD 파이프라인을 구성해두면, 수정 후 Git에 push만 해도 자동으로 재배포된다.

4. 보안 관리
   서비스가 외부에 노출되어 있는 만큼, 지속적인 보안 유지가 필요하다
   관리항목

- OS 및 라이브러리 보안 패치 적용
- 인증서 만료 전 갱신 (Let’s Encrypt는 certbot으로 자동 갱신 설정 가능)
- 방화벽 설정 유지 (불필요한 포트 차단)
- 사용자 인증 및 인가 관련 취약점 대응(JWT 만료, CORS 설정 등)
