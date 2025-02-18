## BBB Laager

Este é um serviço simples, onde o usuário pode votar quem vai para o paredão do novo BBB: Faustão ou Sílvio Santos!

Composto por uma API construida com Sinatra (ruby) + persistência em SQlite e uma página web servida com Express.js, ambos rodando em imagens docker.
Optei por criar as aplicações da forma mais básica e simples possível, de forma que sejam leves de rodar e entender.

Como uma feature opcional, adicionei um gerador de votadores, feito em Go (instruções abaixo).

Já para uma aplicação em produção, eu usaria Ruby on Rails (API mode) e React (com server-side-rendering).

### Setup
Após clonar o projeto, na pasta raíz execute:
> docker-compose up --build

Acesse http://localhost:3000 e vote!

### Schema
A API é composta por apenas uma tabela, `votes`:
```
ID integer
voter_ip string // apenas um IP fake, não gravo o IP de quem vota
choice_id string
created_at datetime
updated_at datetime

choice_id indexado
```

### API
#### GET /votes
Recupera os votos enviados, retornando o objeto:

```
{
    "total_votes": 7,
    "votes_per_candidate": {
        "faustao": 5,
        "silvio": 2
    },
    "votes_per_hour": [
        {
            "count": 10,
            "choice_id": "faustao",
            "date": "2025-02-17",
            "hour": "22"
        },
        ...
    ]
}
```

#### POST /vote
Recebe um objeto com os parâmetros `voter_ip` e `choide_id`:
```
{
    "voter_ip": "123.123.123.123",
    "choice_id": "silvio"
}
```
E retorna o objeto:

```
{
    "id": 5,
    "voter_ip": "123.123.123.123",
    "choice_id": "silvio",
    "created_at": "2025-02-17T22:18:27.112Z",
    "updated_at": "2025-02-17T22:18:27.112Z"
}
```
### WEB

Em `http://localhost:3000`, é feito o voto (página para o público).
Após a votação com sucesso, o usuário é redirecionado para `http://localhost:3000/result`

Para a produção do programa `http://localhost:3000/admin_dashboard`
Essa página faz requisições para `GET /votes`` e há uma opção pra habilitar e desabilitar pooling

* Idealmente, o dashboard ficaria em outra aplicação, protegida por autenticação / sessão.

### Voter Spawner

O Voter Spawner é um script em Go que cria N votadores e mantém rodando em
loop por 1 hora (ou até dar CTRL+C).

O spawner aceita o argumento `-voter=N`, sendo N a quantidade de votadores desejada.
Cada spawner levar de 1 a 10 segundos (aleatoriamente) para votar de novo. 

##### Importante: ainda estou aprendendo Go, portanto não está o código mais limpo ou eficiente (ex: testei com 10.000 voters e o spawner morreu por falta de memória... mas o Sinatra aguentou! :D ). A ideia aqui foi aproveitar que estou estudando a linguagem para brincar e fazer um "teste de carga", ainda que eu não tenha atacado os items diferenciais do exercício.
