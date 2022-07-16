## URL의 구조
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