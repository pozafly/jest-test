mocking은 단위 테스트를 작성할 때, 해당 코드가 의존하는 부분을 가짜(mock)로 대체하는 기법을 말함.
일반적으로 테스트하려는 코드가 의존하는 부분을 직접 생성하기가 너무 부담스러운 경우 mocking이 많이 사용됨.

예를 들어, 데이터베이스에서 데이터를 삭제하는 코드에 대한 단위 테스트를 작성할 때, 실제 데이터베이스를 사용한다면 여러가지 문제점이 발생할 수 있음.

데이테베이스 접속과 같이 Network이나 I/O 작업이 포함된 테스트는 실행 속도가 현저히 떨어질 수 밖에 없다.
프로젝트의 규모가 켜져서 한 번에 실행해야 할 테스트 케이스가 많이지면 이러한 작은 속도 저하들이 모여 큰 이슈가 될 수 있으며, CI/CD 파이프라인의 일부로 테스트가 자동화되어 자주 실행되야 한다면 더 큰 문제가 될 수 있다.
테스트 자체를 위한 코드보다 데이터베이스와 연결을 맺고 트랜잭션을 생성하고 쿼리를 전송하는 코드가 더 길어질 수 있다. 즉, 배보다 배꼽이 더 커질 수 있다.
만약 테스트 실행 순간 일시적으로 데이터베이스가 오프라인 작업 중이었다면 해당 테스트는 실패하게 됨. 따라서 테스트가 인프라 환경에 영향을 받게됨. (non-deterministic)
테스트가 종료 직 후, 데이터베이스에서 변경 데이터를 직접 원복하거나 트렌잭션을 rollback 해줘야 하는데 상당히 번거로운 작업이 될 수 있다.
무엇보다 이런 방식으로 테스트를 작성하게 되면 특정 기능만 분리해서 테스트하겠다는 단위 테스트(Unit Test)의 근본적인 사상에 부합하지 않게 됨.

mocking은 이러한 상황에서 실제 객체인 척하는 가짜 객체를 생성하는 매커니즘을 제공함. 또한 테스트가 실행되는 동안 가짜 객체에 어떤 일들이 발생했는지를 기억하기 때문에 가짜 객체가 내부적으로 어떻게 사용되는지 검증할 수 있다. 결론적으로, mocking을 이용하면 실제 객체를 사용하는 것보다 훨씬 가볍고 빠르게 실행되면서도, 항상 동일한 결과를 내는 테스트를 작성할 수 있다.
