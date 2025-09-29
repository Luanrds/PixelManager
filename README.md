# PixelManager API

**Visão Geral**

PixelManager é uma API RESTful para o gerenciamento de metadados de imagens, desenvolvida em .NET 8. A solução implementa um CRUD completo, com foco em uma arquitetura robusta, testável e aderente aos princípios de Clean Code e Design Patterns.

Arquitetura e Padrões de Projeto
O projeto foi estruturado seguindo os princípios da Clean Architecture (Arquitetura Limpa), garantindo o desacoplamento entre as camadas e a centralização das regras de negócio. Esta abordagem resulta em um sistema com alta manutenibilidade, testabilidade e escalabilidade.

## Os seguintes padrões de projeto foram aplicados:

* **Domain-Driven Design (DDD):** A camada de Domain contém as entidades de negócio e as regras de domínio, formando o núcleo da aplicação e garantindo sua integridade.
  
* **Repository Pattern:** Abstrai a lógica de acesso a dados, permitindo que a camada de aplicação permaneça agnóstica em relação à tecnologia de persistência. A comunicação é realizada através de interfaces definidas no domínio.
  
* **Injeção de Dependência (DI):** Utilizada extensivamente para gerenciar o ciclo de vida e a resolução de dependências entre os componentes, facilitando a inversão de controle e a testabilidade.
  
## Stack de Tecnologias
* **Backend:** .NET 8 / C#
* **API Framework:** ASP.NET Core Web API
* **Banco de Dados:** RavenDB Embedded (NoSQL, em memória)
* **Testes:** xUnit (framework de testes), Moq (mocking) e FluentAssertions (asserções)
* **Validação de Dados:** FluentValidation

## Execução do Projeto
**Pré-requisitos:**
.NET 8 SDK

**Instruções:**

Clone o repositório para a sua máquina local.
Navegue até o diretório do projeto da API:
  
    `cd src/Backend/PixelManager.API`

Execute a aplicação:

    `dotnet run`

A API será iniciada e a documentação interativa (Swagger UI) estará disponível em http://localhost:5275/swagger.

## Estratégia de Testes
A qualidade do software é assegurada por uma suíte de testes abrangente, dividida em três camadas estratégicas:

* **Testes Unitários (UseCases.Test):** Validam as regras de negócio e a lógica da camada de aplicação de forma isolada, utilizando mocks para as dependências externas.
* **Testes de Validação (Validators.Test):** Verificam as regras de validação de entrada de dados (DTOs) de forma granular.
* **Testes de Integração (WebApi.Test):** Testam a API de ponta a ponta. Simulam requisições HTTP reais e validam o fluxo completo, desde o controller até a persistência no banco de dados em memória, garantindo a correta integração de todos os componentes.
