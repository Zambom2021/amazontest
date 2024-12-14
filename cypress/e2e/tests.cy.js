describe('Acesso ao site Amazon.com.br', () => {
  beforeEach(() => {
    cy.visit('https://www.amazon.com.br');
  });

    it('Deve buscar um produto e exibir os resultados esperados', () => {
      cy.get('#twotabsearchtextbox', { timeout: 10000 }).should('be.visible').type('geladeira frost free');
      cy.get('#nav-search-submit-button').click();
      cy.get('.s-main-slot').should('be.visible');
      cy.get('.s-main-slot .s-result-item').should('have.length.at.least', 1);
    });

    it('Deve adicionar um produto e consultar o carrinho de compras', () => {
      cy.get('#twotabsearchtextbox').type('Geladeira Consul Frost Free 300 litros');
      cy.get('#nav-search-submit-button').click();
      cy.get('#a-autoid-1-announce.a-button-text').scrollIntoView().click();

      cy.get('#nav-cart-count-container').click();
      cy.contains('h2.a-size-extra-large.a-text-normal', 'Carrinho de compras');
      cy.contains('#sc-subtotal-label-activecart', 'Subtotal (1 produto)');

    });

    it('Deve adicionar um produto e remover do carrinho de compras', () => {
      cy.get('#twotabsearchtextbox').type('Geladeira Consul Frost Free 300 litros');
      cy.get('#nav-search-submit-button').click();
      cy.get('#a-autoid-1-announce.a-button-text').scrollIntoView().click();

      cy.get('#nav-cart-count-container').click();
      cy.contains('h2.a-size-extra-large.a-text-normal', 'Carrinho de compras');
      cy.contains('#sc-subtotal-label-activecart', 'Subtotal (1 produto)');

      cy.get('.sc-action-delete input').click();
      cy.contains('Seu carrinho de compras da Amazon está vazio.').should('be.visible');
    });

    it('Deve adicionar um produto ao carrinho com Garantia Extendida', () => {
      cy.get('#twotabsearchtextbox').type('macbook air m3');
      cy.get('#nav-search-submit-button').click();
      cy.get('div[data-cy="title-recipe"]').first().find('a.a-link-normal').click(); 
      cy.get('#add-to-cart-button').click();
      cy.get('#attach-warranty-displayTitle').should('be.visible');
      cy.get('input[aria-labelledby="attachSiAddCoverage-announce"]').click(); 
      cy.contains('.a-box-inner', 'Adicionado ao carrinho');
    });

    it('Deve adicionar um produto ao carrinho sem Garantia Extendida', () => {
      cy.get('#twotabsearchtextbox').type('macbook air m3');
      cy.get('#nav-search-submit-button').click();
      cy.get('div[data-cy="title-recipe"]').first().find('a.a-link-normal').click(); 
      cy.get('#add-to-cart-button').click();
      cy.get('#attach-warranty-displayTitle').should('be.visible');
      cy.get('input[aria-labelledby="attachSiNoCoverage-announce"]').click(); 
      cy.contains('.a-box-inner', 'Adicionado ao carrinho');
    });

    it('Deve adicionar 2 produtos e consultar o carrinho de compras', () => {
      cy.get('#twotabsearchtextbox').type('Geladeira Consul Frost Free 300 litros');
      cy.get('#nav-search-submit-button').click();
      cy.get('#a-autoid-1-announce.a-button-text').scrollIntoView().click();

      cy.get('#nav-logo').click();

      cy.get('#twotabsearchtextbox').type('Cooktop de Indução 4 Zonas');
      cy.get('#nav-search-submit-button').click();
      cy.get('#a-autoid-1-announce.a-button-text').scrollIntoView().click();

      cy.get('#nav-cart-count-container').click();
      cy.contains('h2.a-size-extra-large.a-text-normal', 'Carrinho de compras');
      cy.contains('#sc-subtotal-label-activecart', 'Subtotal (2 produtos)');

    });

    it('Deve adicionar 2 produtos e remover 1 produto do carrinho', () => {
      cy.get('#twotabsearchtextbox').type('Geladeira Consul Frost Free 300 litros');
      cy.get('#nav-search-submit-button').click();
      cy.get('#a-autoid-1-announce.a-button-text').scrollIntoView().click();

      cy.get('#nav-logo').click();

      cy.get('#twotabsearchtextbox').type('Cooktop de Indução 4 Zonas Preto 220V - SUGGAR - FG0422VC');
      cy.get('#nav-search-submit-button').click();
      cy.get('#a-autoid-1-announce.a-button-text').scrollIntoView().click();

      cy.get('#nav-cart-count-container').click();
      cy.contains('h2.a-size-extra-large.a-text-normal', 'Carrinho de compras');
      cy.contains('#sc-subtotal-label-activecart', 'Subtotal (2 produtos)');

      cy.get('.sc-list-item').contains('Geladeira Consul Frost Free 300 litros')
        .parents('.sc-list-item') 
        .find('.sc-action-delete input') 
        .click();

      cy.contains('#sc-subtotal-label-activecart', 'Subtotal (1 produto)');

    });
});

