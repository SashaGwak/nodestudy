# MySQL 

### 1. MySQL 서버 설치 및 MySQL 서버 실행한 상태로 두기 
### 2. Sequelize를 사용하기 위해 필요한 패키지들 설치
    ```zsh
    npm install mysql2 sequelize sequelize-cli
    ```
### 3. Sequelize를 사용하는 프로젝트의 이상적인 구조를 만들기 위해 필요한 디렉토리 및 파일 생성
    ```bash
    npx sequelize init
    ```
    * config, migrations, models, seeders 디렉토리 생성
    * config/config.json 파일 생성
    * models/index.js 파일 생성
### 4. config.json 파일 중 development 객체에 MySQL 서버 접속 정보 설정
    ```js
    // ./config/config.json
    ...
    development: {
        username: '내가 정해준 이름(root)',
        password: '내 비밀번호',
        database: '데이터베이스 이름',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    ...
    ```
### 5. COWORK 데이터베이스 생성
    ```bash
    npx sequelize db:create --env development
    ```
    * config.json 파일의 development 객체의 내용대로 MySQL 서버에 접속해서 COWORK 데이터베이스를 생성함
    * --env development 옵션을 주지 않아도 기본으로 development 옵션이 적용되기 때문에 생략해도 됨
### 6. Members 테이블 생성 마이그레이션 파일 및 Member 모델 파일 생성
    ```bash
    npx sequelize model:generate --name Member --attributes name:string,team:string,position:string,emailAddress:string,phoneNumber:string,admissionDate:date,birthday:date,profileImage:string 
    ```
    * migrations 디렉토리에 (생성일자 및 시간)-create-member.js 파일이 생성됨(데이터베이스에 Members 테이블을 생성하는 코드가 담겨있는 파일)
    * models 디렉토리에 member.js 파일이 생성됨(나중에 Members 테이블을 제어하기 위해 연동해서 사용할 Member 모델의 코드가 담겨있는 파일)
    * id 프로퍼티(컬럼)를 sequelize-cli가 자동으로 코드에 추가해줌
    * (생성일자 및 시간)-create-member.js 파일에서 createdAt, updatedAt 프로퍼티에 defaultValue 속성 주기
### 7. 데이터베이스에 Members 테이블 생성
    ```bash
    npx sequelize db:migrate
    ```
    * migrations 디렉토리에 있는 모든 마이그레이션 파일들의 내용을 파일명에 있는 '생성일자 및 시간' 순서대로 수행하는 명령, 현재는 6.에서 생성된 마이그레이션 파일 하나만 있기 때문에 해당 파일의 내용만 수행
### 8. Members 테이블에 넣을 seed 데이터 생성
    ```bash
    npx sequelize seed:generate --name initialMembers
    ```
    * Members 테이블에 넣을 seed 데이터 삽입 코드가 있는 initialMembers라는 이름의 파일을 생성
    * (생성일자 및 시간)-initialMembers.js 파일이 생성됨
    * 코드에 실제로 넣을 seed 데이터에 해당하는 JSON 형식의 직원 정보 배열 추가
### 9. Members 테이블에 Seed 데이터 추가
    ```bash
    npx sequelize db:seed:all
    ```
### 10. Member 모델 코드에 빠져있는 id 프로퍼티 추가
    ```js
    // ./models/member.js 
    class Member extends Model {}
    Member.init(
        {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
    ...
    ```