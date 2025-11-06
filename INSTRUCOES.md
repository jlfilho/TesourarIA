# Instruções de Instalação e Execução

## Passo a Passo

### 1. Instalar Dependências

```bash
cd cashlog-dashboard
npm install
```

Isso instalará todas as dependências necessárias, incluindo:
- Angular 17+
- Angular Material 17+
- Angular CDK
- RxJS
- TypeScript

### 2. Executar o Projeto

```bash
ng serve
```

Ou, se preferir especificar a porta:

```bash
ng serve --port 4200
```

### 3. Acessar o Dashboard

Abra o navegador em: `http://localhost:4200`

## Estrutura de Arquivos Criados

```
cashlog-dashboard/
├── src/
│   ├── app/
│   │   ├── app.component.ts          # Componente raiz
│   │   ├── app.routes.ts             # Rotas do aplicativo
│   │   ├── core/
│   │   │   ├── models/               # Modelos TypeScript
│   │   │   └── services/             # Serviços (DashboardService)
│   │   ├── layout/
│   │   │   └── app-shell/            # Layout principal (sidenav + toolbar)
│   │   └── pages/
│   │       ├── overview-page/        # Dashboard (visão geral)
│   │       ├── deliveries-page/      # Planejamento de entregas
│   │       ├── routes-page/          # Rotas do dia
│   │       ├── stocks-page/          # Estoque e risco
│   │       └── costs-page/           # Custos
│   ├── index.html
│   ├── main.ts
│   └── styles.scss                   # Tema customizado Angular Material
├── angular.json
├── package.json
└── tsconfig.json
```

## Funcionalidades Implementadas

### ✅ Layout
- Sidenav lateral colapsável com navegação
- Toolbar superior com data atual
- Layout responsivo
- Tema customizado (azul + cinza)

### ✅ Páginas
1. **Dashboard (Overview)**
   - 4 cards de KPIs
   - Tabela de custos dos últimos 7 dias
   - Lista das 5 agências mais críticas

2. **Entregas (Deliveries)**
   - Tabela de entregas planejadas
   - Filtro por data (datepicker)
   - Botão de exportar CSV (placeholder)

3. **Rotas (Routes)**
   - Tabela de rotas do dia
   - Visualização de agências por rota (chips)
   - TODO: integração com mapa

4. **Estoques (Stocks)**
   - Tabela de cobertura por agência
   - Indicadores de nível de risco (cores)
   - Estoque atual, demanda prevista, dias cobertos

5. **Custos (Costs)**
   - Tabela de custos dos últimos 7 dias
   - Breakdown de custos fixos vs variáveis
   - TODO: gráfico de pizza

## Dados Mockados

Todos os dados são fornecidos pelo `DashboardService` em memória:
- KPIs gerais
- Lista de entregas
- Rotas planejadas
- Dados de estoque e risco
- Histórico de custos

## Próximos Passos

Para conectar com uma API real, substitua os métodos do `DashboardService` por chamadas HTTP:

```typescript
// Exemplo:
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getKPIs(): Observable<DashboardKPIs> {
  return this.http.get<DashboardKPIs>('/api/dashboard/kpis');
}
```

## Troubleshooting

### Erro: "Cannot find module '@angular/material'"
Execute novamente: `npm install`

### Erro de porta em uso
Use outra porta: `ng serve --port 4201`

### Erro de compilação TypeScript
Verifique se todas as dependências estão instaladas: `npm install`

