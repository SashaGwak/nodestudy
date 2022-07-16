## URL, Domain
### URL의 구조
https://example.com/business/mart/item?category=14&id=2965
* http
    - **스킴(scheme)** -> 프로토콜 이름이 들어감(클라이언트와 서버간의 통신 규약, 웹에서는 주로 http or https)
* example.com 
    - **호스트(host)** -> 특정 서버를 나타냄
* /business/mart/item
    - **경로(path)** -> 원하는 자원이 있는 위치를 나타냄 
    - 여기서는 example.com이라는 서버 안에서 root안에 business안에 mart안에 item이라는 파일을 의미함
    - 하지만 path는 의미를 나타내기 위한 용도(디렉토리 구조 안에 item파일이 없어도 됨!!)
* category=14&id=2965
    - **쿼리(query)** -> 서버에 요청할 때 원하는 것을 상세하게 표현하기 위해 사용
    - 여기서는 category 항목의 값을 14, id 항목의 값을 2965로 지정 
    - 각 항목을 구분할 때는 &를 써준다 

### Domain의 계층
Domain Name System이라고 하는 체계를 바탕으로 생성되는 문자열 이름 
1. root domain 
    - 인터넷 전체를 나타내는 단위로 생각 
    - '빈문자열'로 나타내고 도메인 네임에 오른쪽 점을 찍어주면 됨 ex naver.com.
2. Top-Level Domain(TLD)
    - 도메인 네임 끝에서 일반적으로 볼 수있는 kr,jp,net,gov 등이 해당
    - 사이트가 속한 국가 또는 사이트가 제공하는 서비스의 카테고리를 나타냄 
3. Second-Level Domain
    -naver, daum, google 등 서비스를 대표하는 이름 
4. WWW(Third-Level 도메인)
5. test.www.naver.com(Fourth-Level 도메인)
>하지만 실제 서비스에서는 보통 Third-level 정도까지만 사용하는 경우가 많다

### Domain Name Resolution
<img src="DNR.jpg" width="450px" height="400px">


[자세한 내용 참고 사이트](https://aws.amazon.com/ko/route53/what-is-dns/)
* 하지만 매번 접속할 때마다 1~9까지의 단계가 발생하는 것은 아님
* 왜냐하면 한번 IP 주소를 받은 후에는 OS가 그 IP 주소를 보통 별도로 저장해두고 계속 사용하기 때문에!
* 또한 자주 사용하는 도메인 네임에 대해서는 별도로 외부에 요청할 필요가 없도록 cache로 관리하는 경우가 많다