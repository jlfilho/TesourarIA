# TesourarIA

Dashboard para Distribuição de Numerário em Rede Bancária

## Pré-requisitos

- Node.js 18+ e npm
- Angular CLI 17+ (`npm install -g @angular/cli`)

## Como executar

1. Navegue até a pasta do projeto:
```bash
cd cashlog-dashboard
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
ng serve
```

4. Acesse `http://localhost:4200` no navegador

## Estrutura do projeto

- `src/app/layout` - Componentes de layout (toolbar, sidenav, shell)
  - `app-shell` - Componente principal do layout com sidenav e toolbar
- `src/app/pages` - Páginas do dashboard
  - `overview-page` - Visão geral com KPIs
  - `deliveries-page` - Planejamento de entregas
  - `routes-page` - Rotas do dia
  - `stocks-page` - Estoque e cobertura
  - `costs-page` - Custos
- `src/app/core` - Serviços e modelos
  - `models` - Interfaces TypeScript
  - `services` - DashboardService com dados mockados

## Funcionalidades

- ✅ Dashboard com KPIs principais
- ✅ Gráficos interativos (Chart.js)
- ✅ Visualização de entregas planejadas
- ✅ Visualização de rotas do dia
- ✅ Monitoramento de estoque e risco
- ✅ Análise de custos
- ✅ Layout responsivo com Angular Material
- ✅ Navegação lateral (sidenav) colapsável

## Tecnologias

- Angular 17+ (standalone components)
- Angular Material 17+
- Chart.js 4+ (gráficos interativos)
- TypeScript
- SCSS
- RxJS

## Próximos passos (TODOs)

- [x] Integrar gráficos com Chart.js
- [ ] Implementar exportação CSV
- [ ] Integrar mapa de rotas (Leaflet/Google Maps)
- [x] Adicionar gráfico de pizza para breakdown de custos
- [ ] Implementar filtros de data funcionais
- [ ] Conectar com API real

